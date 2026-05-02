require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const LAPTOP_IMAGES = [
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&auto=format&fit=crop"
];

const HEADPHONE_IMAGES = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&auto=format&fit=crop"
];

const WATCH_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508685096489-7aac82361ac8?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop"
];

const TABLET_IMAGES = [
  "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589739900898-d1fc70a9ac15?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=400&auto=format&fit=crop"
];

const PHONE_IMAGES = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533228100845-08145a01de14?q=80&w=400&auto=format&fit=crop"
];

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550009158-9effb6ba3567?q=80&w=400&auto=format&fit=crop"
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getBestImage(product) {
  const t = (product.title + " " + product.category).toLowerCase();
  if (t.includes('laptop') || t.includes('macbook') || t.includes('xps') || t.includes('thinkpad')) {
    return getRandom(LAPTOP_IMAGES);
  }
  if (t.includes('headphone') || t.includes('airpods') || t.includes('earbud')) {
    return getRandom(HEADPHONE_IMAGES);
  }
  if (t.includes('watch') || t.includes('band')) {
    return getRandom(WATCH_IMAGES);
  }
  if (t.includes('ipad') || t.includes('tablet') || t.includes('tab')) {
    return getRandom(TABLET_IMAGES);
  }
  if (t.includes('phone') || t.includes('galaxy') || t.includes('pixel') || t.includes('iphone')) {
    return getRandom(PHONE_IMAGES);
  }
  return getRandom(FALLBACK_IMAGES);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const products = await Product.find({});
  let count = 0;
  for (const p of products) {
    if (p.image && (p.image.includes('source.unsplash.com') || p.image.includes('picsum.photos'))) {
      p.image = getBestImage(p);
      count++;
      await p.save();
    }
  }
  console.log(`Updated images for ${count} products.`);
  process.exit(0);
}
run();
