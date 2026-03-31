const TrendingProduct = require('../models/TrendingProduct');
const logger = require('../config/logger');

/**
 * @desc    Get all trending products
 * @route   GET /api/trending
 * @access  Public
 */
exports.getTrendingProducts = async (req, res, next) => {
  try {
    const products = await TrendingProduct.find({});
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    logger.error(`Error fetching trending products: ${error.message}`);
    next(error);
  }
};
