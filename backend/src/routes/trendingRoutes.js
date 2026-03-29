const express = require('express');
const { getTrendingProducts, getTrendingProductById } = require('../controllers/trendingController');

const router = express.Router();

router.get('/', getTrendingProducts);
router.get('/:id', getTrendingProductById);

module.exports = router;
