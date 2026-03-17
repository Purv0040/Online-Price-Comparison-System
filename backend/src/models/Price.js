const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema(
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
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    deliveryDays: {
      type: Number,
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
    availability: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Preorder', 'Limited'],
      default: 'In Stock',
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for queries
priceSchema.index({ product: 1, seller: 1 });
priceSchema.index({ createdAt: 1 });
priceSchema.index({ price: 1 });

module.exports = mongoose.model('Price', priceSchema);
