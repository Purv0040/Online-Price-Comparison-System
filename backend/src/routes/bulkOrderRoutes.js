const express = require('express');
const router = express.Router();
const {
  createBulkOrder,
  getUserBulkOrders,
  getBulkOrderDetails,
  updateBulkOrderStatus,
} = require('../controllers/bulkOrderController');
const { auth, adminAuth } = require('../middleware/auth');

// Protected routes for users
router.post('/', auth, createBulkOrder);
router.get('/', auth, getUserBulkOrders);
router.get('/:orderId', auth, getBulkOrderDetails);

// Admin routes
router.put('/:orderId/status', adminAuth, updateBulkOrderStatus);

module.exports = router;
