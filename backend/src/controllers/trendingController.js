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

// @desc    Get single trending product
// @route   GET /api/trending/:id
// @access  Public
exports.getTrendingProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Try to find by _id first, then by productRef
    let product = await TrendingProduct.findById(id);
    
    if (!product) {
       product = await TrendingProduct.findOne({ productRef: id });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Trending product not found' });
    }
    
    // format it just like the array
    const formatted = {
      _id: product.productRef || product._id,
      id: product.productRef || product._id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      image: product.image,
      badge: product.badge,
      badgeColor: product.badgeColor,
      stores: product.stores,
    };

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    next(err);
  }
};
