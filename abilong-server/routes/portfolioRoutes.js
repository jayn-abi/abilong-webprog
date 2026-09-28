const express = require('express');
const { getPortfolio, updatePortfolio } = require('../controllers/portfolioController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getPortfolio).put(protect, adminOnly, updatePortfolio);

module.exports = router;
