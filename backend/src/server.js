require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const priceAlertRoutes = require('./routes/priceAlertRoutes');
const bulkOrderRoutes = require('./routes/bulkOrderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const trendingRoutes = require('./routes/trendingRoutes');
const scraperRoutes = require('./routes/scraperRoutes');

// Scheduler
const { schedulePriceAlerts, schedulePriceUpdates } = require('./utils/scheduler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/price-alerts', priceAlertRoutes);
app.use('/api/bulk-orders', bulkOrderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/trending', trendingRoutes);
app.use('/api/scraper', scraperRoutes);

// Root route - List all available routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Price Tracker Backend API',
    version: '1.0.0',
    documentation: 'https://github.com/your-repo',
    availableRoutes: {
      health: 'GET /api/health',
      authentication: [
        'POST /api/auth/register',
        'POST /api/auth/login',
        'GET /api/auth/profile (Protected)',
        'PUT /api/auth/profile (Protected)',
      ],
      products: [
        'POST /api/products/add-by-url (Protected)',
        'GET /api/products/:productId',
        'GET /api/products/search',
      ],
      wishlist: [
        'GET /api/wishlist (Protected)',
        'POST /api/wishlist/add (Protected)',
        'POST /api/wishlist/remove (Protected)',
      ],
      priceAlerts: [
        'POST /api/price-alerts (Protected)',
        'GET /api/price-alerts (Protected)',
        'PUT /api/price-alerts/:alertId (Protected)',
        'DELETE /api/price-alerts/:alertId (Protected)',
      ],
      bulkOrders: [
        'POST /api/bulk-orders (Protected)',
        'GET /api/bulk-orders (Protected)',
        'GET /api/bulk-orders/:orderId (Protected)',
        'PUT /api/bulk-orders/:orderId/status (Admin)',
      ],
      analytics: [
        'GET /api/analytics/dashboard (Admin)',
        'GET /api/analytics/scraper-status (Admin)',
      ],
    },
    timestamp: new Date().toISOString(),
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);

  // Initialize schedulers
  schedulePriceAlerts();
  schedulePriceUpdates();
  logger.info('Background schedulers initialized');
});
