const mongoose = require('mongoose');
const Product = require('../models/Product');
const Price = require('../models/Price');
const PriceHistory = require('../models/PriceHistory');
const Seller = require('../models/Seller');
const TrendingProduct = require('../models/TrendingProduct');
const { scrapeProduct, getPlatformFromUrl } = require('../utils/scraper');
const { sendResponse, handleError } = require('../utils/responseHandler');
const { formatPrice, calculateDiscount } = require('../utils/helpers');
const apiService = require('../utils/apiService');

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

    // Check if it's a standard MongoDB ID
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(productId);

    if (isMongoId) {
      // First try finding in regular Product collection
      let product = await Product.findById(productId);
      
      if (product) {
        const prices = await Price.find({ product: productId })
          .populate('seller', 'name platform logo rating isTrusted')
          .sort({ price: 1 });

        const priceHistory = await PriceHistory.find({ product: productId })
          .sort({ timestamp: -1 })
          .limit(30);

        return sendResponse(res, 200, true, 'Product details fetched', {
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
      }
    }

    // If not a found Mongo product, treat any other ID as a live API product (e.g. ASINs)
    let liveProduct = null;
    
    // Attempt to fetch real details from Amazon
    liveProduct = await apiService.fetchAmazonDetails(productId);
    
    if (!liveProduct) {
      // Fallback placeholder if API fails
      liveProduct = {
        _id: productId,
        title: 'Live Marketplace Product',
        category: 'Live Data',
        image: `https://via.placeholder.com/400?text=Live+Product+${productId}`,
        description: 'Real-time product information fetched from the marketplace.',
        price: 0,
        lowestPrice: 0,
        platform: 'amazon'
      };
    }

    // --- ENHANCED COMPARISON ---
    // Search for the SAME title to find alternative offers/prices
    let prices = [];
    try {
      const searchTitle = liveProduct.title.split(' ').slice(0, 5).join(' '); // Use first 5 words
      
      const [amazonOffers, flipkartOffers] = await Promise.allSettled([
        apiService.fetchAmazonProducts(searchTitle),
        apiService.fetchFlipkartProducts(searchTitle)
      ]);
      
      const allOffers = [];
      if (amazonOffers.status === 'fulfilled') allOffers.push(...(amazonOffers.value || []));
      if (flipkartOffers.status === 'fulfilled') allOffers.push(...(flipkartOffers.value || []));

      prices = allOffers.map(offer => ({
        _id: offer.id,
        price: offer.price,
        discount: offer.discount || 0,
        seller: {
          name: offer.brand || (offer.platform === 'amazon' ? 'Amazon Seller' : 'Flipkart Seller'),
          platform: offer.platform,
          logo: offer.platform === 'amazon' 
            ? 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' 
            : 'https://upload.wikimedia.org/wikipedia/commons/1/18/Flipkart_logo.svg',
          rating: offer.rating || 4.2
        },
        url: offer.url || liveProduct.url,
        isTrusted: true
      }));

      // Add the main product itself to prices if not already there
      if (!prices.some(p => p._id === liveProduct._id)) {
        prices.unshift({
          _id: liveProduct._id,
          price: liveProduct.price,
          discount: 0,
          seller: {
            name: liveProduct.brand || 'Main Seller',
            platform: 'amazon',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
            rating: liveProduct.rating
          },
          url: liveProduct.url,
          isTrusted: true
        });
      }
    } catch (e) {
      console.log('Comparison fetch error:', e.message);
    }

    return sendResponse(res, 200, true, 'Live product details fetched with comparisons', {
       product: liveProduct,
       prices: prices.sort((a, b) => a.price - b.price),
       priceHistory: [],
       stats: { 
         availableOn: prices.length,
         lowestPrice: prices[0]?.price || liveProduct.price,
         highestPrice: prices[prices.length - 1]?.price || liveProduct.price,
         isLive: true 
       }
    });
  } catch (error) {
    console.error('Get product details error:', error);
    handleError(res, 500, error.message);
  }
};

// Search products using Live APIs
const searchProducts = async (req, res) => {
  try {
    const startTime = Date.now();
    const { query, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 20;

    console.log(`Starting Live API search for "${query || 'category:' + category}"...`);

    // Prefer seeded/database products when MongoDB is connected.
    if (mongoose.connection.readyState === 1) {
      const productFilter = { isActive: true };

      if (category) {
        productFilter.category = category;
      }

      if (query) {
        productFilter.$or = [
          { title: { $regex: query, $options: 'i' } },
          { brand: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } },
        ];
      }

      const dbProducts = await Product.find(productFilter)
        .sort({ createdAt: -1 })
        .lean();

      if (dbProducts.length > 0) {
        const productIds = dbProducts.map((product) => product._id);

        const lowestPriceRows = await Price.aggregate([
          { $match: { product: { $in: productIds } } },
          { $group: { _id: '$product', lowestPrice: { $min: '$price' } } },
        ]);

        const lowestPriceMap = new Map(
          lowestPriceRows.map((row) => [String(row._id), row.lowestPrice])
        );

        let enrichedProducts = dbProducts.map((product) => ({
          ...product,
          lowestPrice: lowestPriceMap.get(String(product._id)) || 0,
        }));

        if (minPrice || maxPrice) {
          const parsedMin = minPrice ? parseFloat(minPrice) : null;
          const parsedMax = maxPrice ? parseFloat(maxPrice) : null;

          enrichedProducts = enrichedProducts.filter((product) => {
            if (parsedMin !== null && product.lowestPrice < parsedMin) return false;
            if (parsedMax !== null && product.lowestPrice > parsedMax) return false;
            return true;
          });
        }

        const startIndex = (parsedPage - 1) * parsedLimit;
        const paginatedProducts = enrichedProducts.slice(startIndex, startIndex + parsedLimit);
        const duration = Date.now() - startTime;

        console.log(`✅ DB search completed in ${duration}ms. Found ${enrichedProducts.length} products.`);

        return sendResponse(res, 200, true, 'Products fetched from database', {
          products: paginatedProducts,
          pagination: {
            total: enrichedProducts.length,
            page: parsedPage,
            limit: parsedLimit,
            totalPages: Math.ceil(enrichedProducts.length / parsedLimit),
          },
        });
      }
    }

    let products = [];

    if (query) {
      console.log(`Starting multi-platform search for: ${query}`);
      
      // Fetch from ALL platforms in parallel
      const searchResults = await Promise.allSettled([
        apiService.fetchAmazonProducts(query),
        apiService.fetchFlipkartProducts(query, page),
        apiService.fetchMeeshoProducts(query)
      ]);

      // Blend results from all platforms using Round-Robin to keep it diverse but RELEVANT
      const platformArrays = searchResults
        .filter(r => r.status === 'fulfilled' && Array.isArray(r.value))
        .map(r => r.value);
      
      products = [];
      let maxLen = Math.max(...platformArrays.map(a => a.length), 0);
      
      for (let i = 0; i < maxLen; i++) {
        for (let arr of platformArrays) {
          if (arr[i]) products.push(arr[i]);
        }
      }

    } else if (category) {
      // For categories, try all platforms using category as query
      const catResults = await Promise.allSettled([
        apiService.fetchAmazonProducts(category),
        apiService.fetchFlipkartProducts(category, page),
        apiService.fetchMeeshoProducts(category)
      ]);
      
      catResults.forEach(res => {
        if (res.status === 'fulfilled' && Array.isArray(res.value)) {
          products = [...products, ...res.value];
        }
      });
    } else {
      // Default trending fallback
      products = await apiService.fetchAmazonProducts('trending deals electronics');
    }

    // Filter results if prices are provided
    if (minPrice || maxPrice) {
      products = products.filter(p => {
        const price = parseFloat(p.price);
        if (minPrice && price < parseFloat(minPrice)) return false;
        if (maxPrice && price > parseFloat(maxPrice)) return false;
        return true;
      });
    }

    const duration = Date.now() - startTime;
    console.log(`✅ Live search completed in ${duration}ms. Found ${products.length} products.`);

    sendResponse(res, 200, true, 'Live products fetched', {
      products: products,
      pagination: {
        total: products.length,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: 1, // API pagination simplified
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
