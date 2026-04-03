const apiService = require('../utils/apiService');
const logger = require('../config/logger');

/**
 * @desc    Get all trending products (Live from Flipkart)
 * @route   GET /api/trending
 * @access  Public
 */
exports.getTrendingProducts = async (req, res, next) => {
  try {
    console.log('Fetching live trending products...');
    
    // Attempt Flipkart first
    let products = await apiService.fetchFlipkartProducts('axc', 1);
    
    // Fallback to Amazon if Flipkart is empty or fails
    if (!products || products.length === 0) {
      console.log('Flipkart failed or empty (possibly 403), falling back to Amazon...');
      products = await apiService.fetchAmazonProducts('trending electronics gadget 2025');
    }

    const formattedProducts = (products || []).map(p => ({
      _id: p._id || p.id,
      name: p.title || 'Trending Product',
      brand: p.brand || 'Premium Brand',
      price: p.price,
      lowestPrice: p.price,
      image: p.image,
      rating: p.rating || 4.5,
      category: p.brand || 'Electronics',
      badge: 'Trending',
      isTrending: true,
      sites: "Across 10+ marketplaces"
    }));
    
    res.status(200).json({
      success: true,
      count: formattedProducts.length,
      data: formattedProducts.slice(0, 8)
    });
  } catch (error) {
    logger.error(`Error fetching trending products: ${error.message}`);
    res.status(200).json({ success: true, count: 0, data: [] }); // Graceful empty
  }
};
