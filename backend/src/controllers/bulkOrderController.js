const BulkOrder = require('../models/BulkOrder');
const { sendResponse, handleError } = require('../utils/responseHandler');

// Create bulk order
const createBulkOrder = async (req, res) => {
  try {
    const { items, shippingAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return handleError(res, 400, 'At least one item is required');
    }

    if (!shippingAddress) {
      return handleError(res, 400, 'Shipping address is required');
    }

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = new BulkOrder({
      user: req.user.id,
      items,
      totalPrice,
      shippingAddress,
      notes,
    });

    await order.save();

    sendResponse(res, 201, true, 'Bulk order created', { order });
  } catch (error) {
    console.error('Create bulk order error:', error);
    handleError(res, 500, error.message);
  }
};

// Get user bulk orders
const getUserBulkOrders = async (req, res) => {
  try {
    const orders = await BulkOrder.find({ user: req.user.id })
      .populate('items.product')
      .populate('items.seller')
      .sort({ createdAt: -1 });

    sendResponse(res, 200, true, 'Bulk orders fetched', { orders });
  } catch (error) {
    console.error('Get user bulk orders error:', error);
    handleError(res, 500, error.message);
  }
};

// Get bulk order details
const getBulkOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await BulkOrder.findById(orderId)
      .populate('items.product')
      .populate('items.seller');

    if (!order) {
      return handleError(res, 404, 'Order not found');
    }

    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return handleError(res, 403, 'Unauthorized');
    }

    sendResponse(res, 200, true, 'Order details fetched', { order });
  } catch (error) {
    console.error('Get bulk order details error:', error);
    handleError(res, 500, error.message);
  }
};

// Update bulk order status (admin)
const updateBulkOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return handleError(res, 400, 'Status is required');
    }

    const order = await BulkOrder.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate('items.product').populate('items.seller');

    if (!order) {
      return handleError(res, 404, 'Order not found');
    }

    sendResponse(res, 200, true, 'Order status updated', { order });
  } catch (error) {
    console.error('Update bulk order status error:', error);
    handleError(res, 500, error.message);
  }
};

module.exports = {
  createBulkOrder,
  getUserBulkOrders,
  getBulkOrderDetails,
  updateBulkOrderStatus,
};
