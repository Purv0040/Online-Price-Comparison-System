const mongoose = require('mongoose');

const priceAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    targetPrice: {
      type: Number,
      required: [true, 'Target price is required'],
      min: 0,
    },
    currentPrice: {
      type: Number,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    lastNotificationDate: {
      type: Date,
      default: null,
    },
    alertTriggered: {
      type: Boolean,
      default: false,
    },
    triggeredDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

priceAlertSchema.index({ user: 1, product: 1 });
priceAlertSchema.index({ isActive: 1 });

module.exports = mongoose.model('PriceAlert', priceAlertSchema);
