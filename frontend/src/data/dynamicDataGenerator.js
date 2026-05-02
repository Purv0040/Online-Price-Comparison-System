import { 
  productService, 
  categoryService, 
  priceHistoryService,
  analyticsService 
} from '../services/dataService';

/**
 * Cache management for dynamic data
 */
const dataCache = {
  products: { data: [], timestamp: null, ttl: 5 * 60 * 1000 }, // 5 minutes
  categories: { data: [], timestamp: null, ttl: 10 * 60 * 1000 }, // 10 minutes
  trending: { data: [], timestamp: null, ttl: 5 * 60 * 1000 }, // 5 minutes
};

const isCacheValid = (cacheItem) => {
  if (!cacheItem.timestamp) return false;
  return Date.now() - cacheItem.timestamp < cacheItem.ttl;
};

/**
 * Fetch and cache products
 */
export const fetchProducts = async (filters = {}) => {
  if (isCacheValid(dataCache.products)) {
    return dataCache.products.data;
  }

  const products = await productService.getProducts(filters);
  dataCache.products.data = products;
  dataCache.products.timestamp = Date.now();
  return products;
};

/**
 * Fetch and cache categories
 */
export const fetchCategories = async () => {
  if (isCacheValid(dataCache.categories)) {
    return dataCache.categories.data;
  }

  const categories = await categoryService.getCategories();
  dataCache.categories.data = categories;
  dataCache.categories.timestamp = Date.now();
  return categories;
};

/**
 * Fetch trending products
 */
export const fetchTrendingProducts = async () => {
  if (isCacheValid(dataCache.trending)) {
    return dataCache.trending.data;
  }

  const trending = await analyticsService.getTrendingProducts();
  dataCache.trending.data = trending;
  dataCache.trending.timestamp = Date.now();
  return trending;
};

/**
 * Get price statistics for a product
 */
export const getPriceStats = (priceHistory = []) => {
  if (!priceHistory || priceHistory.length === 0) {
    return {
      current: 0,
      lowest: 0,
      highest: 0,
      average: 0,
      trend: 'stable'
    };
  }

  const prices = priceHistory.map(h => h.price || 0);
  const current = prices[prices.length - 1] || 0;
  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);
  const average = prices.reduce((a, b) => a + b, 0) / prices.length;

  // Determine trend
  let trend = 'stable';
  if (prices.length > 1) {
    const recentAvg = prices.slice(-5).reduce((a, b) => a + b, 0) / Math.min(5, prices.length);
    const oldAvg = prices.slice(0, -5).reduce((a, b) => a + b, 0) / Math.max(1, prices.length - 5);
    if (recentAvg < oldAvg) trend = 'declining';
    else if (recentAvg > oldAvg) trend = 'increasing';
  }

  return {
    current: parseFloat(current.toFixed(2)),
    lowest: parseFloat(lowest.toFixed(2)),
    highest: parseFloat(highest.toFixed(2)),
    average: parseFloat(average.toFixed(2)),
    trend
  };
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice) return 0;
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

/**
 * Format price for display
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return '$0.00';
  return `$${parseFloat(price).toFixed(2)}`;
};

/**
 * Get price comparison across sellers
 */
export const getPriceComparison = (sellers = []) => {
  if (!sellers || sellers.length === 0) return [];

  return sellers
    .map(seller => ({
      ...seller,
      discount: seller.originalPrice ? calculateDiscount(seller.originalPrice, seller.price) : 0
    }))
    .sort((a, b) => (a.price || 0) - (b.price || 0));
};

/**
 * Clear cache for specific data type
 */
export const clearCache = (type = 'all') => {
  if (type === 'all') {
    Object.keys(dataCache).forEach(key => {
      dataCache[key].data = [];
      dataCache[key].timestamp = null;
    });
  } else if (dataCache[type]) {
    dataCache[type].data = [];
    dataCache[type].timestamp = null;
  }
};

/**
 * Batch fetch multiple data sources
 */
export const batchFetchData = async (types = ['products', 'categories', 'trending']) => {
  const results = {};

  const promises = types.map(async (type) => {
    switch (type) {
      case 'products':
        results.products = await fetchProducts();
        break;
      case 'categories':
        results.categories = await fetchCategories();
        break;
      case 'trending':
        results.trending = await fetchTrendingProducts();
        break;
      default:
        break;
    }
  });

  await Promise.all(promises);
  return results;
};

/**
 * Create product with calculated fields
 */
export const enrichProduct = (product, priceHistory = []) => {
  const stats = getPriceStats(priceHistory);
  const discount = calculateDiscount(stats.highest, stats.current);

  return {
    ...product,
    priceStats: stats,
    discount,
    formattedPrice: formatPrice(stats.current),
    isDeal: discount > 20,
    isTrending: false,
    availability: 'In Stock'
  };
};

export default {
  fetchProducts,
  fetchCategories,
  fetchTrendingProducts,
  getPriceStats,
  calculateDiscount,
  formatPrice,
  getPriceComparison,
  clearCache,
  batchFetchData,
  enrichProduct
};
