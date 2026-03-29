const mongoose = require('mongoose');
require('dotenv').config();
const TrendingProduct = require('./src/models/TrendingProduct');

const baseProducts = [
  { brand: "Apple", name: "iPhone 15 Pro, 256GB - Natural Titanium", basePrice: 999, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=400&hei=400&fmt=png&qlt=70" },
  { brand: "Sony", name: "WH-1000XM5 Wireless Noise Canceling", basePrice: 328, img: "https://www.sony.co.in/image/5d02da5df552836db894e5e4c2c9c2b1?fmt=png-alpha&wid=400" },
  { brand: "Keychron", name: "Keychron Q3 QMK Custom Mechanical Keyboard", basePrice: 159, img: "https://source.unsplash.com/400x400/?mechanical+keyboard" },
  { brand: "Hydro Flask", name: "Standard Mouth Bottle with Flex Cap 24oz", basePrice: 34, img: "https://source.unsplash.com/400x400/?water+bottle" },
  { brand: "Samsung", name: "Galaxy S24 Ultra 256GB Titanium Black", basePrice: 1299, img: "https://images.samsung.com/is/image/samsung/assets/global/galaxy-s24-ultra/gallery/01.png?$400_400_PNG$" },
  { brand: "Samsung", name: "Galaxy S23 Ultra 256GB", basePrice: 999, img: "https://images.samsung.com/is/image/samsung/assets/global/galaxy-s23-ultra/gallery/01.png?$400_400_PNG$" },
  { brand: "Nike", name: "Air Jordan 1 Retro High OG", basePrice: 180, img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/air-jordan-1-retro-high-og.png" },
  { brand: "Nike", name: "Air Max 270", basePrice: 160, img: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/air-max-270.png" },
  { brand: "Levi's", name: "501 Original Fit Jeans", basePrice: 79, img: "https://lsco.scene7.com/is/image/lsco/levis/005040100-front-pdp?fmt=png&qlt=70&wid=400&hei=400" },
  { brand: "Apple", name: "MacBook Air M2 8GB 256GB", basePrice: 1199, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-202206?wid=400&hei=400&fmt=png&qlt=70" },
  { brand: "Apple", name: "iPad Pro 11-inch M2", basePrice: 799, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202210?wid=400&hei=400&fmt=png&qlt=70" },
  { brand: "Apple", name: "AirPods Pro (2nd Gen)", basePrice: 249, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2nd-gen-select-202209?wid=400&hei=400&fmt=png&qlt=70" },
  { brand: "Apple", name: "AirPods Max Space Gray", basePrice: 549, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-spacegray-202011?wid=400&hei=400&fmt=png&qlt=70" },
  { brand: "Apple", name: "Apple Watch Ultra 2", basePrice: 799, img: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-watch-ultra-select-202209?wid=400&hei=400&fmt=png&qlt=70" }
];

const badges = [
  { text: "HOT DEAL", color: "bg-[#0e121b]" },     // e.g. using primary/secondary dark
  { text: "HOT DEAL", color: "bg-blue-600" },
  { text: "-25% OFF", color: "bg-red-500" },
  { text: "NEW", color: "bg-green-500" },
  { text: null, color: null },
  { text: null, color: null }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing
    await TrendingProduct.deleteMany({});
    console.log('Cleared existing trending products');

    const productsToInsert = [];

    // Let's generate 60 products total
    for (let i = 0; i < 60; i++) {
        // pick a random base product
        const base = baseProducts[i % baseProducts.length];
        const badgeObj = badges[Math.floor(Math.random() * badges.length)];
        
        let priceNum = base.basePrice;
        if (i >= baseProducts.length) {
          // Add some variation for duplicates
          priceNum = priceNum + (Math.floor(Math.random() * 50) - 25);
        }
        
        productsToInsert.push({
            brand: base.brand,
            name: i >= baseProducts.length ? `${base.name} (Variant ${i + 1})` : base.name,
            price: `$${priceNum}.00`,
            image: base.img,
            badge: badgeObj.text,
            badgeColor: badgeObj.color,
            stores: `${Math.floor(Math.random() * 10) + 2} Stores Compared`
        });
    }

    await TrendingProduct.insertMany(productsToInsert);
    console.log(`Successfully seeded ${productsToInsert.length} trending products!`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
