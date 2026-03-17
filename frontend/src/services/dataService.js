import apiClient from './api';

// Product Services
export const productService = {
  // Fetch all products
  getProducts: async (filters = {}) => {
    try {
      const response = await apiClient.get('/products', { params: filters });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    try {
      const response = await apiClient.get('/products/search', {
        params: { q: query, ...filters }
      });
      return response.data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching category products:', error);
      return [];
    }
  }
};

// Category Services
export const categoryService = {
  // Fetch all categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get category by ID
  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }
};

// Price Alert Services
export const priceAlertService = {
  // Get all price alerts for user
  getPriceAlerts: async () => {
    try {
      const response = await apiClient.get('/price-alerts');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching price alerts:', error);
      return [];
    }
  },

  // Create new price alert
  createPriceAlert: async (productId, targetPrice) => {
    try {
      const response = await apiClient.post('/price-alerts', {
        productId,
        targetPrice
      });
      return response;
    } catch (error) {
      console.error('Error creating price alert:', error);
      return null;
    }
  },

  // Delete price alert
  deletePriceAlert: async (alertId) => {
    try {
      const response = await apiClient.delete(`/price-alerts/${alertId}`);
      return response;
    } catch (error) {
      console.error('Error deleting price alert:', error);
      return null;
    }
  }
};

// Wishlist Services
export const wishlistService = {
  // Get user wishlist
  getWishlist: async () => {
    try {
      const response = await apiClient.get('/wishlist');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    try {
      const response = await apiClient.post('/wishlist', { productId });
      return response;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return null;
    }
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await apiClient.delete(`/wishlist/${productId}`);
      return response;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return null;
    }
  }
};

// Price History Services
export const priceHistoryService = {
  // Get price history for a product
  getPriceHistory: async (productId) => {
    try {
      const response = await apiClient.get(`/price-history/${productId}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching price history:', error);
      return [];
    }
  }
};

// Bulk Order Services
export const bulkOrderService = {
  // Get all bulk orders
  getBulkOrders: async () => {
    try {
      const response = await apiClient.get('/bulk-orders');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching bulk orders:', error);
      return [];
    }
  },

  // Create bulk order
  createBulkOrder: async (items) => {
    try {
      const response = await apiClient.post('/bulk-orders', { items });
      return response;
    } catch (error) {
      console.error('Error creating bulk order:', error);
      return null;
    }
  },

  // Get bulk order by ID
  getBulkOrderById: async (id) => {
    try {
      const response = await apiClient.get(`/bulk-orders/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching bulk order:', error);
      return null;
    }
  }
};

// Analytics Services
export const analyticsService = {
  // Get user analytics
  getUserAnalytics: async () => {
    try {
      const response = await apiClient.get('/analytics/user');
      return response;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  },

  // Get trending products
  getTrendingProducts: async () => {
    try {
      const response = await apiClient.get('/analytics/trending');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return [];
    }
  }
};
