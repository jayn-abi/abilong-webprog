const express = require('express');
const { getMedia, getSignature, saveMedia, deleteMedia } = require('../controllers/mediaController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMedia);
router.post('/signature', protect, adminOnly, getSignature);
router.route('/:slot').put(protect, adminOnly, saveMedia).delete(protect, adminOnly, deleteMedia);

module.exports = router;
