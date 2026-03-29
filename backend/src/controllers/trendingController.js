const TrendingProduct = require('../models/TrendingProduct');

// @desc    Get all trending products
// @route   GET /api/trending
// @access  Public
exports.getTrendingProducts = async (req, res, next) => {
  try {
    const products = await TrendingProduct.find().limit(60);
    
    const formatted = products.map((p) => ({
      _id: p.productRef || p._id,
      id: p.productRef || p._id,
      brand: p.brand,
      name: p.name,
      price: p.price,
      image: p.image,
      badge: p.badge,
      badgeColor: p.badgeColor,
      stores: p.stores,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};
