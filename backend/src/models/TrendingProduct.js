const mongoose = require('mongoose');

const trendingProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true,
    },
    price: {
      type: String,
      default: 'N/A',
    },
    image: {
      type: String,
      default: null,
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
      default: '',
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: null,
    }
  },
  { 
    timestamps: true,
    collection: 'trendingproducts' 
  }
);

module.exports = mongoose.model('TrendingProduct', trendingProductSchema);
