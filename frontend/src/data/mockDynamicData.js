/**
 * Mock dynamic data generator
 * Generates realistic, dynamic product data for development and testing
 */

import { formatPrice, calculateDiscount } from './dynamicDataGenerator';

const brands = [
  'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Sony',
  'LG', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Nothing'
];

const categories = [
  'Smartphones', 'Laptops', 'Tablets', 'Accessories',
  'Wearables', 'Audio', 'Cameras', 'Smart Devices'
];

const stores = [
  'Amazon', 'Best Buy', 'Walmart', 'Target',
  'Newegg', 'B&H Photo', 'Costco', 'Best Electronics'
];

/**
 * Generate random price with variation
 */
const generatePrice = (basePrice, variation = 0.2) => {
  const min = basePrice * (1 - variation);
  const max = basePrice * (1 + variation);
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

/**
 * Generate mock product
 */
export const generateMockProduct = (index = 0) => {
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const category = categories[Math.floor(Math.random() * categories.length)];
  const basePrice = Math.floor(Math.random() * (1500 - 200)) + 200;
  const currentPrice = generatePrice(basePrice);
  const originalPrice = basePrice + Math.floor(Math.random() * 300);

  return {
    id: `PROD-${Date.now()}-${index}`,
    brand,
    category,
    name: `${brand} ${category} Model ${index + 1}`,
    description: `High-quality ${category.toLowerCase()} with advanced features and excellent performance`,
    price: currentPrice,
    originalPrice,
    formattedPrice: formatPrice(currentPrice),
    discount: calculateDiscount(originalPrice, currentPrice),
    image: `https://via.placeholder.com/300x300?text=${brand}+${category}`,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviews: Math.floor(Math.random() * 5000),
    availableSellers: Math.floor(Math.random() * 12) + 1,
    inStock: Math.random() > 0.1,
    isTrending: Math.random() > 0.7,
    isDeal: calculateDiscount(originalPrice, currentPrice) > 15,
    availability: Math.random() > 0.1 ? 'In Stock' : 'Out of Stock',
    estimatedDelivery: `${Math.floor(Math.random() * 5) + 1}-${Math.floor(Math.random() * 3) + 3} business days`,
    sellers: generateSellers(currentPrice, originalPrice)
  };
};

/**
 * Generate mock sellers for a product
 */
export const generateSellers = (price, originalPrice, count = 5) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `SELLER-${i}`,
    name: stores[i % stores.length],
    price: generatePrice(price, 0.15),
    originalPrice,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    deliveryDays: Math.floor(Math.random() * 5) + 1,
    inStock: Math.random() > 0.1,
    url: '#'
  }));
};

/**
 * Generate mock price history
 */
export const generatePriceHistory = (productId, days = 30) => {
  const history = [];
  let price = 1200;

  for (let i = days; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 100;
    price = Math.max(500, price + variation);
    history.push({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
      price: parseFloat(price.toFixed(2)),
      productId,
      seller: stores[Math.floor(Math.random() * stores.length)]
    });
  }

  return history;
};

/**
 * Generate mock products list
 */
export const generateMockProducts = (count = 20) => {
  return Array.from({ length: count }, (_, i) => generateMockProduct(i));
};

/**
 * Generate mock price alert
 */
export const generateMockPriceAlert = (index = 0) => {
  const product = generateMockProduct(index);
  return {
    id: `ALERT-${Date.now()}-${index}`,
    productId: product.id,
    productName: product.name,
    productImage: product.image,
    brand: product.brand,
    targetPrice: generatePrice(product.price, 0.2),
    currentPrice: product.price,
    originalPrice: product.originalPrice,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    isActive: Math.random() > 0.2,
    triggered: Math.random() > 0.7,
    triggerDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  };
};

/**
 * Generate mock bulk order
 */
export const generateMockBulkOrder = (index = 0) => {
  const products = generateMockProducts(Math.floor(Math.random() * 5) + 2);
  const total = products.reduce((sum, p) => sum + p.price, 0);

  return {
    id: `BULK-${Date.now()}-${index}`,
    orderNumber: `BO-${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
    items: products.map((p, i) => ({
      ...p,
      quantity: Math.floor(Math.random() * 10) + 1
    })),
    totalItems: products.length,
    subtotal: total,
    tax: parseFloat((total * 0.08).toFixed(2)),
    shipping: parseFloat((total * 0.05).toFixed(2)),
    total: parseFloat((total * 1.13).toFixed(2)),
    status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + Math.random() * 10 * 24 * 60 * 60 * 1000),
    discount: Math.floor(Math.random() * 20)
  };
};

/**
 * Generate analytics data
 */
export const generateMockAnalytics = () => {
  return {
    totalProducts: Math.floor(Math.random() * 1000) + 100,
    totalWishlist: Math.floor(Math.random() * 50) + 5,
    totalOrders: Math.floor(Math.random() * 100) + 10,
    totalSpent: parseFloat((Math.random() * 10000 + 1000).toFixed(2)),
    priceAlerts: Math.floor(Math.random() * 30) + 5,
    averageSavings: parseFloat((Math.random() * 500 + 100).toFixed(2)),
    mostViewedCategory: categories[Math.floor(Math.random() * categories.length)],
    lastActivityDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
  };
};

export default {
  generateMockProduct,
  generateSellers,
  generatePriceHistory,
  generateMockProducts,
  generateMockPriceAlert,
  generateMockBulkOrder,
  generateMockAnalytics
};
