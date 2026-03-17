const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: false }
);

// TTL index - automatically delete records older than 90 days
priceHistorySchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });
priceHistorySchema.index({ product: 1, seller: 1, timestamp: -1 });

module.exports = mongoose.model('PriceHistory', priceHistorySchema);
