import { useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, LinearProgress, Stack, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { gradientButtonSx } from './adminTheme';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useMedia } from '../../context/MediaContext';
import { uploadToCloudinary, saveMedia, deleteMedia, cloudinaryUrl } from '../../services/MediaService';

const MAX_BYTES = 10 * 1024 * 1024; // Cloudinary free-plan file limit
const MAX_PIXELS = 16_000_000;      // under Cloudinary's 25 MP cap and Safari's canvas limit
const ACCEPT = 'image/png,image/jpeg,image/webp';

/*
 * Returns the file unchanged when it is within limits; otherwise shrinks it
 * in the browser (keeping its proportions) and re-encodes it as WebP/JPEG.
 */
const prepareImage = async (file) => {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    if (file.size <= MAX_BYTES && width * height <= MAX_PIXELS) {
        bitmap.close();
        return file;
    }

    const scale = Math.min(1, Math.sqrt(MAX_PIXELS / (width * height)));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const encode = (type, quality) => new Promise((resolve) => canvas.toBlob(resolve, type, quality));
    for (const quality of [0.92, 0.85, 0.75, 0.6]) {
        let blob = await encode('image/webp', quality);
        if (!blob || blob.type !== 'image/webp') blob = await encode('image/jpeg', quality); // older Safari
        if (blob && blob.size <= MAX_BYTES) {
            const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
            return new File([blob], file.name.replace(/\.\w+$/, '') + `.${ext}`, { type: blob.type });
        }
    }
    throw new Error('This image is too large to upload, even after resizing.');
};

export const errorMessage = (err) =>
    err?.response?.data?.message
    ?? err?.response?.data?.error?.message
    ?? err?.message
    ?? 'Something went wrong';

/*
 * Uploads one image to Cloudinary for a media slot — click or drag & drop.
 * Uploads and removals take effect immediately (they don't wait for Save).
 * `fallbackSrc` is shown (labelled "Default") while nothing is uploaded.
 */
const ImageUploader = ({ slot, label, hint, aspect = '16 / 10', emptyText = 'No image yet', fallbackSrc, compact = false }) => {
    const { media, setSlot } = useMedia();
    const inputRef = useRef(null);
    const [progress, setProgress] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const [dragging, setDragging] = useState(false);
    const item = media[slot];

    const upload = async (file) => {
        if (!file) return;
        if (!ACCEPT.split(',').includes(file.type)) return setError('Please choose a PNG, JPG, or WebP image.');

        setError('');
        setBusy(true);
        setProgress(0);
        try {
            const ready = await prepareImage(file);
            const uploaded = await uploadToCloudinary(slot, ready, setProgress);
            const { data } = await saveMedia(slot, {
                url: uploaded.secure_url,
                publicId: uploaded.public_id,
                width: uploaded.width,
                height: uploaded.height,
            });
            setSlot(slot, data);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setBusy(false);
            setProgress(null);
        }
    };

    const handleRemove = async () => {
        if (!window.confirm(`Remove this image${label ? ` (${label})` : ''}? This happens immediately.`)) return;
        setBusy(true);
        setError('');
        try {
            await deleteMedia(slot);
            setSlot(slot, null);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const browse = () => !busy && inputRef.current?.click();
    const preview = item?.url ? cloudinaryUrl(item.url, 800) : fallbackSrc;

    return (
        <Box>
            {label && (
                <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between', mb: 0.75 }}>
                    <Typography variant="body2" fontWeight={600}>{label}</Typography>
                    {item?.width && <Typography variant="caption" color="text.secondary">{item.width} × {item.height}</Typography>}
                </Stack>
            )}
            <Box
                role="button"
                tabIndex={0}
                aria-label={`${item?.url ? 'Replace' : 'Upload'} ${label ?? 'image'}`}
                onClick={browse}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), browse())}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); upload(e.dataTransfer.files?.[0]); }}
                sx={{
                    aspectRatio: aspect, maxHeight: compact ? 140 : 240, width: '100%', mx: 'auto',
                    borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: busy ? 'progress' : 'pointer',
                    bgcolor: dragging ? 'rgba(0,212,255,0.08)' : '#f4f6fb',
                    border: '1.5px dashed', borderColor: dragging ? 'primary.main' : 'rgba(15,15,26,0.16)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color .15s, background-color .15s',
                    '&:hover, &:focus-visible': { borderColor: 'primary.main', outline: 'none' },
                    '&:hover .upload-hint, &:focus-visible .upload-hint': { opacity: 1 },
                }}
            >
                {preview ? (
                    <Box component="img" src={preview} alt="" sx={{ width: '100%', height: '100%', objectFit: 'contain', p: compact ? 1 : 0.5 }} />
                ) : (
                    <Stack sx={{ alignItems: 'center', gap: 0.5, px: 2, textAlign: 'center', color: 'text.secondary' }}>
                        <CloudUploadOutlinedIcon fontSize="small" />
                        <Typography variant="caption" fontWeight={600}>{emptyText}</Typography>
                        <Typography variant="caption">Drop an image or click to browse</Typography>
                    </Stack>
                )}
                {preview && !item?.url && (
                    <Box sx={{ position: 'absolute', top: 6, left: 6, px: 1, py: 0.25, borderRadius: 1, bgcolor: 'rgba(15,15,26,0.7)', color: '#fff', fontSize: 11, fontWeight: 600 }}>
                        Default
                    </Box>
                )}
                {preview && (
                    <Box className="upload-hint" sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(15,15,26,0.55)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, opacity: dragging ? 1 : 0, transition: 'opacity .15s', fontSize: 13, fontWeight: 600 }}>
                        <CloudUploadOutlinedIcon fontSize="small" /> {dragging ? 'Drop to upload' : 'Click or drop to replace'}
                    </Box>
                )}
                {busy && (
                    <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress size={26} />
                    </Box>
                )}
            </Box>
            {progress !== null && <LinearProgress variant="determinate" value={progress} sx={{ mt: 0.5, borderRadius: 1 }} />}
            {hint && <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.75, lineHeight: 1.4 }}>{hint}</Typography>}
            {error && <Alert severity="error" sx={{ mt: 1 }} onClose={() => setError('')}>{error}</Alert>}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <input ref={inputRef} type="file" accept={ACCEPT} hidden onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ''; }} />
                <Button size="small" variant="contained" startIcon={<AddPhotoAlternateOutlinedIcon />} disabled={busy} onClick={browse} sx={gradientButtonSx}>
                    {item?.url ? 'Replace' : 'Upload'}
                </Button>
                {item?.url && (
                    <Button size="small" color="error" startIcon={<DeleteOutlinedIcon />} disabled={busy} onClick={handleRemove}>
                        Remove
                    </Button>
                )}
            </Stack>
        </Box>
    );
};

export default ImageUploader;
