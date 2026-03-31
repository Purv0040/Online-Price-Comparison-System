import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Search Products API
export const searchProducts = async (query, filters = {}) => {
  try {
    const params = new URLSearchParams();
    
    if (query) params.append('query', query);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await apiClient.get(`/products/search?${params.toString()}`);
    return response;
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

// Get Product Details API
export const getProductDetails = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response;
  } catch (error) {
    console.error('Get Product Details API error:', error);
    throw error;
  }
};

// Get Trending Products API
export const getTrendingProducts = async () => {
  try {
    const response = await apiClient.get('/trending');
    return response;
  } catch (error) {
    console.error('Trending API error:', error);
    throw error;
  }
};

export default apiClient;
