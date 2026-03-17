const express = require('express');
const router = express.Router();
const {
  createPriceAlert,
  getUserAlerts,
  updateAlert,
  deleteAlert,
} = require('../controllers/priceAlertController');
const { auth } = require('../middleware/auth');

// All routes are protected
router.post('/', auth, createPriceAlert);
router.get('/', auth, getUserAlerts);
router.put('/:alertId', auth, updateAlert);
router.delete('/:alertId', auth, deleteAlert);

module.exports = router;
