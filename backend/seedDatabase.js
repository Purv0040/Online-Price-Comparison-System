const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const TrendingProduct = require('./src/models/TrendingProduct');
const Price = require('./src/models/Price');
const PriceHistory = require('./src/models/PriceHistory');
const Seller = require('./src/models/Seller');
require('dotenv').config();

const productsToSeed = [
  { _id: "660000000000000000000001", brand: "Apple", title: "iPhone 15 Pro, 256GB - Natural Titanium", price: 83000, image: "https://m.media-amazon.com/images/I/81fxjeu8fdL._SL1500_.jpg", category: "Electronics", badge: "HOT DEAL", badgeColor: "bg-secondary", rating: 4.8, isTrending: true, originalUrl: "https://amazon.in/p1", originalPlatform: "amazon" },
  { _id: "660000000000000000000002", brand: "Samsung", title: "Samsung Galaxy S26 Ultra", price: 159999, image: "https://m.media-amazon.com/images/I/414vDlnDqjL._SY300_SX300_QL70_FMwebp_.jpg", category: "Electronics", badge: "NEW", badgeColor: "bg-success", rating: 4.7, isTrending: true, originalUrl: "https://amazon.in/p2", originalPlatform: "amazon" },
  { _id: "660000000000000000000003", brand: "Sony", title: "Sony WH-1000XM5 Headphones", price: 29990, image: "https://m.media-amazon.com/images/I/31IZif7WArL._SY300_SX300_QL70_FMwebp_.jpg", category: "Electronics", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p3", originalPlatform: "amazon" },
  { _id: "660000000000000000000004", brand: "Dell", title: "Dell XPS 13 Laptop", price: 95000, image: "https://m.media-amazon.com/images/I/712CAwRf6xL._SX679_.jpg", category: "Electronics", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.5, isTrending: false, originalUrl: "https://amazon.in/p4", originalPlatform: "amazon" },
  { _id: "660000000000000000000005", brand: "Apple", title: "Apple Watch Series 11", price: 49900, image: "https://m.media-amazon.com/images/I/41mUfdF4HaL._SX342_SY445_QL70_FMwebp_.jpg", category: "Electronics", badge: "TRENDING", badgeColor: "bg-danger", rating: 4.7, isTrending: true, originalUrl: "https://amazon.in/p5", originalPlatform: "amazon" },
  { _id: "660000000000000000000006", brand: "Nike", title: "Nike Air Force 1 Sneakers", price: 9999, image: "https://rukminim1.flixcart.com/image/2880/2880/xif0q/shoe/a/j/q/-original-imah852sq8xsuuhw.jpeg?q=90", category: "Fashion", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://flipkart.com/p6", originalPlatform: "flipkart" },
  { _id: "660000000000000000000007", brand: "Levi's", title: "Levi's 511 Slim Fit Jeans", price: 3999, image: "https://rukminim1.flixcart.com/image/2880/2880/xif0q/jean/o/i/u/-original-imah3fqkxcjrp9kb.jpeg?q=90", category: "Fashion", badge: "HOT", badgeColor: "bg-danger", rating: 4.5, isTrending: true, originalUrl: "https://flipkart.com/p7", originalPlatform: "flipkart" },
  { _id: "660000000000000000000008", brand: "Adidas", title: "Adidas Cotton Hoodie", price: 3499, image: "https://rukminim1.flixcart.com/image/2880/2880/xif0q/sweatshirt/x/p/r/-original-imahfwruudxkqtpc.jpeg?q=90", category: "Fashion", badge: "NEW", badgeColor: "bg-success", rating: 4.4, isTrending: false, originalUrl: "https://flipkart.com/p8", originalPlatform: "flipkart" },
  { _id: "660000000000000000000009", brand: "Ray-Ban", title: "Ray-Ban Aviator Sunglasses", price: 12999, image: "https://rukminim1.flixcart.com/image/2880/2880/xif0q/sunglass/g/g/k/-original-imahewcdzyavqwzh.jpeg?q=90", category: "Fashion", badge: "PREMIUM", badgeColor: "bg-dark", rating: 4.7, isTrending: true, originalUrl: "https://flipkart.com/p9", originalPlatform: "flipkart" },
  { _id: "660000000000000000000010", brand: "Puma", title: "Puma Running Shoes", price: 4999, image: "https://m.media-amazon.com/images/I/71Ss8kJWNGL._SY695_.jpg", category: "Fashion", badge: "TRENDING", badgeColor: "bg-primary", rating: 4.3, isTrending: true, originalUrl: "https://amazon.in/p10", originalPlatform: "amazon" },
  { _id: "660000000000000000000011", brand: "Philips", title: "Philips Air Fryer", price: 12999, image: "https://m.media-amazon.com/images/I/513r-ytcqDL._SX679_.jpg", category: "Home & Kitchen", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p11", originalPlatform: "amazon" },
  { _id: "660000000000000000000012", brand: "Prestige", title: "Prestige Pressure Cooker", price: 2499, image: "https://m.media-amazon.com/images/I/513njyVyr6L._SX679_.jpg", category: "Home & Kitchen", badge: "HOT", badgeColor: "bg-danger", rating: 4.5, isTrending: false, originalUrl: "https://amazon.in/p12", originalPlatform: "amazon" },
  { _id: "660000000000000000000013", brand: "LG", title: "LG 260L Refrigerator", price: 32000, image: "https://m.media-amazon.com/images/I/61psEFK5J6L._SY879_.jpg", category: "Home & Kitchen", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.4, isTrending: true, originalUrl: "https://amazon.in/p13", originalPlatform: "amazon" },
  { _id: "660000000000000000000014", brand: "IKEA", title: "IKEA Wooden Study Table", price: 9999, image: "https://m.media-amazon.com/images/I/61T97oGMs+L._SX679_.jpg", category: "Home & Kitchen", badge: "NEW", badgeColor: "bg-success", rating: 4.3, isTrending: false, originalUrl: "https://amazon.in/p14", originalPlatform: "amazon" },
  { _id: "660000000000000000000015", brand: "Milton", title: "Milton 1L Water Bottle", price: 499, image: "https://m.media-amazon.com/images/I/518vfYI5WJL._SX679_.jpg", category: "Home & Kitchen", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.2, isTrending: true, originalUrl: "https://amazon.in/p15", originalPlatform: "amazon" }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await TrendingProduct.deleteMany({});
    await Price.deleteMany({});
    await PriceHistory.deleteMany({});
    await Seller.deleteMany({});

    const sellers = await Seller.insertMany([
      { name: "Amazon", platform: "amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", rating: 4.5, isTrusted: true, baseUrl: "https://amazon.in" },
      { name: "Flipkart", platform: "flipkart", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg", rating: 4.2, isTrusted: true, baseUrl: "https://flipkart.com" }
    ]);

    for (const d of productsToSeed) {
      const prod = await Product.create({ ...d, description: `Premium ${d.title}` });
      if (d.isTrending) await TrendingProduct.create({ ...d, name: d.title, stores: "5 Stores Compared" });
      
      const price1 = d.price;
      const price2 = d.price + 200;

      await Price.insertMany([
        { product: prod._id, seller: sellers[0]._id, price: price1, originalPrice: d.price + 500, discount: 5, url: "#", isInStock: true },
        { product: prod._id, seller: sellers[1]._id, price: price2, originalPrice: d.price + 700, discount: 8, url: "#", isInStock: true }
      ]);

      // Seed history for BOTH sellers to have a realistic graph
      for (let i = 0; i < 7; i++) {
        await PriceHistory.create({ 
          product: prod._id, 
          seller: sellers[0]._id,
          price: price1 - (i * 100), 
          timestamp: new Date(Date.now() - i * 86400000) 
        });
        await PriceHistory.create({ 
          product: prod._id, 
          seller: sellers[1]._id,
          price: price2 - (i * 100), 
          timestamp: new Date(Date.now() - i * 86400000) 
        });
      }
    }
    console.log("Seeding complete. Exit code: 0");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
