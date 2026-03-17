import { createContext, useState, useEffect, useContext } from 'react';
import { wishlistAPI } from '../services';
import { useAuth } from './AuthContext';

export const WishlistContext = createContext();

export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, token } = useAuth();

  // Fetch wishlist when user authenticates
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setError(null);
    }
  }, [isAuthenticated, token]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching wishlist...');
      const response = await wishlistAPI.getWishlist();
      console.log('Wishlist response:', response);
      
      // Handle different response structures
      let products = [];
      if (response.data?.wishlist?.products) {
        products = response.data.wishlist.products;
      } else if (response.wishlist?.products) {
        products = response.wishlist.products;
      } else if (Array.isArray(response)) {
        products = response;
      }
      
      console.log('Setting wishlist with products:', products);
      setWishlist(products);
    } catch (err) {
      console.error('Fetch wishlist error:', err);
      const message = err.message || 'Failed to fetch wishlist';
      setError(message);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId, productData = null) => {
    try {
      setError(null);
      console.log('Adding to wishlist:', productId, productData);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }

      // Send product data along with ID
      const response = await wishlistAPI.addProduct(productId, productData);
      console.log('Add to wishlist response:', response);
      
      // Handle different response structures
      let products = [];
      if (response.data?.wishlist?.products) {
        products = response.data.wishlist.products;
      } else if (response.wishlist?.products) {
        products = response.wishlist.products;
      } else if (Array.isArray(response)) {
        products = response;
      }
      
      console.log('Updating wishlist with:', products);
      setWishlist(products);
      return response;
    } catch (err) {
      console.error('Add to wishlist error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to add to wishlist';
      setError(message);
      throw new Error(message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setError(null);
      console.log('Removing from wishlist:', productId);
      
      if (!productId) {
        throw new Error('Product ID is required');
      }

      const response = await wishlistAPI.removeProduct(productId);
      console.log('Remove from wishlist response:', response);
      
      // Handle different response structures
      let products = [];
      if (response.data?.wishlist?.products) {
        products = response.data.wishlist.products;
      } else if (response.wishlist?.products) {
        products = response.wishlist.products;
      } else if (Array.isArray(response)) {
        products = response;
      }
      
      console.log('Updating wishlist after removal:', products);
      setWishlist(products);
      return response;
    } catch (err) {
      console.error('Remove from wishlist error:', err);
      const message = err.response?.data?.message || err.message || 'Failed to remove from wishlist';
      setError(message);
      throw new Error(message);
    }
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    
    const inList = wishlist.some((item) => {
      if (!item) return false;
      // Check both item.product (populated object) and direct string comparison
      const itemId = item.product?._id || item.product?.id || item.product || item._id || item.id;
      return itemId === productId || String(itemId) === String(productId);
    });
    
    console.log(`Checking if ${productId} is in wishlist:`, inList);
    return inList;
  };

  const clearError = () => setError(null);

  const value = {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
    isInWishlist,
    clearError,
    count: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook to use Wishlist context
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}

