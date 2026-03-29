const Product = require('../models/Product');
const Price = require('../models/Price');
const PriceHistory = require('../models/PriceHistory');
const Seller = require('../models/Seller');

/**
 * Update product data from scraper
 * POST /api/scraper/update
 */
exports.updateProductData = async (req, res) => {
  try {
    const { source, products } = req.body;

    if (!source || !products || !Array.isArray(products)) {
      return res.status(400).json({ success: false, message: 'Invalid data format' });
    }

    // 1. Find the seller
    let seller = await Seller.findOne({ platform: source.toLowerCase() });
    
    // If seller doesn't exist, create it (fallback, but usually we'd have it)
    if (!seller) {
      seller = await Seller.create({
        name: source,
        platform: source.toLowerCase(),
        baseUrl: source === 'amazon' ? 'https://www.amazon.in' : 'https://www.flipkart.com',
        isTrusted: true
      });
    }

    const updatedProducts = [];

    for (const item of products) {
      // 2. Find the product by URL or Title
      let product = await Product.findOne({ 
        $or: [
          { originalUrl: item.url },
          { title: item.name }
        ]
      });

      // If product doesn't exist, create it (minimal entry)
      if (!product) {
        product = await Product.create({
          title: item.name,
          originalUrl: item.url,
          originalPlatform: source.toLowerCase(),
          category: 'Electronics', // Default category
          rating: item.rating || 0,
        });
      }

      // 3. Update current price in Price collection
      let priceRecord = await Price.findOne({ product: product._id, seller: seller._id });
      
      const oldPrice = priceRecord ? priceRecord.price : null;

      if (priceRecord) {
        priceRecord.price = item.price;
        priceRecord.originalPrice = item.originalPrice || priceRecord.originalPrice;
        priceRecord.rating = item.rating || priceRecord.rating;
        priceRecord.url = item.url;
        await priceRecord.save();
      } else {
        priceRecord = await Price.create({
          product: product._id,
          seller: seller._id,
          price: item.price,
          originalPrice: item.originalPrice,
          rating: item.rating || 0,
          url: item.url
        });
      }

      // 4. Add to PriceHistory
      await PriceHistory.create({
        product: product._id,
        seller: seller._id,
        price: item.price,
        discount: item.originalPrice ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) : 0,
        timestamp: new Date()
      });

      // 5. Update Product lastUpdated and internal priceHistory
      product.lastUpdated = new Date();
      product.priceHistory.push({
        price: item.price,
        date: new Date()
      });
      
      // Limit internal price history to last 10 entries to keep document size reasonable
      if (product.priceHistory.length > 10) {
        product.priceHistory.shift();
      }

      // Optionally update rating if it's more current
      if (item.rating) product.rating = item.rating;
      await product.save();

      updatedProducts.push({
        id: product._id,
        name: product.title,
        oldPrice,
        newPrice: item.price
      });
    }

    res.status(200).json({
      success: true,
      message: `Updated ${updatedProducts.length} products from ${source}`,
      data: updatedProducts
    });

  } catch (error) {
    console.error('Scraper update error:', error);
    res.status(500).json({ success: false, message: 'Server error during scraper update' });
  }
};
