#!/bin/bash
# Price Tracker Backend - Quick Setup Guide

echo "🚀 Price Tracker Backend - Setup Guide"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file with the following variables:"
    echo ""
    echo "MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/price_tracker?retryWrites=true&w=majority"
    echo "PORT=5000"
    echo "NODE_ENV=development"
    echo "JWT_SECRET=your_super_secret_jwt_key_change_this_in_production"
    echo "FRONTEND_URL=http://localhost:5173"
    echo "SCRAPER_TIMEOUT=30000"
    echo "PRICE_UPDATE_INTERVAL=3600000"
    echo ""
    exit 1
fi

echo "✅ .env file found"
echo ""
echo "📦 Installed Dependencies:"
npm list --depth=0
echo ""

echo "🎯 To start the server, run:"
echo "   npm run dev    (Development with auto-reload)"
echo "   npm start      (Production mode)"
echo ""

echo "📚 API Documentation:"
echo "   Health Check: GET http://localhost:5000/api/health"
echo "   Postman Collection: ./Price_Tracker_API.postman_collection.json"
echo ""

echo "🔧 Available Scripts:"
echo "   npm run dev    - Start development server with nodemon"
echo "   npm start      - Start production server"
echo "   npm test       - Run tests (not yet implemented)"
echo ""

echo "📋 Next Steps:"
echo "   1. Update .env with MongoDB connection string"
echo "   2. Run 'npm run dev' to start the server"
echo "   3. Test health endpoint: curl http://localhost:5000/api/health"
echo "   4. Use Postman collection to test API endpoints"
echo "   5. Check frontend connection: http://localhost:5173"
echo ""

echo "✨ Setup complete! Happy coding!"
