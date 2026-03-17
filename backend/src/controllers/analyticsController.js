const Product = require('../models/Product');
const Price = require('../models/Price');
const User = require('../models/User');
const BulkOrder = require('../models/BulkOrder');
const { sendResponse, handleError } = require('../utils/responseHandler');

// Get analytics dashboard data
const getAnalyticsDashboard = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const totalOrders = await BulkOrder.countDocuments();
    const totalRevenue = (await BulkOrder.aggregate([
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]))[0]?.total || 0;

    // Price trends (last 7 days)
    const priceTrends = await Price.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          avgPrice: { $avg: '$price' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Most searched products
    const mostSearched = await Product.find().sort({ rating: -1 }).limit(10);

    sendResponse(res, 200, true, 'Analytics dashboard fetched', {
      stats: {
        totalProducts,
        totalUsers,
        activeUsers,
        totalOrders,
        totalRevenue,
      },
      priceTrends,
      mostSearchedProducts: mostSearched,
    });
  } catch (error) {
    console.error('Get analytics dashboard error:', error);
    handleError(res, 500, error.message);
  }
};

// Get scraper status
const getScraperStatus = async (req, res) => {
  try {
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('title originalPlatform createdAt');

    const scraperStats = {
      lastRun: new Date(),
      productsScraped: recentProducts.length,
      platforms: ['amazon', 'flipkart', 'snapdeal'],
      status: 'active',
    };

    sendResponse(res, 200, true, 'Scraper status fetched', {
      stats: scraperStats,
      recentProducts,
    });
  } catch (error) {
    console.error('Get scraper status error:', error);
    handleError(res, 500, error.message);
  }
};

module.exports = {
  getAnalyticsDashboard,
  getScraperStatus,
};
