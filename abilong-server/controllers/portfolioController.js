const Portfolio = require('../models/Portfolio');

// Sections that can be edited, and the JSON shape each one must have
const OBJECT_FIELDS = ['profile', 'links', 'about', 'contact', 'featuredProject'];
const ARRAY_FIELDS = [
  'projects', 'skillGroups', 'experience', 'leadership',
  'education', 'certifications', 'learningAreas',
];

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ key: 'main' }).select('-_id -__v -key').lean();
    res.json({ portfolio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Partial update: only the sections included in the body are replaced.
const updatePortfolio = async (req, res) => {
  try {
    const update = {};
    for (const [field, value] of Object.entries(req.body || {})) {
      if (OBJECT_FIELDS.includes(field)) {
        if (!isPlainObject(value)) return res.status(400).json({ message: `${field} must be an object` });
      } else if (ARRAY_FIELDS.includes(field)) {
        if (!Array.isArray(value)) return res.status(400).json({ message: `${field} must be an array` });
      } else {
        return res.status(400).json({ message: `Unknown section: ${field}` });
      }
      update[field] = value;
    }
    if (!Object.keys(update).length) return res.status(400).json({ message: 'Nothing to update' });

    const portfolio = await Portfolio.findOneAndUpdate(
      { key: 'main' },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).select('-_id -__v -key').lean();
    res.json({ portfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getPortfolio, updatePortfolio };
