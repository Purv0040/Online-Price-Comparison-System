const mongoose = require('mongoose');

const trendingProductSchema = new mongoose.Schema(
  {
    productRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false // Optional reference to actual product
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
      default: '',
    },
    badgeColor: {
      type: String,
      default: '',
    },
    stores: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TrendingProduct', trendingProductSchema);
