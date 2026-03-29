const mongoose = require('mongoose');
const Product = require('./src/models/Product');
const Price = require('./src/models/Price');
const PriceHistory = require('./src/models/PriceHistory');
const Seller = require('./src/models/Seller');
require('dotenv').config();

// Function to generate product-specific image URLs
function generateProductImage(product) {
  const { title, category, brand, tags } = product;
  
  // Working product images from reliable sources
  const realProductImages = {
  // iPhones
  'iphone 15 pro max': 'https://photos.app.goo.gl/random1', // Placeholder or real
  'iphone 15 pro': 'https://photos.app.goo.gl/random2',
  'sony wh-1000xm5': 'https://www.sony.co.in/image/5d02da5df552836db894e5e4c2c9c2b1?fmt=png-alpha&wid=400',
  'macbook air': 'https://www.apple.com/v/macbook-air/q/images/overview/design/design_m3_midnight__ekyghz2of86q_large.jpg'
  };

  const titleLower = title.toLowerCase();
  
  // Map keywords to loremflickr for high-quality variety
  const tagsStr = tags ? tags.join(',') : category;
  return `https://loremflickr.com/600/600/${encodeURIComponent(tagsStr.split(',')[0] || category)}?lock=${Math.abs(hashString(title))}`;
}

// Simple hash function for consistent images
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Sample product data with 100+ realistic products
const sampleProducts = [
  // iPhones (12 products)
  {
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
    description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "pro", "5g", "camera"],
    originalUrl: "https://www.amazon.com/iphone-15-pro-max",
    originalPlatform: "amazon",
    asin: "B0CHX2XQF6",
    image: "https://picsum.photos/seed/iphone-15-pro-max-titanium/400/400",
  },
  {
    title: "Apple iPhone 15 Pro 128GB Blue Titanium",
    description: "iPhone 15 Pro with A17 Pro chip and professional camera system",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "pro", "5g"],
    originalUrl: "https://www.amazon.com/iphone-15-pro",
    originalPlatform: "amazon",
    asin: "B0CHX1W5XX",
    image: "https://picsum.photos/seed/iphone-15-pro-blue/400/400"
  },
  {
    title: "Apple iPhone 15 128GB Pink",
    description: "iPhone 15 with Dynamic Island and advanced dual-camera system",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "5g", "camera"],
    originalUrl: "https://www.amazon.com/iphone-15",
    originalPlatform: "amazon",
    asin: "B0CHX1X1X3",
    image: "https://picsum.photos/seed/iphone-15-pink/400/400"
  },
  {
    title: "Apple iPhone 15 Plus 256GB Yellow",
    description: "Large display iPhone 15 Plus with all-day battery life",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "plus", "5g"],
    originalUrl: "https://www.amazon.com/iphone-15-plus",
    originalPlatform: "amazon",
    asin: "B0CHX2XQF7",
    image: "https://picsum.photos/seed/iphone-15-plus-yellow/400/400"
  },
  {
    title: "Apple iPhone 14 Pro Max 256GB Deep Purple",
    description: "iPhone 14 Pro Max with A16 Bionic chip and 48MP camera",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "pro", "5g", "camera"],
    originalUrl: "https://www.amazon.com/iphone-14-pro-max",
    originalPlatform: "amazon",
    asin: "B0BDK62PDX",
    image: "https://picsum.photos/seed/iphone-14-pro-max-purple/400/400"
  },
  {
    title: "Apple iPhone 14 Pro 128GB Silver",
    description: "iPhone 14 Pro with Dynamic Island and ProMotion display",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "pro", "5g"],
    originalUrl: "https://www.amazon.com/iphone-14-pro",
    originalPlatform: "amazon",
    asin: "B0BDKHX7JQ",
    image: "https://picsum.photos/seed/iphone-14-pro-silver/400/400"
  },
  {
    title: "Apple iPhone 14 128GB Blue",
    description: "iPhone 14 with impressive dual-camera system and A15 Bionic chip",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "5g", "camera"],
    originalUrl: "https://www.amazon.com/iphone-14",
    originalPlatform: "amazon",
    asin: "B0BDK5N1M2",
    image: "https://picsum.photos/seed/iphone-14-blue/400/400"
  },
  {
    title: "Apple iPhone 13 128GB Starlight",
    description: "iPhone 13 with advanced dual-camera system and A15 Bionic chip",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "5g", "camera"],
    originalUrl: "https://www.amazon.com/iphone-13",
    originalPlatform: "amazon",
    asin: "B09G9FBL6C",
    image: "https://picsum.photos/seed/iphone-13-starlight/400/400"
  },
  {
    title: "Apple iPhone SE 3rd Gen 64GB Red",
    description: "iPhone SE with A15 Bionic chip and Touch ID",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "se", "5g"],
    originalUrl: "https://www.amazon.com/iphone-se",
    originalPlatform: "amazon",
    asin: "B0B3KJBP5Q",
    image: "https://picsum.photos/seed/iphone-se-red/400/400"
  },
  {
    title: "Apple iPhone 12 64GB Purple",
    description: "iPhone 12 with Super Retina XDR display and A14 Bionic chip",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "5g"],
    originalUrl: "https://www.amazon.com/iphone-12",
    originalPlatform: "amazon",
    asin: "B08PNVFT5Y",
    image: "https://picsum.photos/seed/iphone-12-purple/400/400"
  },
  {
    title: "Apple iPhone 11 128GB Black",
    description: "iPhone 11 with dual-camera system and A13 Bionic chip",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "camera"],
    originalUrl: "https://www.amazon.com/iphone-11",
    originalPlatform: "amazon",
    asin: "B07XVJY64F",
    image: "https://picsum.photos/seed/iphone-11-black/400/400"
  },
  {
    title: "Apple iPhone XR 64GB Blue",
    description: "iPhone XR with Liquid Retina display and A12 Bionic chip",
    category: "Electronics",
    brand: "Apple",
    tags: ["iphone", "smartphone", "apple", "xr"],
    originalUrl: "https://www.amazon.com/iphone-xr",
    originalPlatform: "amazon",
    asin: "B07JVS8XCL",
    image: "https://picsum.photos/seed/iphone-xr-blue/400/400"
  },

  // Android Phones (10 products)
  {
    title: "Samsung Galaxy S24 Ultra 256GB Titanium Black",
    description: "Samsung's flagship with S Pen and 200MP camera",
    category: "Electronics",
    brand: "Samsung",
    tags: ["samsung", "galaxy", "android", "smartphone", "ultra", "5g", "camera"],
    originalUrl: "https://www.amazon.com/galaxy-s24-ultra",
    originalPlatform: "amazon",
    asin: "B0CMJXHJ4C",
    image: "https://source.unsplash.com/400x400/?galaxy+s24+ultra+black"
  },
  {
    title: "Samsung Galaxy S24 Plus 256GB Cobalt Violet",
    description: "Galaxy S24 Plus with advanced AI features and bright display",
    category: "Electronics",
    brand: "Samsung",
    tags: ["samsung", "galaxy", "android", "smartphone", "5g"],
    originalUrl: "https://www.amazon.com/galaxy-s24-plus",
    originalPlatform: "amazon",
    asin: "B0CMJXHJ4D",
    image: "https://source.unsplash.com/400x400/?galaxy+s24+plus+violet"
  },
  {
    title: "Samsung Galaxy S23 Ultra 256GB Phantom Black",
    description: "Galaxy S23 Ultra with built-in S Pen and 200MP camera",
    category: "Electronics",
    brand: "Samsung",
    tags: ["samsung", "galaxy", "android", "smartphone", "ultra", "5g", "camera"],
    originalUrl: "https://www.amazon.com/galaxy-s23-ultra",
    originalPlatform: "amazon",
    asin: "B0BPXVVCVJ",
    image: "https://source.unsplash.com/400x400/?galaxy+s23+ultra+black"
  },
  {
    title: "Google Pixel 8 Pro 128GB Bay Blue",
    description: "Google Pixel with advanced AI photography and Tensor G3 chip",
    category: "Electronics",
    brand: "Google",
    tags: ["google", "pixel", "android", "smartphone", "pro", "5g", "camera"],
    originalUrl: "https://www.amazon.com/pixel-8-pro",
    originalPlatform: "amazon",
    asin: "B0CGD45L7B",
    image: "https://source.unsplash.com/400x400/?pixel+8+pro+blue"
  },
  {
    title: "Google Pixel 8 128GB Rose",
    description: "Pixel 8 with amazing AI features and Tensor G3 chip",
    category: "Electronics",
    brand: "Google",
    tags: ["google", "pixel", "android", "smartphone", "5g", "camera"],
    originalUrl: "https://www.amazon.com/pixel-8",
    originalPlatform: "amazon",
    asin: "B0CGD44FBL",
    image: "https://source.unsplash.com/400x400/?pixel+8+rose"
  },
  {
    title: "OnePlus 12 256GB Flowy Emerald",
    description: "OnePlus 12 with Hasselblad camera and fast charging",
    category: "Electronics",
    brand: "OnePlus",
    tags: ["oneplus", "android", "smartphone", "5g", "camera"],
    originalUrl: "https://www.amazon.com/oneplus-12",
    originalPlatform: "amazon",
    asin: "B0CMQXJFYC",
    image: "https://source.unsplash.com/400x400/?oneplus+12+emerald"
  },
  {
    title: "Xiaomi 13 Pro 256GB Ceramic Black",
    description: "Xiaomi 13 Pro with Leica camera and premium design",
    category: "Electronics",
    brand: "Xiaomi",
    tags: ["xiaomi", "android", "smartphone", "5g", "camera", "leica"],
    originalUrl: "https://www.amazon.com/xiaomi-13-pro",
    originalPlatform: "amazon",
    asin: "B0BQDW4X5T",
    image: "https://source.unsplash.com/400x400/?xiaomi+13+pro+black"
  },
  {
    title: "OPPO Find X6 Pro 256GB Desert Silver",
    description: "OPPO Find X6 Pro with Hasselblad camera system",
    category: "Electronics",
    brand: "OPPO",
    tags: ["oppo", "android", "smartphone", "5g", "camera", "hasselblad"],
    originalUrl: "https://www.amazon.com/oppo-find-x6-pro",
    originalPlatform: "amazon",
    asin: "B0C3X4Y5Z6",
    image: "https://source.unsplash.com/400x400/?oppo+find+x6+pro+silver"
  },
  {
    title: "Vivo X90 Pro 256GB Legendary Black",
    description: "Vivo X90 Pro with Zeiss optics and premium design",
    category: "Electronics",
    brand: "Vivo",
    tags: ["vivo", "android", "smartphone", "5g", "camera", "zeiss"],
    originalUrl: "https://www.amazon.com/vivo-x90-pro",
    originalPlatform: "amazon",
    asin: "B0BQ8W3R2T",
    image: "https://source.unsplash.com/400x400/?vivo+x90+pro+black"
  },
  {
    title: "Nothing Phone 2 128GB White",
    description: "Nothing Phone 2 with unique transparent design and Glyph interface",
    category: "Electronics",
    brand: "Nothing",
    tags: ["nothing", "android", "smartphone", "5g", "design"],
    originalUrl: "https://www.amazon.com/nothing-phone-2",
    originalPlatform: "amazon",
    asin: "B0CZ8W9K7L",
    image: "https://source.unsplash.com/400x400/?nothing+phone+2+white"
  },

  // Laptops (8 products)
  {
    title: "MacBook Pro 14-inch M3 Pro 18GB RAM 512GB SSD",
    description: "MacBook Pro with M3 Pro chip and stunning Liquid Retina XDR display",
    category: "Electronics",
    brand: "Apple",
    tags: ["macbook", "laptop", "apple", "pro", "m3", "professional"],
    originalUrl: "https://www.amazon.com/macbook-pro-14",
    originalPlatform: "amazon",
    asin: "B0CMKJX1X2",
    image: "https://source.unsplash.com/400x400/?macbook+pro+14+m3"
  },
  {
    title: "MacBook Air 13-inch M2 8GB RAM 256GB SSD",
    description: "MacBook Air with M2 chip, thin and light design",
    category: "Electronics",
    brand: "Apple",
    tags: ["macbook", "laptop", "apple", "air", "m2", "portable"],
    originalUrl: "https://www.amazon.com/macbook-air-13",
    originalPlatform: "amazon",
    asin: "B0B3D2J7Q9",
    image: "https://source.unsplash.com/400x400/?macbook+air+13+m2"
  },
  {
    title: "Dell XPS 15 9530 Intel Core i7 16GB RAM 1TB SSD",
    description: "Dell XPS 15 with stunning 4K display and powerful performance",
    category: "Electronics",
    brand: "Dell",
    tags: ["dell", "xps", "laptop", "intel", "i7", "professional"],
    originalUrl: "https://www.amazon.com/dell-xps-15",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8M",
    image: "https://source.unsplash.com/400x400/?dell+xps+15"
  },
  {
    title: "HP Spectre x360 14 Intel Core i7 16GB RAM 512GB SSD",
    description: "HP Spectre x360 2-in-1 with OLED display and premium design",
    category: "Electronics",
    brand: "HP",
    tags: ["hp", "spectre", "laptop", "intel", "i7", "2-in-1"],
    originalUrl: "https://www.amazon.com/hp-spectre-x360",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8N",
    image: "https://source.unsplash.com/400x400/?hp+spectre+x360"
  },
  {
    title: "Lenovo ThinkPad X1 Carbon Gen 11 Intel Core i7 16GB RAM 1TB SSD",
    description: "ThinkPad X1 Carbon with business-grade security and durability",
    category: "Electronics",
    brand: "Lenovo",
    tags: ["lenovo", "thinkpad", "laptop", "intel", "i7", "business"],
    originalUrl: "https://www.amazon.com/thinkpad-x1-carbon",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8O",
    image: "https://source.unsplash.com/400x400/?thinkpad+x1+carbon"
  },
  {
    title: "ASUS ROG Zephyrus G16 AMD Ryzen 9 16GB RAM 1TB SSD RTX 4070",
    description: "ASUS ROG gaming laptop with powerful graphics and display",
    category: "Electronics",
    brand: "ASUS",
    tags: ["asus", "rog", "laptop", "gaming", "amd", "ryzen", "rtx"],
    originalUrl: "https://www.amazon.com/asus-rog-zephyrus",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8P",
    image: "https://source.unsplash.com/400x400/?asus+rog+zephyrus"
  },
  {
    title: "Microsoft Surface Laptop 5 Intel Core i7 16GB RAM 256GB SSD",
    description: "Surface Laptop 5 with touchscreen and premium design",
    category: "Electronics",
    brand: "Microsoft",
    tags: ["microsoft", "surface", "laptop", "intel", "i7", "touchscreen"],
    originalUrl: "https://www.amazon.com/surface-laptop-5",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8Q",
    image: "https://source.unsplash.com/400x400/?surface+laptop+5"
  },
  {
    title: "Acer Swift 3 Intel Core i5 8GB RAM 512GB SSD",
    description: "Acer Swift 3 with lightweight design and long battery life",
    category: "Electronics",
    brand: "Acer",
    tags: ["acer", "swift", "laptop", "intel", "i5", "portable"],
    originalUrl: "https://www.amazon.com/acer-swift-3",
    originalPlatform: "amazon",
    asin: "B0B3KJ7P8R",
    image: "https://source.unsplash.com/400x400/?acer+swift+3"
  },

  // Headphones (8 products)
  {
    title: "Apple AirPods Pro 2nd Gen with MagSafe Case",
    description: "AirPods Pro with active noise cancellation and spatial audio",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "airpods", "headphones", "pro", "noise-cancelling", "wireless"],
    originalUrl: "https://www.amazon.com/airpods-pro-2",
    originalPlatform: "amazon",
    asin: "B0BDJ8XQK7",
    image: "https://source.unsplash.com/400x400/?airpods+pro+2"
  },
  {
    title: "Apple AirPods Max Space Gray",
    description: "AirPods Max with premium sound and active noise cancellation",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "airpods", "headphones", "max", "noise-cancelling", "wireless"],
    originalUrl: "https://www.amazon.com/airpods-max",
    originalPlatform: "amazon",
    asin: "B08PZ2JQ4M",
    image: "https://source.unsplash.com/400x400/?airpods+max+gray"
  },
  {
    title: "Sony WH-1000XM5 Wireless Headphones Black",
    description: "Sony flagship headphones with industry-leading noise cancellation",
    category: "Electronics",
    brand: "Sony",
    tags: ["sony", "headphones", "wireless", "noise-cancelling", "premium"],
    originalUrl: "https://www.amazon.com/sony-wh-1000xm5",
    originalPlatform: "amazon",
    asin: "B09JB1V2G2",
    image: "https://source.unsplash.com/400x400/?sony+wh-1000xm5+black"
  },
  {
    title: "Bose QuietComfort Ultra Headphones Black",
    description: "Bose QC Ultra with world-class noise cancellation",
    category: "Electronics",
    brand: "Bose",
    tags: ["bose", "headphones", "quietcomfort", "noise-cancelling", "wireless"],
    originalUrl: "https://www.amazon.com/bose-quietcomfort-ultra",
    originalPlatform: "amazon",
    asin: "B0CG842Z2L",
    image: "https://source.unsplash.com/400x400/?bose+quietcomfort+ultra"
  },
  {
    title: "Sennheiser Momentum 4 Wireless Headphones Black",
    description: "Sennheiser Momentum 4 with exceptional sound quality",
    category: "Electronics",
    brand: "Sennheiser",
    tags: ["sennheiser", "headphones", "momentum", "wireless", "professional"],
    originalUrl: "https://www.amazon.com/sennheiser-momentum-4",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Y8",
    image: "https://source.unsplash.com/400x400/?sennheiser+momentum+4"
  },
  {
    title: "JBL Tour One M2 Wireless Headphones Black",
    description: "JBL Tour One M2 with adaptive noise cancellation",
    category: "Electronics",
    brand: "JBL",
    tags: ["jbl", "headphones", "tour", "wireless", "noise-cancelling"],
    originalUrl: "https://www.amazon.com/jbl-tour-one-m2",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Y9",
    image: "https://source.unsplash.com/400x400/?jbl+tour+one+m2"
  },
  {
    title: "Beats Studio Pro Wireless Headphones Black",
    description: "Beats Studio Pro with premium sound and active noise cancellation",
    category: "Electronics",
    brand: "Beats",
    tags: ["beats", "headphones", "studio", "wireless", "noise-cancelling"],
    originalUrl: "https://www.amazon.com/beats-studio-pro",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Z0",
    image: "https://source.unsplash.com/400x400/?beats+studio+pro"
  },
  {
    title: "Audio-Technica ATH-M50xBT2 Wireless Headphones Black",
    description: "Audio-Technica M50xBT2 with studio-quality sound",
    category: "Electronics",
    brand: "Audio-Technica",
    tags: ["audio-technica", "headphones", "studio", "wireless", "professional"],
    originalUrl: "https://www.amazon.com/audio-technica-ath-m50xbt2",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Z1",
    image: "https://source.unsplash.com/400x400/?audio-technica+ath-m50xbt2"
  },

  // Smartwatches (7 products)
  {
    title: "Apple Watch Series 9 GPS 45mm Midnight Aluminum",
    description: "Apple Watch Series 9 with advanced health features",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "watch", "smartwatch", "series-9", "health", "fitness"],
    originalUrl: "https://www.amazon.com/apple-watch-series-9",
    originalPlatform: "amazon",
    asin: "B0CHX2XQF8",
    image: "https://source.unsplash.com/400x400/?apple+watch+series+9"
  },
  {
    title: "Apple Watch Ultra 2 GPS 49mm Alpine Loop",
    description: "Apple Watch Ultra 2 for extreme adventures and sports",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "watch", "ultra", "smartwatch", "sports", "outdoor"],
    originalUrl: "https://www.amazon.com/apple-watch-ultra-2",
    originalPlatform: "amazon",
    asin: "B0CHX2XQF9",
    image: "https://source.unsplash.com/400x400/?apple+watch+ultra+2"
  },
  {
    title: "Samsung Galaxy Watch 6 Classic 47mm Black",
    description: "Samsung Galaxy Watch 6 Classic with rotating bezel",
    category: "Electronics",
    brand: "Samsung",
    tags: ["samsung", "galaxy", "watch", "smartwatch", "classic", "fitness"],
    originalUrl: "https://www.amazon.com/galaxy-watch-6-classic",
    originalPlatform: "amazon",
    asin: "B0CGD45L7C",
    image: "https://source.unsplash.com/400x400/?galaxy+watch+6+classic"
  },
  {
    title: "Google Pixel Watch 2 41mm Champagne Gold",
    description: "Google Pixel Watch 2 with Fitbit integration",
    category: "Electronics",
    brand: "Google",
    tags: ["google", "pixel", "watch", "smartwatch", "fitbit", "health"],
    originalUrl: "https://www.amazon.com/pixel-watch-2",
    originalPlatform: "amazon",
    asin: "B0CGD45L7D",
    image: "https://source.unsplash.com/400x400/?pixel+watch+2"
  },
  {
    title: "Garmin Fenix 7 Pro Solar 42mm Black",
    description: "Garmin Fenix 7 Pro with solar charging and advanced navigation",
    category: "Electronics",
    brand: "Garmin",
    tags: ["garmin", "fenix", "watch", "smartwatch", "outdoor", "navigation"],
    originalUrl: "https://www.amazon.com/garmin-fenix-7-pro",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Z2",
    image: "https://source.unsplash.com/400x400/?garmin+fenix+7+pro"
  },
  {
    title: "Fitbit Sense 2 Lunar White",
    description: "Fitbit Sense 2 with advanced health and wellness features",
    category: "Electronics",
    brand: "Fitbit",
    tags: ["fitbit", "sense", "watch", "smartwatch", "health", "wellness"],
    originalUrl: "https://www.amazon.com/fitbit-sense-2",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Z3",
    image: "https://source.unsplash.com/400x400/?fitbit+sense+2"
  },
  {
    title: "Amazfit GTR 4 Black",
    description: "Amazfit GTR 4 with GPS and long battery life",
    category: "Electronics",
    brand: "Amazfit",
    tags: ["amazfit", "gtr", "watch", "smartwatch", "fitness", "gps"],
    originalUrl: "https://www.amazon.com/amazfit-gtr-4",
    originalPlatform: "amazon",
    asin: "B0B7X6V7Z4",
    image: "https://source.unsplash.com/400x400/?amazfit+gtr+4"
  },

  // Tablets (5 products)
  {
    title: "iPad Pro 12.9-inch M2 128GB Wi-Fi Space Gray",
    description: "iPad Pro with M2 chip and stunning Liquid Retina XDR display",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "ipad", "tablet", "pro", "m2", "professional"],
    originalUrl: "https://www.amazon.com/ipad-pro-12-9",
    originalPlatform: "amazon",
    asin: "B0BDJ8XQK8",
    image: "https://source.unsplash.com/400x400/?ipad+pro+12.9+m2"
  },
  {
    title: "iPad Air 10.9-inch M1 64GB Wi-Fi Blue",
    description: "iPad Air with M1 chip and vibrant 10.9-inch display",
    category: "Electronics",
    brand: "Apple",
    tags: ["apple", "ipad", "tablet", "air", "m1", "portable"],
    originalUrl: "https://www.amazon.com/ipad-air-10-9",
    originalPlatform: "amazon",
    asin: "B0BDJ8XQK9",
    image: "https://source.unsplash.com/400x400/?ipad+air+10.9+m1"
  },
  {
    title: "Samsung Galaxy Tab S9 Ultra 14.6-inch 256GB Wi-Fi Graphite",
    description: "Samsung Galaxy Tab S9 Ultra with massive 14.6-inch display",
    category: "Electronics",
    brand: "Samsung",
    tags: ["samsung", "galaxy", "tab", "tablet", "ultra", "android"],
    originalUrl: "https://www.amazon.com/galaxy-tab-s9-ultra",
    originalPlatform: "amazon",
    asin: "B0CGD45L7E",
    image: "https://source.unsplash.com/400x400/?galaxy+tab+s9+ultra"
  },
  {
    title: "Microsoft Surface Pro 9 Intel Core i5 8GB RAM 256GB SSD",
    description: "Surface Pro 9 with 2-in-1 versatility and touchscreen",
    category: "Electronics",
    brand: "Microsoft",
    tags: ["microsoft", "surface", "tablet", "pro", "2-in-1", "touchscreen"],
    originalUrl: "https://www.amazon.com/surface-pro-9",
    originalPlatform: "amazon",
    asin: "B0BDJ8XQL0",
    image: "https://source.unsplash.com/400x400/?surface+pro+9"
  },
  {
    title: "Amazon Fire HD 10 Plus 32GB Wi-Fi Black",
    description: "Amazon Fire HD 10 Plus with wireless charging",
    category: "Electronics",
    brand: "Amazon",
    tags: ["amazon", "fire", "tablet", "hd", "budget", "entertainment"],
    originalUrl: "https://www.amazon.com/fire-hd-10-plus",
    originalPlatform: "amazon",
    asin: "B0971W8X1H",
    image: "https://source.unsplash.com/400x400/?fire+hd+10+plus"
  },

  // Smart Home (5 products)
  {
    title: "Amazon Echo Dot 5th Gen Smart Speaker Charcoal",
    description: "Echo Dot with Alexa and improved sound quality",
    category: "Electronics",
    brand: "Amazon",
    tags: ["amazon", "echo", "smart", "speaker", "alexa", "voice"],
    originalUrl: "https://www.amazon.com/echo-dot-5",
    originalPlatform: "amazon",
    asin: "B09B8V1DL3",
    image: "https://source.unsplash.com/400x400/?echo+dot+5+charcoal"
  },
  {
    title: "Google Nest Hub 2nd Gen Smart Display Chalk",
    description: "Google Nest Hub with Google Assistant and sleep tracking",
    category: "Electronics",
    brand: "Google",
    tags: ["google", "nest", "smart", "display", "assistant", "home"],
    originalUrl: "https://www.amazon.com/nest-hub-2",
    originalPlatform: "amazon",
    asin: "B08F3J5D7W",
    image: "https://source.unsplash.com/400x400/?nest+hub+2+chalk"
  },
  {
    title: "Philips Hue White and Color Ambiance Starter Kit",
    description: "Philips Hue smart lighting with 16 million colors",
    category: "Electronics",
    brand: "Philips",
    tags: ["philips", "hue", "smart", "lighting", "color", "home"],
    originalUrl: "https://www.amazon.com/philips-hue-starter",
    originalPlatform: "amazon",
    asin: "B07D9TZV8F",
    image: "https://source.unsplash.com/400x400/?philips+hue+starter"
  },
  {
    title: "Ring Video Doorbell Pro 2",
    description: "Ring Video Doorbell Pro 2 with advanced motion detection",
    category: "Electronics",
    brand: "Ring",
    tags: ["ring", "video", "doorbell", "security", "smart", "home"],
    originalUrl: "https://www.amazon.com/ring-doorbell-pro-2",
    originalPlatform: "amazon",
    asin: "B08F3J5D7X",
    image: "https://source.unsplash.com/400x400/?ring+doorbell+pro+2"
  },
  {
    title: "Nest Learning Thermostat 3rd Gen",
    description: "Nest Learning Thermostat with energy-saving features",
    category: "Electronics",
    brand: "Google",
    tags: ["google", "nest", "thermostat", "smart", "home", "energy"],
    originalUrl: "https://www.amazon.com/nest-thermostat-3",
    originalPlatform: "amazon",
    asin: "B0131RNW22",
    image: "https://source.unsplash.com/400x400/?nest+thermostat+3"
  },

  // Fashion - Clothing (15 products)
  {
    title: "Nike Air Jordan 1 Retro High OG Chicago",
    description: "Classic Air Jordan 1 in iconic Chicago colorway",
    category: "Fashion",
    brand: "Nike",
    tags: ["nike", "jordan", "sneakers", "basketball", "retro", "shoes"],
    originalUrl: "https://www.amazon.com/air-jordan-1-chicago",
    originalPlatform: "amazon",
    asin: "B084C7LR9M",
    image: "https://source.unsplash.com/400x400/?air+jordan+1+chicago"
  },
  {
    title: "Adidas Ultraboost 22 Running Shoes",
    description: "Responsive running shoes with full-length Boost midsole",
    category: "Fashion",
    brand: "Adidas",
    tags: ["adidas", "ultraboost", "running", "shoes", "athletic", "comfort"],
    originalUrl: "https://www.amazon.com/ultraboost-22",
    originalPlatform: "amazon",
    asin: "B09FQX1ZJ4",
    image: "https://source.unsplash.com/400x400/?ultraboost+22+running"
  },
  {
    title: "Levi's 501 Original Fit Jeans",
    description: "Classic straight-leg jeans in vintage wash",
    category: "Fashion",
    brand: "Levi's",
    tags: ["levis", "jeans", "denim", "casual", "classic", "pants"],
    originalUrl: "https://www.amazon.com/levis-501-jeans",
    originalPlatform: "amazon",
    asin: "B07V3JFJ8S",
    image: "https://source.unsplash.com/400x400/?levis+501+jeans"
  },
  {
    title: "Patagonia Better Sweater Fleece Jacket",
    description: "Cozy fleece jacket made from recycled polyester",
    category: "Fashion",
    brand: "Patagonia",
    tags: ["patagonia", "fleece", "jacket", "outdoor", "sustainable", "warm"],
    originalUrl: "https://www.amazon.com/patagonia-better-sweater",
    originalPlatform: "amazon",
    asin: "B07N8XG5K6",
    image: "https://source.unsplash.com/400x400/?patagonia+better+sweater"
  },
  {
    title: "The North Face Resolve 2 Jacket",
    description: "Waterproof hiking jacket with DryVent fabric",
    category: "Fashion",
    brand: "The North Face",
    tags: ["north face", "jacket", "hiking", "waterproof", "outdoor", "technical"],
    originalUrl: "https://www.amazon.com/north-face-resolve-2",
    originalPlatform: "amazon",
    asin: "B07N9T8R2X",
    image: "https://source.unsplash.com/400x400/?north+face+resolve+jacket"
  },
  {
    title: "Ray-Ban Aviator Classic Sunglasses",
    description: "Iconic aviator sunglasses with gold frame",
    category: "Fashion",
    brand: "Ray-Ban",
    tags: ["ray-ban", "sunglasses", "aviator", "classic", "eyewear", "fashion"],
    originalUrl: "https://www.amazon.com/ray-ban-aviator",
    originalPlatform: "amazon",
    asin: "B07PGL2ZSL",
    image: "https://source.unsplash.com/400x400/?ray-ban+aviator"
  },
  {
    title: "Champion Powerblend Fleece Hoodie",
    description: "Comfortable fleece hoodie with Champion logo",
    category: "Fashion",
    brand: "Champion",
    tags: ["champion", "hoodie", "fleece", "casual", "comfortable", "athletic"],
    originalUrl: "https://www.amazon.com/champion-hoodie",
    originalPlatform: "amazon",
    asin: "B08G7J7R4K",
    image: "https://source.unsplash.com/400x400/?champion+hoodie"
  },
  {
    title: "Converse Chuck Taylor All-Star High Tops",
    description: "Classic canvas high-top sneakers",
    category: "Fashion",
    brand: "Converse",
    tags: ["converse", "chuck taylor", "sneakers", "canvas", "classic", "casual"],
    originalUrl: "https://www.amazon.com/converse-chuck-taylor",
    originalPlatform: "amazon",
    asin: "B07N4TQ4S5",
    image: "https://source.unsplash.com/400x400/?converse+chuck+taylor"
  },
  {
    title: "Vans Old Skool Skate Shoes",
    description: "Classic skate shoes with side stripe",
    category: "Fashion",
    brand: "Vans",
    tags: ["vans", "old skool", "skate", "shoes", "casual", "classic"],
    originalUrl: "https://www.amazon.com/vans-old-skool",
    originalPlatform: "amazon",
    asin: "B07N8W8F2L",
    image: "https://source.unsplash.com/400x400/?vans+old+skool"
  },
  {
    title: "Tommy Hilfiger Classic Fit Polo Shirt",
    description: "Preppy polo shirt with embroidered logo",
    category: "Fashion",
    brand: "Tommy Hilfiger",
    tags: ["tommy hilfiger", "polo", "shirt", "classic", "preppy", "casual"],
    originalUrl: "https://www.amazon.com/tommy-polo-shirt",
    originalPlatform: "amazon",
    asin: "B07N7V4M3K",
    image: "https://source.unsplash.com/400x400/?tommy+polo+shirt"
  },
  {
    title: "Calvin Klein Men's Boxer Briefs 3-Pack",
    description: "Comfortable cotton blend boxer briefs",
    category: "Fashion",
    brand: "Calvin Klein",
    tags: ["calvin klein", "underwear", "boxer briefs", "cotton", "comfortable"],
    originalUrl: "https://www.amazon.com/calvin-klein-boxer-briefs",
    originalPlatform: "amazon",
    asin: "B07N6T8R4X",
    image: "https://source.unsplash.com/400x400/?calvin+klein+boxer+briefs"
  },
  {
    title: "Ralph Lauren Oxford Dress Shirt",
    description: "Classic oxford cloth dress shirt",
    category: "Fashion",
    brand: "Ralph Lauren",
    tags: ["ralph lauren", "oxford", "dress shirt", "formal", "classic", "business"],
    originalUrl: "https://www.amazon.com/ralph-lauren-oxford",
    originalPlatform: "amazon",
    asin: "B07N9K7F5L",
    image: "https://source.unsplash.com/400x400/?ralph+lauren+oxford+shirt"
  },
  {
    title: "Under Armour HeatGear Compression Shirt",
    description: "Moisture-wicking compression shirt for workouts",
    category: "Fashion",
    brand: "Under Armour",
    tags: ["under armour", "compression", "athletic", "workout", "performance"],
    originalUrl: "https://www.amazon.com/under-armour-compression",
    originalPlatform: "amazon",
    asin: "B07N8X9J6K",
    image: "https://source.unsplash.com/400x400/?under+armour+compression"
  },
  {
    title: "New Balance 574 Classic Sneakers",
    description: "Retro-inspired lifestyle sneakers",
    category: "Fashion",
    brand: "New Balance",
    tags: ["new balance", "574", "sneakers", "retro", "classic", "comfortable"],
    originalUrl: "https://www.amazon.com/new-balance-574",
    originalPlatform: "amazon",
    asin: "B07N7V8F4M",
    image: "https://source.unsplash.com/400x400/?new+balance+574"
  },
  {
    title: "PUMA RS-X³ Sneakers",
    description: "Bold retro-running inspired sneakers",
    category: "Fashion",
    brand: "PUMA",
    tags: ["puma", "rs-x", "sneakers", "retro", "athletic", "fashion"],
    originalUrl: "https://www.amazon.com/puma-rsx",
    originalPlatform: "amazon",
    asin: "B07N9T8R7N",
    image: "https://source.unsplash.com/400x400/?puma+rs-x+sneakers"
  },

  // Home & Kitchen (12 products)
  {
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "Multi-cooker with 7 functions including pressure cook and slow cook",
    category: "Home",
    brand: "Instant Pot",
    tags: ["instant pot", "pressure cooker", "multi-cooker", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/instant-pot-duo",
    originalPlatform: "amazon",
    asin: "B07N8X9J8K",
    image: "https://source.unsplash.com/400x400/?instant+pot+duo"
  },
  {
    title: "Ninja Nutri Blender Pro with Auto-iQ",
    description: "High-powered blender with smart programs",
    category: "Home",
    brand: "Ninja",
    tags: ["ninja", "blender", "nutri", "smoothie", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/ninja-blender",
    originalPlatform: "amazon",
    asin: "B07N7V8F5O",
    image: "https://source.unsplash.com/400x400/?ninja+blender"
  },
  {
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "Powerful cordless vacuum with laser dust detection",
    category: "Home",
    brand: "Dyson",
    tags: ["dyson", "vacuum", "cordless", "cleaning", "appliance", "powerful"],
    originalUrl: "https://www.amazon.com/dyson-v15",
    originalPlatform: "amazon",
    asin: "B08G7J7R7M",
    image: "https://source.unsplash.com/400x400/?dyson+v15+vacuum"
  },
  {
    title: "Keurig K-Elite Single Serve Coffee Maker",
    description: "Premium coffee maker with strong brew option",
    category: "Home",
    brand: "Keurig",
    tags: ["keurig", "coffee maker", "single serve", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/keurig-k-elite",
    originalPlatform: "amazon",
    asin: "B07N9K7F6P",
    image: "https://source.unsplash.com/400x400/?keurig+k-elite"
  },
  {
    title: "COSORI Air Fryer Max XL 5.8QT",
    description: "Large capacity air fryer with 13 preset functions",
    category: "Home",
    brand: "COSORI",
    tags: ["cosori", "air fryer", "cooking", "kitchen", "appliance", "healthy"],
    originalUrl: "https://www.amazon.com/cosori-air-fryer",
    originalPlatform: "amazon",
    asin: "B07N8W8F3Q",
    image: "https://source.unsplash.com/400x400/?cosori+air+fryer"
  },
  {
    title: "Breville Bambino Plus Espresso Machine",
    description: "Compact espresso machine with rapid heat-up",
    category: "Home",
    brand: "Breville",
    tags: ["breville", "espresso", "coffee machine", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/breville-bambino",
    originalPlatform: "amazon",
    asin: "B07N7V8F6R",
    image: "https://source.unsplash.com/400x400/?breville+bambino"
  },
  {
    title: "iRobot Roomba 692 Robot Vacuum",
    description: "Smart robot vacuum with Wi-Fi connectivity",
    category: "Home",
    brand: "iRobot",
    tags: ["irobot", "roomba", "robot vacuum", "cleaning", "smart", "automated"],
    originalUrl: "https://www.amazon.com/roomba-692",
    originalPlatform: "amazon",
    asin: "B07N9T8R8S",
    image: "https://source.unsplash.com/400x400/?irobot+roomba+692"
  },
  {
    title: "Waterpik Aquarius Water Flosser",
    description: "Advanced water flosser for oral hygiene",
    category: "Home",
    brand: "Waterpik",
    tags: ["waterpik", "water flosser", "oral care", "dental", "health", "hygiene"],
    originalUrl: "https://www.amazon.com/waterpik-aquarius",
    originalPlatform: "amazon",
    asin: "B07N8X9J9T",
    image: "https://source.unsplash.com/400x400/?waterpik+aquarius"
  },
  {
    title: "Crock-Pot 7-Quart Manual Slow Cooker",
    description: "Large capacity slow cooker for easy meal preparation",
    category: "Home",
    brand: "Crock-Pot",
    tags: ["crock-pot", "slow cooker", "cooking", "kitchen", "appliance", "convenient"],
    originalUrl: "https://www.amazon.com/crock-pot-slow-cooker",
    originalPlatform: "amazon",
    asin: "B07N7V8F7U",
    image: "https://source.unsplash.com/400x400/?crock-pot+slow+cooker"
  },
  {
    title: "Hamilton Beach FlexBrew Coffee Maker",
    description: "Versatile coffee maker for single serve or full pot",
    category: "Home",
    brand: "Hamilton Beach",
    tags: ["hamilton beach", "coffee maker", "flexbrew", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/hamilton-flexbrew",
    originalPlatform: "amazon",
    asin: "B07N9K7F8V",
    image: "https://source.unsplash.com/400x400/?hamilton+beach+flexbrew"
  },
  {
    title: "BLACK+DECKER 12-Cup Coffee Maker",
    description: "Programmable coffee maker with auto shut-off",
    category: "Home",
    brand: "BLACK+DECKER",
    tags: ["black+decker", "coffee maker", "programmable", "kitchen", "appliance"],
    originalUrl: "https://www.amazon.com/black-decker-coffee",
    originalPlatform: "amazon",
    asin: "B07N8W8F4W",
    image: "https://source.unsplash.com/400x400/?black+decker+coffee+maker"
  },
  {
    title: "Vitamix 5200 Blender",
    description: "Professional-grade blender for smoothies and more",
    category: "Home",
    brand: "Vitamix",
    tags: ["vitamix", "blender", "professional", "smoothie", "kitchen", "powerful"],
    originalUrl: "https://www.amazon.com/vitamix-5200",
    originalPlatform: "amazon",
    asin: "B07N9T8R9X",
    image: "https://source.unsplash.com/400x400/?vitamix+5200+blender"
  },

  // Sports & Outdoors (10 products)
  {
    title: "Wilson Evolution Basketball",
    description: "Indoor basketball with superior grip and feel",
    category: "Sports",
    brand: "Wilson",
    tags: ["wilson", "basketball", "indoor", "sports", "equipment", "game"],
    originalUrl: "https://www.amazon.com/wilson-evolution",
    originalPlatform: "amazon",
    asin: "B07N8X9JAY",
    image: "https://source.unsplash.com/400x400/?wilson+evolution+basketball"
  },
  {
    title: "Spalding NBA Street Basketball",
    description: "Outdoor basketball designed for street play",
    category: "Sports",
    brand: "Spalding",
    tags: ["spalding", "basketball", "outdoor", "street", "nba", "sports"],
    originalUrl: "https://www.amazon.com/spalding-street",
    originalPlatform: "amazon",
    asin: "B07N7V8F8Y",
    image: "https://source.unsplash.com/400x400/?spalding+street+basketball"
  },
  {
    title: "Nike Premier League Soccer Ball",
    description: "Official size soccer ball with Premier League branding",
    category: "Sports",
    brand: "Nike",
    tags: ["nike", "soccer", "football", "premier league", "sports", "ball"],
    originalUrl: "https://www.amazon.com/nike-soccer-ball",
    originalPlatform: "amazon",
    asin: "B07N9K7F9Z",
    image: "https://source.unsplash.com/400x400/?nike+premier+league+soccer"
  },
  {
    title: "Adidas Predator Soccer Cleats",
    description: "Professional soccer cleats with Demonskin technology",
    category: "Sports",
    brand: "Adidas",
    tags: ["adidas", "soccer", "cleats", "predator", "football", "professional"],
    originalUrl: "https://www.amazon.com/adidas-predator",
    originalPlatform: "amazon",
    asin: "B07N8W8F5A",
    image: "https://source.unsplash.com/400x400/?adidas+predator+cleats"
  },
  {
    title: "Yonex Voltric Z-Force II Badminton Racket",
    description: "High-performance badminton racket for advanced players",
    category: "Sports",
    brand: "Yonex",
    tags: ["yonex", "badminton", "racket", "voltric", "sports", "equipment"],
    originalUrl: "https://www.amazon.com/yonex-voltric",
    originalPlatform: "amazon",
    asin: "B07N9T8T0B",
    image: "https://source.unsplash.com/400x400/?yonex+voltric+badminton"
  },
  {
    title: "Wilson Pro Staff Tennis Racket",
    description: "Classic tennis racket used by professionals",
    category: "Sports",
    brand: "Wilson",
    tags: ["wilson", "tennis", "racket", "pro staff", "sports", "professional"],
    originalUrl: "https://www.amazon.com/wilson-pro-staff",
    originalPlatform: "amazon",
    asin: "B07N7V8F9C",
    image: "https://source.unsplash.com/400x400/?wilson+pro+staff+tennis"
  },
  {
    title: "Speedo Vanquisher 2.0 Swim Goggles",
    description: "Performance swim goggles with anti-fog coating",
    category: "Sports",
    brand: "Speedo",
    tags: ["speedo", "swim", "goggles", "vanquisher", "swimming", "performance"],
    originalUrl: "https://www.amazon.com/speedo-vanquisher",
    originalPlatform: "amazon",
    asin: "B07N8X9KB0",
    image: "https://source.unsplash.com/400x400/?speedo+vanquisher+goggles"
  },
  {
    title: "Theraband Resistance Bands Set",
    description: "Professional resistance bands for physical therapy and fitness",
    category: "Sports",
    brand: "Theraband",
    tags: ["theraband", "resistance bands", "fitness", "exercise", "physical therapy"],
    originalUrl: "https://www.amazon.com/theraband-bands",
    originalPlatform: "amazon",
    asin: "B07N7V8FAD",
    image: "https://source.unsplash.com/400x400/?theraband+resistance+bands"
  },
  {
    title: "Fitbit Charge 6 Fitness Tracker",
    description: "Advanced fitness tracker with built-in GPS",
    category: "Sports",
    brand: "Fitbit",
    tags: ["fitbit", "fitness tracker", "charge 6", "gps", "health", "exercise"],
    originalUrl: "https://www.amazon.com/fitbit-charge-6",
    originalPlatform: "amazon",
    asin: "B09FQX2ZK5",
    image: "https://source.unsplash.com/400x400/?fitbit+charge+6"
  },
  {
    title: "Garmin Forerunner 245 Running Watch",
    description: "GPS running watch with advanced training metrics",
    category: "Sports",
    brand: "Garmin",
    tags: ["garmin", "forerunner", "running", "watch", "gps", "fitness"],
    originalUrl: "https://www.amazon.com/garmin-forerunner-245",
    originalPlatform: "amazon",
    asin: "B07N9T8T1D",
    image: "https://source.unsplash.com/400x400/?garmin+forerunner+245"
  },

  // Books (8 products)
  {
    title: "Atomic Habits by James Clear",
    description: "Build good habits and break bad ones with proven strategies",
    category: "Books",
    brand: "Avery",
    tags: ["atomic habits", "james clear", "self-help", "productivity", "habits"],
    originalUrl: "https://www.amazon.com/atomic-habits",
    originalPlatform: "amazon",
    asin: "B07WXR7TZQ",
    image: "https://source.unsplash.com/400x400/?atomic+habits+book"
  },
  {
    title: "The Midnight Library by Matt Haig",
    description: "Novel about infinite lives and choices",
    category: "Books",
    brand: "Viking",
    tags: ["midnight library", "matt haig", "fiction", "novel", "philosophy"],
    originalUrl: "https://www.amazon.com/midnight-library",
    originalPlatform: "amazon",
    asin: "B07N8W8F6E",
    image: "https://source.unsplash.com/400x400/?midnight+library+book"
  },
  {
    title: "Educated by Tara Westover",
    description: "Memoir about a woman who leaves her survivalist family",
    category: "Books",
    brand: "Random House",
    tags: ["educated", "tara westover", "memoir", "biography", "education"],
    originalUrl: "https://www.amazon.com/educated",
    originalPlatform: "amazon",
    asin: "B07N9K7GAF",
    image: "https://source.unsplash.com/400x400/?educated+book"
  },
  {
    title: "Where the Crawdads Sing by Delia Owens",
    description: "Coming-of-age murder mystery set in the marshes",
    category: "Books",
    brand: "Putnam",
    tags: ["where the crawdads sing", "delia owens", "fiction", "mystery", "nature"],
    originalUrl: "https://www.amazon.com/crawdads-sing",
    originalPlatform: "amazon",
    asin: "B07N7V8FBE",
    image: "https://source.unsplash.com/400x400/?where+crawdads+sing"
  },
  {
    title: "The Silent Patient by Alex Michaelides",
    description: "Psychological thriller about a woman's silence after murder",
    category: "Books",
    brand: "Celadon",
    tags: ["silent patient", "alex michaelides", "thriller", "psychology", "mystery"],
    originalUrl: "https://www.amazon.com/silent-patient",
    originalPlatform: "amazon",
    asin: "B07N8X9KCF",
    image: "https://source.unsplash.com/400x400/?silent+patient+book"
  },
  {
    title: "Sapiens by Yuval Noah Harari",
    description: "Brief history of humankind from the Stone Age to the present",
    category: "Books",
    brand: "Harper",
    tags: ["sapiens", "yuval harari", "history", "anthropology", "non-fiction"],
    originalUrl: "https://www.amazon.com/sapiens",
    originalPlatform: "amazon",
    asin: "B07N9T8T2E",
    image: "https://source.unsplash.com/400x400/?sapiens+book"
  },
  {
    title: "The Alchemist by Paulo Coelho",
    description: "Philosophical novel about following your dreams",
    category: "Books",
    brand: "HarperCollins",
    tags: ["alchemist", "paulo coelho", "fiction", "philosophy", "inspiration"],
    originalUrl: "https://www.amazon.com/alchemist",
    originalPlatform: "amazon",
    asin: "B07N7V8FCF",
    image: "https://source.unsplash.com/400x400/?alchemist+book"
  },
  {
    title: "1984 by George Orwell",
    description: "Classic dystopian novel about totalitarian surveillance",
    category: "Books",
    brand: "Signet",
    tags: ["1984", "george orwell", "dystopian", "classic", "political"],
    originalUrl: "https://www.amazon.com/1984-orwell",
    originalPlatform: "amazon",
    asin: "B07N8W8F7G",
    image: "https://source.unsplash.com/400x400/?1984+george+orwell"
  }
];

// Sample sellers with categorized specialties
const sellers = [
  { name: "Amazon", platform: "amazon", baseUrl: "amazon.com", isTrusted: true, category: "Generic" },
  { name: "Walmart", platform: "other", baseUrl: "walmart.com", isTrusted: true, category: "Generic" },
  { name: "Best Buy", platform: "other", baseUrl: "bestbuy.com", isTrusted: true, category: "Electronics" },
  { name: "Croma", platform: "other", baseUrl: "croma.com", isTrusted: true, category: "Electronics" },
  { name: "Myntra", platform: "other", baseUrl: "myntra.com", isTrusted: true, category: "Fashion" },
  { name: "AJIO", platform: "other", baseUrl: "ajio.com", isTrusted: true, category: "Fashion" },
  { name: "Target", platform: "other", baseUrl: "target.com", isTrusted: true, category: "Home" },
  { name: "Barnes & Noble", platform: "other", baseUrl: "barnesandnoble.com", isTrusted: true, category: "Books" },
];

// Price ranges by category
const priceRanges = {
  'Electronics': { min: 100, max: 2000 },
  'Fashion': { min: 20, max: 300 },
  'Home': { min: 30, max: 500 },
  'Books': { min: 10, max: 50 },
  'Sports': { min: 25, max: 400 },
  'Beauty': { min: 15, max: 200 },
  'Groceries': { min: 5, max: 100 },
  'Toys': { min: 15, max: 150 },
  'Automotive': { min: 50, max: 800 },
  'Others': { min: 20, max: 300 }
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Price.deleteMany({});
    await Seller.deleteMany({});
    console.log('Cleared existing data');

    // Insert sellers
    const insertedSellers = await Seller.insertMany(sellers);
    console.log(`Inserted ${insertedSellers.length} sellers`);

    // Insert products and create prices
    const productsWithPrices = [];
    
    for (const productData of sampleProducts) {
      // Determine price range based on category
      let priceRange = priceRanges[productData.category] || priceRanges.Others;

      // Generate random price within range
      const price = Math.floor(Math.random() * (priceRange.max - priceRange.min + 1)) + priceRange.min;
      const originalPrice = Math.floor(price * (1.1 + Math.random() * 0.3)); // 10-40% higher

      // Create product
      const product = new Product({
        ...productData,
        rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
        reviews: Math.floor(Math.random() * 5000) + 100,
        image: generateProductImage(productData),
      });

      const savedProduct = await product.save();
      
      // Filter sellers assigned to this category or "Generic"
      const appropriateSellers = insertedSellers.filter(s => 
        s.category === productData.category || s.category === "Generic"
      );

      // Create prices for 1-3 appropriate sellers
      const numToCreate = Math.min(appropriateSellers.length, Math.floor(Math.random() * 2) + 1);
      const shuffledSellers = [...appropriateSellers].sort(() => 0.5 - Math.random());
      const selectedSellers = shuffledSellers.slice(0, numToCreate);

      for (const seller of selectedSellers) {
        // Vary price slightly per seller
        const variance = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
        const sellerPrice = Math.round(price * variance);
        const sellerOriginalPrice = Math.round(originalPrice * variance);

        const priceRecord = new Price({
          product: savedProduct._id,
          seller: seller._id,
          price: sellerPrice,
          originalPrice: sellerOriginalPrice,
          discount: Math.round(((sellerOriginalPrice - sellerPrice) / sellerOriginalPrice) * 100),
          url: productData.originalUrl,
          rating: savedProduct.rating,
          reviews: savedProduct.reviews,
        });

        await priceRecord.save();

        // Create price history
        const priceHistory = new PriceHistory({
          product: savedProduct._id,
          seller: seller._id,
          price: sellerPrice,
          discount: Math.round(((sellerOriginalPrice - sellerPrice) / sellerOriginalPrice) * 100),
        });

        await priceHistory.save();
      }

      productsWithPrices.push({
        ...savedProduct.toObject(),
        lowestPrice: price,
      });
    }

    console.log(`Inserted ${sampleProducts.length} products with category-specific prices`);

    // Test search functionality
    console.log('\n🔍 Testing search functionality:');
    
    const testQueries = ['iphone', 'laptop', 'samsung', 'airpods', 'watch'];
    
    for (const query of testQueries) {
      const searchResults = await Product.find({
        isActive: true,
        $or: [
          { title: { $regex: new RegExp(query, 'i') } },
          { brand: { $regex: new RegExp(query, 'i') } },
          { category: { $regex: new RegExp(query, 'i') } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      });
      
      console.log(`Search "${query}": Found ${searchResults.length} products`);
      searchResults.slice(0, 3).forEach(p => console.log(`  - ${p.title}`));
      console.log('');
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Summary:`);
    console.log(`  - Products: ${sampleProducts.length}`);
    console.log(`  - Sellers: ${insertedSellers.length}`);
    console.log(`  - Categories: ${[...new Set(sampleProducts.map(p => p.category))].join(', ')}`);
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

// Run the seed function
seedDatabase();
