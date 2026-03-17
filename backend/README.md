# Price Tracker Backend

A Node.js/Express backend server for the Price Tracker application - comparing product prices across multiple e-commerce platforms.

## Features

- ✅ User Authentication (JWT)
- ✅ Product URL parsing and web scraping
- ✅ Multi-platform price comparison (Amazon, Flipkart, Snapdeal)
- ✅ Price tracking and history
- ✅ Price alerts
- ✅ Wishlist management
- ✅ Bulk orders
- ✅ Admin analytics dashboard
- ✅ MongoDB database integration

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Web Scraping:** Puppeteer & Cheerio
- **Validation:** Zod
- **Logging:** Winston
- **Scheduling:** Node-cron

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud - MongoDB Atlas recommended)

### Setup

1. **Clone and navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend root directory and add:
   ```env
   # MongoDB Connection
   MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/price_tracker?retryWrites=true&w=majority

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # JWT Secret (Change in production!)
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

   # Frontend URL
   FRONTEND_URL=http://localhost:5173

   # Scraper Configuration
   SCRAPER_TIMEOUT=30000
   PRICE_UPDATE_INTERVAL=3600000
   ```

4. **Start the server**
   ```bash
   npm run dev    # Development mode (with nodemon)
   npm start      # Production mode
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Products
- `POST /api/products/add-by-url` - Add product by URL and get price comparison (Protected)
- `GET /api/products/:productId` - Get product details with all prices
- `GET /api/products/search` - Search products by name, brand, category

### Wishlist
- `GET /api/wishlist` - Get user wishlist (Protected)
- `POST /api/wishlist/add` - Add product to wishlist (Protected)
- `POST /api/wishlist/remove` - Remove product from wishlist (Protected)

### Price Alerts
- `POST /api/price-alerts` - Create price alert (Protected)
- `GET /api/price-alerts` - Get all user price alerts (Protected)
- `PUT /api/price-alerts/:alertId` - Update price alert (Protected)
- `DELETE /api/price-alerts/:alertId` - Delete price alert (Protected)

### Bulk Orders
- `POST /api/bulk-orders` - Create bulk order (Protected)
- `GET /api/bulk-orders` - Get user bulk orders (Protected)
- `GET /api/bulk-orders/:orderId` - Get bulk order details (Protected)
- `PUT /api/bulk-orders/:orderId/status` - Update order status (Admin)

### Analytics
- `GET /api/analytics/dashboard` - Get analytics dashboard (Admin)
- `GET /api/analytics/scraper-status` - Get scraper status (Admin)

### Health Check
- `GET /api/health` - Server health check

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── logger.js              # Winston logger
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Price.js
│   │   ├── Seller.js
│   │   ├── PriceHistory.js
│   │   ├── PriceAlert.js
│   │   ├── Wishlist.js
│   │   └── BulkOrder.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── wishlistController.js
│   │   ├── priceAlertController.js
│   │   ├── bulkOrderController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── priceAlertRoutes.js
│   │   ├── bulkOrderRoutes.js
│   │   └── analyticsRoutes.js
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   ├── errorHandler.js        # Error handling
│   │   └── validation.js          # Request validation
│   ├── utils/
│   │   ├── scraper.js             # Web scraping utilities
│   │   ├── tokenGenerator.js      # JWT token generation
│   │   ├── responseHandler.js     # Response formatting
│   │   └── helpers.js             # Utility functions
│   └── server.js                   # Main server file
├── .env                            # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Environment Variables Guide

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | mongodb+srv://... |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development, production |
| `JWT_SECRET` | Secret key for JWT tokens | your_secret_key |
| `FRONTEND_URL` | Frontend application URL | http://localhost:5173 |
| `SCRAPER_TIMEOUT` | Timeout for web scraping (ms) | 30000 |
| `PRICE_UPDATE_INTERVAL` | Interval for price updates (ms) | 3600000 |

## MongoDB Setup (MongoDB Atlas - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Add your IP address to IP Whitelist
5. Create a database user
6. Copy the connection string
7. Replace `your_username` and `your_password` in the connection string
8. Add the connection string to your `.env` file

## Supported E-commerce Platforms

- Amazon
- Flipkart
- Snapdeal
- Paytm (upcoming)
- Myntra (upcoming)
- Ajio (upcoming)
- eBay (upcoming)

## Error Handling

The API returns error responses in the following format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": []  // Optional validation errors
}
```

## Development Tips

- Use `npm run dev` for development with auto-restart
- Check `.env` file is created with MongoDB URI
- Test endpoints using Postman or Insomnia
- Check browser console for CORS issues
- Ensure frontend FRONTEND_URL matches the frontend URL

## Next Steps

1. Update `.env` with your MongoDB connection string
2. Test the health endpoint: `GET http://localhost:5000/api/health`
3. Register a new user: `POST http://localhost:5000/api/auth/register`
4. Try adding a product with URL: `POST http://localhost:5000/api/products/add-by-url`

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB URI in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

### Scraping Issues
- Some websites block scrapers - may need to use proxies
- Adjust SCRAPER_TIMEOUT if websites are slow
- Check if website structure matches scraper selectors

### CORS Errors
- Update FRONTEND_URL in `.env` to match your frontend
- Ensure frontend is making requests to correct backend URL

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.
