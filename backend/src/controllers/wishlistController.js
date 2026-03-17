const Wishlist = require('../models/Wishlist');
const { sendResponse, handleError } = require('../utils/responseHandler');

// Get user wishlist
const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products.product');

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [],
      });
      await wishlist.save();
    }

    sendResponse(res, 200, true, 'Wishlist fetched', { wishlist });
  } catch (error) {
    console.error('Get wishlist error:', error);
    handleError(res, 500, error.message);
  }
};

// Add to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId, productData } = req.body;

    if (!productId) {
      return handleError(res, 400, 'Product ID is required');
    }

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.id,
        products: [{ 
          product: productId,
          productData: productData || { id: productId }
        }],
      });
    } else {
      const productExists = wishlist.products.some((p) => p.product === productId || p.product.toString() === productId);

      if (!productExists) {
        wishlist.products.push({ 
          product: productId,
          productData: productData || { id: productId }
        });
      }
    }

    await wishlist.save();

    sendResponse(res, 200, true, 'Product added to wishlist', { wishlist });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    handleError(res, 500, error.message);
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return handleError(res, 400, 'Product ID is required');
    }

    const wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      return handleError(res, 404, 'Wishlist not found');
    }

    wishlist.products = wishlist.products.filter((p) => p.product !== productId && p.product.toString() !== productId);

    await wishlist.save();

    sendResponse(res, 200, true, 'Product removed from wishlist', { wishlist });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    handleError(res, 500, error.message);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
