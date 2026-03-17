const express = require('express');
const router = express.Router();
const { getAnalyticsDashboard, getScraperStatus } = require('../controllers/analyticsController');
const { adminAuth } = require('../middleware/auth');

// Admin routes (protected with admin auth)
router.get('/dashboard', adminAuth, getAnalyticsDashboard);
router.get('/scraper-status', adminAuth, getScraperStatus);

module.exports = router;
