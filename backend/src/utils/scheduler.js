const cron = require('node-cron');
const { checkPriceAlerts } = require('../controllers/priceAlertController');
const logger = require('../config/logger');

// Schedule price alert checks every 6 hours
const schedulePriceAlerts = () => {
  cron.schedule('0 */6 * * *', async () => {
    logger.info('Running scheduled price alert check...');
    try {
      await checkPriceAlerts();
      logger.info('Price alert check completed');
    } catch (error) {
      logger.error('Price alert check failed:', error);
    }
  });
};

// Schedule price updates every hour
const schedulePriceUpdates = () => {
  cron.schedule('0 * * * *', async () => {
    logger.info('Running scheduled price update...');
    // TODO: Implement price update logic
    logger.info('Price update scheduled (not yet implemented)');
  });
};

module.exports = {
  schedulePriceAlerts,
  schedulePriceUpdates,
};
