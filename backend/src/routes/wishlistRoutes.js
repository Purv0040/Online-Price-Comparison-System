const express = require('express');
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

// All routes are protected
router.get('/', auth, getWishlist);
router.post('/add', auth, addToWishlist);
router.post('/remove', auth, removeFromWishlist);

module.exports = router;
