import apiClient from './api';

// Authentication API
export const authAPI = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  getProfile: () => apiClient.get('/auth/profile'),
  updateProfile: (data) => apiClient.put('/auth/profile', data),
};

// Product API
export const productAPI = {
  addByUrl: (url) => apiClient.post('/products/add-by-url', { url }),
  getDetails: (productId) => apiClient.get(`/products/${productId}`),
  search: (params) => apiClient.get('/products/search', { params }),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => apiClient.get('/wishlist'),
  addProduct: (productId, productData) => apiClient.post('/wishlist/add', { productId, productData }),
  removeProduct: (productId) => apiClient.post('/wishlist/remove', { productId }),
};

// Price Alert API
export const priceAlertAPI = {
  create: (data) => apiClient.post('/price-alerts', data),
  getAll: () => apiClient.get('/price-alerts'),
  update: (alertId, data) => apiClient.put(`/price-alerts/${alertId}`, data),
  delete: (alertId) => apiClient.delete(`/price-alerts/${alertId}`),
};

// Bulk Order API
export const bulkOrderAPI = {
  create: (data) => apiClient.post('/bulk-orders', data),
  getAll: () => apiClient.get('/bulk-orders'),
  getDetails: (orderId) => apiClient.get(`/bulk-orders/${orderId}`),
  updateStatus: (orderId, status) => apiClient.put(`/bulk-orders/${orderId}/status`, { status }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: () => apiClient.get('/analytics/dashboard'),
  getScraperStatus: () => apiClient.get('/analytics/scraper-status'),
};

export default apiClient;
