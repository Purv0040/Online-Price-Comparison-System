const apiService = require('../utils/apiService');
const logger = require('../config/logger');
const TrendingProduct = require('../models/TrendingProduct');
const Product = require('../models/Product');

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

    // Final fallback to DB seeded data if live sources are empty.
    if (!products || products.length === 0) {
      const seededTrending = await TrendingProduct.find({}).sort({ createdAt: -1 }).limit(8).lean();

      if (seededTrending.length > 0) {
        const formattedSeededTrending = seededTrending.map((item) => ({
          _id: item.productId || item._id,
          name: item.name || 'Trending Product',
          brand: item.brand || 'Premium Brand',
          price: item.price || 'N/A',
          lowestPrice: item.price || 'N/A',
          image: item.image,
          rating: 4.5,
          category: item.brand || 'Electronics',
          badge: item.badge || 'Trending',
          isTrending: true,
          sites: item.stores || 'Across 10+ marketplaces',
        }));

        return res.status(200).json({
          success: true,
          count: formattedSeededTrending.length,
          data: formattedSeededTrending,
        });
      }

      // If trending collection is empty, fallback to Product collection.
      const seededProducts = await Product.find({ isActive: true }).sort({ createdAt: -1 }).limit(8).lean();
      const formattedSeededProducts = seededProducts.map((item) => ({
        _id: item._id,
        name: item.title || 'Trending Product',
        brand: item.brand || 'Premium Brand',
        price: 'N/A',
        lowestPrice: 'N/A',
        image: item.image,
        rating: item.rating || 4.5,
        category: item.category || 'Electronics',
        badge: 'Trending',
        isTrending: true,
        sites: 'Across 10+ marketplaces',
      }));

      return res.status(200).json({
        success: true,
        count: formattedSeededProducts.length,
        data: formattedSeededProducts,
      });
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
