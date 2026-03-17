const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide product title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: ['Electronics', 'Fashion', 'Home', 'Books', 'Sports', 'Beauty', 'Groceries', 'Toys', 'Automotive', 'Others'],
    },
    brand: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    originalUrl: {
      type: String,
      required: [true, 'Original product URL is required'],
    },
    originalPlatform: {
      type: String,
      enum: ['amazon', 'flipkart', 'snapdeal', 'paytm', 'myntra', 'ajio', 'ebay', 'other'],
      required: [true, 'Original platform is required'],
    },
    asin: {
      type: String,
      default: null,
    },
    specifications: {
      type: Map,
      of: String,
      default: new Map(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for faster searches
productSchema.index({ title: 'text', brand: 'text', category: 1 });
productSchema.index({ originalUrl: 1 });

module.exports = mongoose.model('Product', productSchema);
