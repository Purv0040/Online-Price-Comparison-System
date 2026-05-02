/**
 * USAGE GUIDE: Dynamic Data System
 * 
 * This guide shows how to use the new dynamic data system in your components
 */

// ============================================================================
// EXAMPLE 1: Using Data Service Directly
// ============================================================================
/*
import { productService, categoryService } from '../services/dataService';

export const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await productService.getProducts({ limit: 10 });
      setProducts(data);
      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};
*/

// ============================================================================
// EXAMPLE 2: Using Custom Hooks (Recommended)
// ============================================================================
/*
import { useProducts, useCategories } from '../hooks/useDynamicData';

export const HomePage = () => {
  const { products, loading, error } = useProducts({ limit: 20 });
  const { categories } = useCategories();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="categories">
        {categories.map(cat => (
          <div key={cat.id}>{cat.name}</div>
        ))}
      </div>
      <div className="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
*/

// ============================================================================
// EXAMPLE 3: Using Batch Data Fetching
// ============================================================================
/*
import { useBatchData } from '../hooks/useDynamicData';

export const Dashboard = () => {
  const { data, loading, error } = useBatchData(['products', 'categories', 'trending']);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <section>
        <h2>Products</h2>
        {data.products?.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
      <section>
        <h2>Categories</h2>
        {data.categories?.map(c => <CategoryCard key={c.id} category={c} />)}
      </section>
      <section>
        <h2>Trending</h2>
        {data.trending?.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
    </div>
  );
};
*/

// ============================================================================
// EXAMPLE 4: Using Data Generator Functions
// ============================================================================
/*
import { 
  getPriceStats, 
  calculateDiscount, 
  formatPrice,
  getPriceComparison 
} from '../data/dynamicDataGenerator';

export const ProductDetail = ({ product, priceHistory }) => {
  const stats = getPriceStats(priceHistory);
  const discount = calculateDiscount(stats.highest, stats.current);
  const comparison = getPriceComparison(product.sellers);

  return (
    <div>
      <h1>{product.name}</h1>
      <div className="price-info">
        <p>Current: {formatPrice(stats.current)}</p>
        <p>Lowest: {formatPrice(stats.lowest)}</p>
        <p>Highest: {formatPrice(stats.highest)}</p>
        <p>Discount: {discount}%</p>
        <p>Trend: {stats.trend}</p>
      </div>
      <div className="seller-comparison">
        {comparison.map(seller => (
          <div key={seller.id}>
            <h4>{seller.name}</h4>
            <p>{formatPrice(seller.price)}</p>
            <p>Discount: {seller.discount}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
*/

// ============================================================================
// EXAMPLE 5: Using Auto-Refresh
// ============================================================================
/*
import { useBatchData, useDataRefresh } from '../hooks/useDynamicData';

export const LiveDashboard = () => {
  const { data, refetch } = useBatchData(['products', 'trending']);
  const { lastRefresh } = useDataRefresh(5 * 60 * 1000); // Refresh every 5 minutes

  return (
    <div>
      <p>Last updated: {new Date(lastRefresh).toLocaleTimeString()}</p>
      {data.products?.map(p => <ProductCard key={p.id} product={p} />)}
      <button onClick={() => refetch()}>Refresh Data</button>
    </div>
  );
};
*/

// ============================================================================
// EXAMPLE 6: Using Mock Data (for development)
// ============================================================================
/*
import { generateMockProducts, generateMockAnalytics } from '../data/mockDynamicData';

export const DemoPage = () => {
  const mockProducts = generateMockProducts(10);
  const mockAnalytics = generateMockAnalytics();

  return (
    <div>
      <h2>Demo Products</h2>
      {mockProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
      <h2>Analytics</h2>
      <p>Total Products: {mockAnalytics.totalProducts}</p>
      <p>Total Orders: {mockAnalytics.totalOrders}</p>
    </div>
  );
};
*/

// ============================================================================
// API CALLS AVAILABLE
// ============================================================================
/*
// Products
- productService.getProducts(filters)
- productService.getProductById(id)
- productService.searchProducts(query, filters)
- productService.getProductsByCategory(category)

// Categories
- categoryService.getCategories()
- categoryService.getCategoryById(id)

// Price Alerts
- priceAlertService.getPriceAlerts()
- priceAlertService.createPriceAlert(productId, targetPrice)
- priceAlertService.deletePriceAlert(alertId)

// Wishlist
- wishlistService.getWishlist()
- wishlistService.addToWishlist(productId)
- wishlistService.removeFromWishlist(productId)

// Price History
- priceHistoryService.getPriceHistory(productId)

// Bulk Orders
- bulkOrderService.getBulkOrders()
- bulkOrderService.createBulkOrder(items)
- bulkOrderService.getBulkOrderById(id)

// Analytics
- analyticsService.getUserAnalytics()
- analyticsService.getTrendingProducts()
*/

// ============================================================================
// UTILITY FUNCTIONS AVAILABLE
// ============================================================================
/*
Data Generators:
- getPriceStats(priceHistory) - Calculate min, max, avg, current, trend
- calculateDiscount(originalPrice, currentPrice) - Get discount percentage
- formatPrice(price) - Format price as currency string
- getPriceComparison(sellers) - Sort and compare sellers
- enrichProduct(product, priceHistory) - Add calculated fields to product

Caching:
- clearCache(type) - Clear cache for specific data type or all
- batchFetchData(types) - Fetch multiple data sources in parallel

Mock Data:
- generateMockProduct(index)
- generateMockProducts(count)
- generatePriceHistory(productId, days)
- generateMockPriceAlert(index)
- generateMockBulkOrder(index)
- generateMockAnalytics()
*/

export default {
  message: "See commented examples above for implementation patterns"
};
