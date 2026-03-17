import { useEffect, useState } from 'react';
import { useProducts, useCategories, useBatchData } from '../hooks/useDynamicData';
import { enrichProduct, formatPrice } from '../data/dynamicDataGenerator';
import { generateMockProducts, generateMockAnalytics } from '../data/mockDynamicData';

/**
 * EXAMPLE: Modern Home Page using Dynamic Data System
 * 
 * This component demonstrates how to use the new dynamic data system
 * Replace your existing Home.jsx with similar patterns from this example
 */

export const HomePageExample = () => {
  // Option 1: Fetch all data in parallel
  const { data, loading, error, refetch } = useBatchData(['products', 'categories', 'trending']);

  // Option 2: Or fetch specific data with custom hooks
  // const { products, loading: productsLoading } = useProducts({ limit: 20 });
  // const { categories, loading: categoriesLoading } = useCategories();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="container mx-auto">
      {/* Header Section */}
      <section className="py-8">
        <h1 className="text-4xl font-bold mb-4">Price Tracker</h1>
        <p className="text-gray-600">Find the best prices across all retailers</p>
        <button 
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Refresh Data
        </button>
      </section>

      {/* Categories Section */}
      {data.categories && data.categories.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.categories.map(category => (
              <div 
                key={category.id} 
                className="p-4 border rounded-lg hover:shadow-lg transition"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.productCount} items</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trending Products Section */}
      {data.trending && data.trending.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Trending Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.trending.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {data.products && data.products.length > 0 && (
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.products.slice(0, 12).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* View All Button */}
      <section className="py-8 text-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          View All Products ({data.products?.length || 0})
        </button>
      </section>
    </div>
  );
};

/**
 * Reusable Product Card Component
 */
const ProductCard = ({ product }) => {
  // Enrich product with calculated fields
  const enrichedProduct = enrichProduct(product);

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition"
        />
        {enrichedProduct.isDeal && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
            {enrichedProduct.discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-600">{product.brand}</p>
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 my-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm">{product.rating}</span>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>
        )}

        {/* Price Section */}
        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-600 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <p className={`text-sm mb-3 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
          {product.inStock ? '✓ In Stock' : 'Out of Stock'}
        </p>

        {/* Available Sellers */}
        {product.availableSellers && (
          <p className="text-xs text-gray-600 mb-3">
            Available on {product.availableSellers} sellers
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
            View Prices
          </button>
          <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePageExample;
