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
  { _id: "660000000000000000000015", brand: "Milton", title: "Milton 1L Water Bottle", price: 499, image: "https://m.media-amazon.com/images/I/518vfYI5WJL._SX679_.jpg", category: "Home & Kitchen", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.2, isTrending: true, originalUrl: "https://amazon.in/p15", originalPlatform: "amazon" },
  { _id: "660000000000000000000016", brand: "Penguin", title: "Atomic Habits Book", price: 499, image: "https://m.media-amazon.com/images/I/81bGKUa1e0L.jpg", category: "Books", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.8, isTrending: true, originalUrl: "https://amazon.in/p16", originalPlatform: "amazon" },
  { _id: "660000000000000000000017", brand: "HarperCollins", title: "The Alchemist", price: 299, image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg", category: "Books", badge: "CLASSIC", badgeColor: "bg-primary", rating: 4.7, isTrending: false, originalUrl: "https://amazon.in/p17", originalPlatform: "amazon" },
  { _id: "660000000000000000000018", brand: "Rupa", title: "Rich Dad Poor Dad", price: 399, image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg", category: "Books", badge: "TOP PICK", badgeColor: "bg-success", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p18", originalPlatform: "amazon" },
  { _id: "660000000000000000000019", brand: "Fingerprint", title: "Think and Grow Rich", price: 199, image: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg", category: "Books", badge: "HOT", badgeColor: "bg-danger", rating: 4.5, isTrending: false, originalUrl: "https://amazon.in/p19", originalPlatform: "amazon" },
  { _id: "660000000000000000000020", brand: "Westland", title: "Ikigai Book", price: 350, image: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg", category: "Books", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p20", originalPlatform: "amazon" },
  { _id: "660000000000000000000021", brand: "Exide", title: "Exide Car Battery", price: 5999, image: "https://m.media-amazon.com/images/I/31ifHdatUTL._QL70_FMwebp_.jpg", category: "Automotive", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p21", originalPlatform: "amazon" },
  { _id: "660000000000000000000022", brand: "Michelin", title: "Michelin Car Tyre", price: 7500, image: "https://m.media-amazon.com/images/I/51Qvx-e-STL._SX679_.jpg", category: "Automotive", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p22", originalPlatform: "amazon" },
  { _id: "660000000000000000000023", brand: "3M", title: "3M Car Care Kit", price: 1999, image: "https://m.media-amazon.com/images/I/41VwZbqPtTL._SY300_SX300_QL70_FMwebp_.jpg", category: "Automotive", badge: "HOT", badgeColor: "bg-danger", rating: 4.4, isTrending: false, originalUrl: "https://amazon.in/p23", originalPlatform: "amazon" },
  { _id: "660000000000000000000024", brand: "Castrol", title: "Castrol Engine Oil", price: 1200, image: "https://m.media-amazon.com/images/I/51PB36C0ZBL._SX679_.jpg", category: "Automotive", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p24", originalPlatform: "amazon" },
  { _id: "660000000000000000000025", brand: "Steelbird", title: "Steelbird Helmet", price: 1499, image: "https://m.media-amazon.com/images/I/417KU4kAPsL._SX300_SY300_QL70_FMwebp_.jpg", category: "Automotive", badge: "NEW", badgeColor: "bg-success", rating: 4.3, isTrending: false, originalUrl: "https://amazon.in/p25", originalPlatform: "amazon" },
  { _id: "660000000000000000000026", brand: "Nivea", title: "Nivea Body Lotion", price: 399, image: "https://m.media-amazon.com/images/I/61oRWpJlTVL._AC_UL640_FMwebp_QL65_.jpg", category: "Beauty & Personal Care", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p26", originalPlatform: "amazon" },
  { _id: "660000000000000000000027", brand: "L'Oreal", title: "L'Oreal Shampoo", price: 599, image: "https://m.media-amazon.com/images/I/61fqsL8-TaL._AC_UL640_FMwebp_QL65_.jpg", category: "Beauty & Personal Care", badge: "HOT", badgeColor: "bg-danger", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p27", originalPlatform: "amazon" },
  { _id: "660000000000000000000028", brand: "Lakme", title: "Lakme Face Cream", price: 299, image: "https://m.media-amazon.com/images/I/61fqwozv1BL._AC_UL640_FMwebp_QL65_.jpg", category: "Beauty & Personal Care", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.4, isTrending: false, originalUrl: "https://amazon.in/p28", originalPlatform: "amazon" },
  { _id: "660000000000000000000029", brand: "Garnier", title: "Garnier Face Wash", price: 199, image: "https://m.media-amazon.com/images/I/51O4CZnsiZL._AC_UL640_FMwebp_QL65_.jpg", category: "Beauty & Personal Care", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.3, isTrending: true, originalUrl: "https://amazon.in/p29", originalPlatform: "amazon" },
  { _id: "660000000000000000000030", brand: "Mamaearth", title: "Mamaearth Hair Oil", price: 499, image: "https://m.media-amazon.com/images/I/61gqnNffaqL._AC_UL640_FMwebp_QL65_.jpg", category: "Beauty & Personal Care", badge: "NEW", badgeColor: "bg-success", rating: 4.5, isTrending: false, originalUrl: "https://amazon.in/p30", originalPlatform: "amazon" },
  { _id: "660000000000000000000031", brand: "Boldfit", title: "Boldfit Dumbbells Set", price: 1999, image: "https://m.media-amazon.com/images/I/61NEUWb5A4L._AC_UL640_FMwebp_QL65_.jpg", category: "Sports & Fitness", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p31", originalPlatform: "amazon" },
  { _id: "660000000000000000000032", brand: "Nike", title: "Nike Running Shoes", price: 4999, image: "https://m.media-amazon.com/images/I/61GLMtamzHL._AC_UL640_FMwebp_QL65_.jpg", category: "Sports & Fitness", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.7, isTrending: true, originalUrl: "https://amazon.in/p32", originalPlatform: "amazon" },
  { _id: "660000000000000000000033", brand: "Adidas", title: "Adidas Gym Bag", price: 1499, image: "https://m.media-amazon.com/images/I/51olVLAHyXL._AC_UL640_FMwebp_QL65_.jpg", category: "Sports & Fitness", badge: "HOT", badgeColor: "bg-danger", rating: 4.4, isTrending: false, originalUrl: "https://amazon.in/p33", originalPlatform: "amazon" },
  { _id: "660000000000000000000034", brand: "Decathlon", title: "Yoga Mat", price: 799, image: "https://m.media-amazon.com/images/I/61u-yef2rzL._AC_UL640_FMwebp_QL65_.jpg", category: "Sports & Fitness", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p34", originalPlatform: "amazon" },
  { _id: "660000000000000000000035", brand: "Cosco", title: "Cricket Bat", price: 1299, image: "https://m.media-amazon.com/images/I/61+MzVg77uL._AC_UL640_FMwebp_QL65_.jpg", category: "Sports & Fitness", badge: "NEW", badgeColor: "bg-success", rating: 4.3, isTrending: false, originalUrl: "https://amazon.in/p35", originalPlatform: "amazon" },
  { _id: "660000000000000000000036", brand: "Aashirvaad", title: "Aashirvaad Atta 5kg", price: 299, image: "https://m.media-amazon.com/images/I/91sjEAy2I4L._AC_UL640_FMwebp_QL65_.jpg", category: "Grocery", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.7, isTrending: true, originalUrl: "https://amazon.in/p36", originalPlatform: "amazon" },
  { _id: "660000000000000000000037", brand: "Tata", title: "Tata Salt 1kg", price: 30, image: "https://m.media-amazon.com/images/I/614mm2hYHyL._AC_UL640_FMwebp_QL65_.jpg", category: "Grocery", badge: "HOT", badgeColor: "bg-danger", rating: 4.6, isTrending: false, originalUrl: "https://amazon.in/p37", originalPlatform: "amazon" },
  { _id: "660000000000000000000038", brand: "Fortune", title: "Fortune Sunflower Oil", price: 180, image: "https://m.media-amazon.com/images/I/81gBShBlfOL._AC_UL640_FMwebp_QL65_.jpg", category: "Grocery", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p38", originalPlatform: "amazon" },
  { _id: "660000000000000000000039", brand: "Bru", title: "Bru Coffee 200g", price: 350, image: "https://m.media-amazon.com/images/I/51VfLWoseuL._AC_UL640_FMwebp_QL65_.jpg", category: "Grocery", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.4, isTrending: true, originalUrl: "https://amazon.in/p39", originalPlatform: "amazon" },
  { _id: "660000000000000000000040", brand: "Maggi", title: "Maggi Noodles Pack", price: 120, image: "https://m.media-amazon.com/images/I/71R+kuYnovL._AC_UL640_FMwebp_QL65_.jpg", category: "Grocery", badge: "NEW", badgeColor: "bg-success", rating: 4.8, isTrending: false, originalUrl: "https://amazon.in/p40", originalPlatform: "amazon" },
  { _id: "660000000000000000000041", brand: "Boat", title: "Boat Bluetooth Speaker", price: 1299, image: "https://m.media-amazon.com/images/I/71o6CU8MqVL._AC_UY436_FMwebp_QL65_.jpg", category: "Others", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p41", originalPlatform: "amazon" },
  { _id: "660000000000000000000042", brand: "Mi", title: "Mi Power Bank 10000mAh", price: 999, image: "https://m.media-amazon.com/images/I/41vBAaU8clL._AC_UY436_FMwebp_QL65_.jpg", category: "Others", badge: "HOT", badgeColor: "bg-danger", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p42", originalPlatform: "amazon" },
  { _id: "660000000000000000000043", brand: "AmazonBasics", title: "Laptop Backpack", price: 799, image: "https://m.media-amazon.com/images/I/71h9X7Wi6pL._AC_UY436_FMwebp_QL65_.jpg", category: "Others", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.4, isTrending: false, originalUrl: "https://amazon.in/p43", originalPlatform: "amazon" },
  { _id: "660000000000000000000044", brand: "Classmate", title: "Notebook Pack", price: 250, image: "https://m.media-amazon.com/images/I/71cikDzjhIL._AC_UL640_FMwebp_QL65_.jpg", category: "Others", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.3, isTrending: true, originalUrl: "https://amazon.in/p44", originalPlatform: "amazon" },
  { _id: "660000000000000000000045", brand: "Syska", title: "LED Bulb 9W", price: 120, image: "https://m.media-amazon.com/images/I/71MBUePMvQL._AC_UL640_FMwebp_QL65_.jpg", category: "Others", badge: "NEW", badgeColor: "bg-success", rating: 4.2, isTrending: false, originalUrl: "https://amazon.in/p45", originalPlatform: "amazon" },
  { _id: "660000000000000000000046", brand: "Fisher-Price", title: "Fisher-Price Baby Walker", price: 2499, image: "https://m.media-amazon.com/images/I/81ySCujGbaL._AC_UL640_FMwebp_QL65_.jpg", category: "Toys & Baby", badge: "BESTSELLER", badgeColor: "bg-warning", rating: 4.6, isTrending: true, originalUrl: "https://amazon.in/p46", originalPlatform: "amazon" },
  { _id: "660000000000000000000047", brand: "LuvLap", title: "LuvLap Baby Stroller", price: 5999, image: "https://m.media-amazon.com/images/I/81Vl7f5oY8L._AC_UY436_FMwebp_QL65_.jpg", category: "Toys & Baby", badge: "TOP PICK", badgeColor: "bg-primary", rating: 4.5, isTrending: true, originalUrl: "https://amazon.in/p47", originalPlatform: "amazon" },
  { _id: "660000000000000000000048", brand: "Himalaya", title: "Himalaya Baby Care Kit", price: 799, image: "https://m.media-amazon.com/images/I/712Z6iyiVHL._AC_UL640_FMwebp_QL65_.jpg", category: "Toys & Baby", badge: "HOT", badgeColor: "bg-danger", rating: 4.7, isTrending: true, originalUrl: "https://amazon.in/p48", originalPlatform: "amazon" },
  { _id: "660000000000000000000049", brand: "Funskool", title: "Funskool Building Blocks Set", price: 499, image: "https://m.media-amazon.com/images/I/61TXpN40ROL._AC_UL640_FMwebp_QL65_.jpg", category: "Toys & Baby", badge: "TRENDING", badgeColor: "bg-secondary", rating: 4.4, isTrending: true, originalUrl: "https://amazon.in/p49", originalPlatform: "amazon" },
  { _id: "660000000000000000000050", brand: "Mee Mee", title: "Mee Mee Baby Feeding Bottle", price: 299, image: "https://m.media-amazon.com/images/I/41zrNjfe-KL._AC_UL640_FMwebp_QL65_.jpg", category: "Toys & Baby", badge: "NEW", badgeColor: "bg-success", rating: 4.3, isTrending: false, originalUrl: "https://amazon.in/p50", originalPlatform: "amazon" }
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
      { name: "Flipkart", platform: "flipkart", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg", rating: 4.2, isTrusted: true, baseUrl: "https://flipkart.com" },
      { name: "Reliance Digital", platform: "other", logo: "https://www.reliancedigital.in/build/client/images/logo.66699B5a.svg", rating: 4.3, isTrusted: true, baseUrl: "https://reliancedigital.in" },
      { name: "Croma", platform: "other", logo: "https://media.croma.com/image/upload/v1637759004/Croma%20Assets/CMS/Category%20icon/Final%20Icons/Croma_Logo_m069df.png", rating: 4.4, isTrusted: true, baseUrl: "https://croma.com" },
      { name: "Snapdeal", platform: "snapdeal", logo: "https://upload.wikimedia.org/wikipedia/commons/d/df/Snapdeal_logo.svg", rating: 3.8, isTrusted: false, baseUrl: "https://snapdeal.com" },
      { name: "ShopClues", platform: "other", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/ShopClues_logo.svg", rating: 3.5, isTrusted: false, baseUrl: "https://shopclues.com" }
    ]);

    for (const d of productsToSeed) {
      const prod = await Product.create({ ...d, description: `Premium ${d.title}` });
      const isOriginalTrendingSet = BigInt(d._id) <= BigInt("660000000000000000000015");
      if (d.isTrending && isOriginalTrendingSet) {
        await TrendingProduct.create({
          ...d,
          name: d.title,
          stores: `${Math.floor(Math.random() * 5) + 3} Stores Compared`
        });
      }
      
      // Select 3 to 5 random sellers for each product
      const shuffledSellers = [...sellers].sort(() => 0.5 - Math.random());
      const selectedSellers = shuffledSellers.slice(0, Math.floor(Math.random() * 3) + 3);

      for (const seller of selectedSellers) {
        // Randomize price slightly around base price
        const priceDiff = Math.floor(Math.random() * (d.price * 0.1)) - (d.price * 0.05); // +/- 5% range
        const finalPrice = Math.round(d.price + priceDiff);
        const originalPrice = Math.round(finalPrice / (0.8 + Math.random() * 0.15)); // Calculate original based on discount
        const discount = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);

        await Price.create({
          product: prod._id,
          seller: seller._id,
          price: finalPrice,
          originalPrice: originalPrice,
          discount: discount,
          url: "#",
          isInStock: Math.random() > 0.1 // 90% in stock
        });

        // Seed history
        for (let i = 0; i < 7; i++) {
          await PriceHistory.create({ 
            product: prod._id, 
            seller: seller._id,
            price: finalPrice - (i * Math.floor(Math.random() * 200)), 
            timestamp: new Date(Date.now() - i * 86400000) 
          });
        }
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
