const express = require('express');
const router = express.Router();
const scraperController = require('../controllers/scraperController');

// POST /api/scraper/update
router.post('/update', scraperController.updateProductData);

module.exports = router;
