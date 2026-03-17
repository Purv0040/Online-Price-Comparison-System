import { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  fetchCategories,
  fetchTrendingProducts,
  batchFetchData,
  clearCache
} from '../data/dynamicDataGenerator';

/**
 * Custom hook for managing dynamic product data
 */
export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts(filters);
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refetch: loadProducts };
};

/**
 * Custom hook for managing categories
 */
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      setError(err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return { categories, loading, error, refetch: loadCategories };
};

/**
 * Custom hook for managing trending products
 */
export const useTrendingProducts = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTrending = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTrendingProducts();
      setTrending(data);
    } catch (err) {
      setError(err.message || 'Failed to load trending products');
      setTrending([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  return { trending, loading, error, refetch: loadTrending };
};

/**
 * Custom hook for batch fetching multiple data sources
 */
export const useBatchData = (types = ['products', 'categories', 'trending']) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await batchFetchData(types);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      setData({});
    } finally {
      setLoading(false);
    }
  }, [types]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return { data, loading, error, refetch: loadData };
};

/**
 * Custom hook for managing data refresh
 */
export const useDataRefresh = (interval = 5 * 60 * 1000) => {
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      clearCache();
      setLastRefresh(Date.now());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { lastRefresh, refresh: () => clearCache() };
};

export default {
  useProducts,
  useCategories,
  useTrendingProducts,
  useBatchData,
  useDataRefresh
};
