const crypto = require('crypto');
const Media = require('../models/Media');
const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require('../config/config');

const FOLDER = 'portfolio';
const SLOT_PATTERN = /^[a-z0-9-]{1,40}$/;
// These slots hold PDFs (CV, transcript); every other slot holds an image
const DOCUMENT_SLOTS = ['document-cv', 'document-transcript'];
const formatsFor = (slot) => (DOCUMENT_SLOTS.includes(slot) ? 'pdf' : 'jpg,jpeg,png,webp');

const isConfigured = () => CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET;

// Cloudinary signature: sorted "key=value" pairs joined by "&", plus the secret, SHA-1.
const sign = (params) => {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return crypto.createHash('sha1').update(payload + CLOUDINARY_API_SECRET).digest('hex');
};

const destroyOnCloudinary = async (publicId) => {
  const timestamp = Math.round(Date.now() / 1000);
  const params = { invalidate: 'true', public_id: publicId, timestamp };
  const body = new URLSearchParams({ ...params, api_key: CLOUDINARY_API_KEY, signature: sign(params) });
  await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`, { method: 'POST', body });
};

const getMedia = async (req, res) => {
  try {
    const media = await Media.find().select('slot url width height bytes fileName updatedAt');
    res.json({ media });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Signs a direct browser → Cloudinary upload for one slot. Each slot has a
// fixed public_id, so re-uploading replaces the previous image.
const getSignature = (req, res) => {
  if (!isConfigured())
    return res.status(503).json({ message: 'Cloudinary is not configured on the server' });

  const { slot } = req.body;
  if (!SLOT_PATTERN.test(slot || ''))
    return res.status(400).json({ message: 'Invalid media slot' });

  const params = {
    allowed_formats: formatsFor(slot),
    invalidate: 'true',
    overwrite: 'true',
    public_id: `${FOLDER}/${slot}`,
    timestamp: Math.round(Date.now() / 1000),
  };

  res.json({
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    timestamp: params.timestamp,
    signature: sign(params),
    params: {
      allowed_formats: params.allowed_formats,
      invalidate: params.invalidate,
      overwrite: params.overwrite,
      public_id: params.public_id,
    },
  });
};

const saveMedia = async (req, res) => {
  try {
    const { slot } = req.params;
    const { url, publicId, width, height, bytes, fileName } = req.body;

    if (!SLOT_PATTERN.test(slot))
      return res.status(400).json({ message: 'Invalid media slot' });
    // Only accept files that were uploaded to this account for this slot
    if (typeof url !== 'string' || !url.startsWith(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`))
      return res.status(400).json({ message: 'URL must be a Cloudinary file from this account' });
    if (publicId !== `${FOLDER}/${slot}`)
      return res.status(400).json({ message: 'Public ID does not match the slot' });
    if (DOCUMENT_SLOTS.includes(slot) && !url.toLowerCase().endsWith('.pdf'))
      return res.status(400).json({ message: 'This slot only accepts PDF files' });

    const media = await Media.findOneAndUpdate(
      { slot },
      {
        slot, url, publicId, width, height, bytes,
        fileName: typeof fileName === 'string' ? fileName.slice(0, 120) : undefined,
      },
      { new: true, upsert: true, runValidators: true }
    );
    res.json(media);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findOneAndDelete({ slot: req.params.slot });
    if (!media) return res.status(404).json({ message: 'Media not found' });

    if (isConfigured()) {
      // Best effort: the portfolio no longer references it either way
      destroyOnCloudinary(media.publicId).catch((err) => console.error('Cloudinary destroy failed:', err));
    }
    res.json({ message: 'Media removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getMedia, getSignature, saveMedia, deleteMedia };
