const TrendingProduct = require('../models/TrendingProduct');
const logger = require('../config/logger');

/**
 * @desc    Get all trending products
 * @route   GET /api/trending
 * @access  Public
 */
exports.getTrendingProducts = async (req, res, next) => {
  try {
    const products = await TrendingProduct.find({})
      .sort({ createdAt: -1 })
      .populate('productId', 'category');

    const uniqueProducts = [];
    const seenKeys = new Set();

    for (const product of products) {
      const key = product.productId
        ? `product:${String(product.productId._id)}`
        : `name:${String(product.brand || '').trim().toLowerCase()}|${String(product.name || '').trim().toLowerCase()}`;

      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      uniqueProducts.push(product);
    }

    const productsWithCategory = uniqueProducts.map((product) => {
      const payload = product.toObject();
      return {
        ...payload,
        category: payload.productId?.category || payload.category || 'Electronics',
      };
    });
    
    res.status(200).json({
      success: true,
      count: productsWithCategory.length,
      data: productsWithCategory
    });
  } catch (error) {
    logger.error(`Error fetching trending products: ${error.message}`);
    next(error);
  }
};
