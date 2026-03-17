const PriceAlert = require('../models/PriceAlert');
const Price = require('../models/Price');
const { sendResponse, handleError } = require('../utils/responseHandler');

// Create price alert
const createPriceAlert = async (req, res) => {
  try {
    const { productId, targetPrice } = req.body;

    if (!productId || !targetPrice) {
      return handleError(res, 400, 'Product ID and target price are required');
    }

    // Check if alert already exists
    const existingAlert = await PriceAlert.findOne({
      user: req.user.id,
      product: productId,
      isActive: true,
    });

    if (existingAlert) {
      return handleError(res, 400, 'Price alert already exists for this product');
    }

    const alert = new PriceAlert({
      user: req.user.id,
      product: productId,
      targetPrice,
    });

    await alert.save();

    sendResponse(res, 201, true, 'Price alert created', { alert });
  } catch (error) {
    console.error('Create price alert error:', error);
    handleError(res, 500, error.message);
  }
};

// Get all alerts for user
const getUserAlerts = async (req, res) => {
  try {
    const alerts = await PriceAlert.find({ user: req.user.id, isActive: true }).populate('product');

    sendResponse(res, 200, true, 'Alerts fetched', { alerts });
  } catch (error) {
    console.error('Get user alerts error:', error);
    handleError(res, 500, error.message);
  }
};

// Update alert
const updateAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    const { targetPrice, isActive } = req.body;

    const alert = await PriceAlert.findByIdAndUpdate(
      alertId,
      {
        targetPrice: targetPrice || undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!alert) {
      return handleError(res, 404, 'Alert not found');
    }

    sendResponse(res, 200, true, 'Alert updated', { alert });
  } catch (error) {
    console.error('Update alert error:', error);
    handleError(res, 500, error.message);
  }
};

// Delete alert
const deleteAlert = async (req, res) => {
  try {
    const { alertId } = req.params;

    const alert = await PriceAlert.findByIdAndUpdate(
      alertId,
      { isActive: false },
      { new: true }
    );

    if (!alert) {
      return handleError(res, 404, 'Alert not found');
    }

    sendResponse(res, 200, true, 'Alert deleted', { alert });
  } catch (error) {
    console.error('Delete alert error:', error);
    handleError(res, 500, error.message);
  }
};

// Check price alerts (run by scheduler)
const checkPriceAlerts = async () => {
  try {
    const alerts = await PriceAlert.find({ isActive: true })
      .populate('product')
      .populate('user', 'email preferences');

    for (const alert of alerts) {
      const prices = await Price.find({ product: alert.product._id }).sort({ price: 1 });

      if (prices.length > 0) {
        const currentPrice = prices[0].price;

        if (currentPrice <= alert.targetPrice && !alert.alertTriggered) {
          alert.alertTriggered = true;
          alert.triggeredDate = new Date();
          alert.notificationSent = true;
          await alert.save();

          // TODO: Send email notification to user
          console.log(`Price alert triggered for ${alert.product.title}: ${currentPrice}`);
        }
      }
    }
  } catch (error) {
    console.error('Check price alerts error:', error);
  }
};

module.exports = {
  createPriceAlert,
  getUserAlerts,
  updateAlert,
  deleteAlert,
  checkPriceAlerts,
};
