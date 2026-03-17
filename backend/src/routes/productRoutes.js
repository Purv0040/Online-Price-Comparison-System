const express = require('express');
const router = express.Router();
const { addProductByUrl, getProductDetails, searchProducts } = require('../controllers/productController');
const { auth } = require('../middleware/auth');

// Public routes
router.get('/search', searchProducts);
router.get('/:productId', getProductDetails);

// Protected routes
router.post('/add-by-url', auth, addProductByUrl);

module.exports = router;
