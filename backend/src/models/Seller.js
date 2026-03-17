const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide seller name'],
      trim: true,
      unique: true,
    },
    platform: {
      type: String,
      enum: ['amazon', 'flipkart', 'snapdeal', 'paytm', 'myntra', 'ajio', 'ebay', 'other'],
      required: true,
    },
    logo: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isTrusted: {
      type: Boolean,
      default: false,
    },
    baseUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Seller', sellerSchema);
