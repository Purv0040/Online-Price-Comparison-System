const Product = require('../models/Product');
const Price = require('../models/Price');
const PriceHistory = require('../models/PriceHistory');
const Seller = require('../models/Seller');
const { scrapeProduct, getPlatformFromUrl } = require('../utils/scraper');
const { sendResponse, handleError } = require('../utils/responseHandler');
const { formatPrice, calculateDiscount } = require('../utils/helpers');

// Add product by URL and compare prices
const addProductByUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return handleError(res, 400, 'Product URL is required');
    }

    // Detect platform
    const platform = getPlatformFromUrl(url);
    if (platform === 'other') {
      return handleError(res, 400, 'Unsupported platform. Please use Amazon, Flipkart, or Snapdeal');
    }

    // Scrape product data
    const scrapedData = await scrapeProduct(url, platform);
    if (!scrapedData) {
      return handleError(res, 500, 'Failed to scrape product data. Please check the URL and try again');
    }

    // Check if product already exists
    let product = await Product.findOne({ originalUrl: url });

    if (!product) {
      product = new Product({
        title: scrapedData.title,
        description: scrapedData.description || '',
        image: scrapedData.image,
        brand: scrapedData.brand || '',
        rating: scrapedData.rating ? parseFloat(scrapedData.rating) : 0,
        reviews: 0,
        category: 'Electronics',
        originalUrl: url,
        originalPlatform: platform,
      });

      await product.save();
    }

    // Find seller
    let seller = await Seller.findOne({ platform, name: scrapedData.sellerName || platform });
    if (!seller) {
      seller = new Seller({
        name: scrapedData.sellerName || platform.charAt(0).toUpperCase() + platform.slice(1),
        platform,
        baseUrl: url.split('/')[2],
        isTrusted: true,
      });
      await seller.save();
    }

    // Add price record
    const price = new Price({
      product: product._id,
      seller: seller._id,
      price: formatPrice(scrapedData.price),
      originalPrice: scrapedData.originalPrice ? formatPrice(scrapedData.originalPrice) : null,
      discount: scrapedData.originalPrice ? calculateDiscount(formatPrice(scrapedData.originalPrice), formatPrice(scrapedData.price)) : 0,
      url,
      rating: scrapedData.rating ? parseFloat(scrapedData.rating) : 0,
      reviews: scrapedData.reviews || 0,
    });

    await price.save();

    // Add to price history
    const priceHistory = new PriceHistory({
      product: product._id,
      seller: seller._id,
      price: formatPrice(scrapedData.price),
      discount: scrapedData.originalPrice ? calculateDiscount(formatPrice(scrapedData.originalPrice), formatPrice(scrapedData.price)) : 0,
    });

    await priceHistory.save();

    // Fetch all prices for comparison
    const allPrices = await Price.find({ product: product._id })
      .populate('seller', 'name platform logo rating')
      .sort({ price: 1 });

    sendResponse(res, 201, true, 'Product added and prices compared', {
      product: {
        id: product._id,
        title: product.title,
        image: product.image,
        originalPlatform: product.originalPlatform,
      },
      prices: allPrices,
      lowestPrice: allPrices[0]?.price || null,
      highestPrice: allPrices[allPrices.length - 1]?.price || null,
    });
  } catch (error) {
    console.error('Add product error:', error);
    handleError(res, 500, error.message);
  }
};

// Get product details with all prices
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return handleError(res, 404, 'Product not found');
    }

    const prices = await Price.find({ product: productId })
      .populate('seller', 'name platform logo rating isTrusted')
      .sort({ price: 1 });

    const priceHistory = await PriceHistory.find({ product: productId })
      .sort({ timestamp: -1 })
      .limit(30);

    sendResponse(res, 200, true, 'Product details fetched', {
      product,
      prices,
      priceHistory,
      stats: {
        lowestPrice: prices[0]?.price || null,
        highestPrice: prices[prices.length - 1]?.price || null,
        averagePrice: prices.length > 0 ? Math.round(prices.reduce((sum, p) => sum + p.price, 0) / prices.length) : 0,
        availableOn: prices.length,
      },
    });
  } catch (error) {
    console.error('Get product details error:', error);
    handleError(res, 500, error.message);
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (query) filter.$text = { $search: query };

    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    let productsWithPrices = [];

    for (const product of products) {
      const prices = await Price.find({ product: product._id })
        .sort({ price: 1 })
        .limit(1);

      productsWithPrices.push({
        ...product.toObject(),
        lowestPrice: prices[0]?.price || null,
      });
    }

    if (minPrice || maxPrice) {
      productsWithPrices = productsWithPrices.filter((p) => {
        const price = p.lowestPrice || 0;
        if (minPrice && price < minPrice) return false;
        if (maxPrice && price > maxPrice) return false;
        return true;
      });
    }

    sendResponse(res, 200, true, 'Products fetched', {
      products: productsWithPrices,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search products error:', error);
    handleError(res, 500, error.message);
  }
};

module.exports = {
  addProductByUrl,
  getProductDetails,
  searchProducts,
};
