import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CategoryNavbar from "../components/navbars/CategoryNavbar";
import CategoryFooter from "../components/footers/CategoryFooter";
import { searchProducts } from "../services/api";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const categories = [
  { id: 1, slug: "electronics", title: "Electronics", description: "Mobiles, laptops, gadgets and accessories.", icon: "📱" },
  { id: 2, slug: "fashion", title: "Fashion", description: "Clothing, footwear and accessories.", icon: "👗" },
  { id: 3, slug: "home", title: "Home & Kitchen", description: "Appliances, furniture and decor.", icon: "🏠" },
  { id: 4, slug: "beauty", title: "Beauty & Personal Care", description: "Skincare, haircare and grooming.", icon: "💄" },
  { id: 5, slug: "sports", title: "Sports & Fitness", description: "Gym, outdoor and fitness equipment.", icon: "🏋️" },
  { id: 6, slug: "books", title: "Books", description: "Educational, novels and comics.", icon: "📚" },
  { id: 7, slug: "toys", title: "Toys & Baby", description: "Toys, baby care and kids products.", icon: "🧸" },
  { id: 8, slug: "groceries", title: "Grocery", description: "Daily essentials and food items.", icon: "🛒" },
  { id: 9, slug: "automotive", title: "Automotive", description: "Car accessories and electronics.", icon: "�" },
  { id: 10, slug: "others", title: "Others", description: "Miscellaneous products.", icon: "📦" },
];

export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addingProduct, setAddingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const isAll = !slug || slug === "all";
  const currentCategory = categories.find(c => c.slug === slug);

  // Fetch products by category
  const fetchCategoryProducts = async () => {
    if (!currentCategory) return;
    
    try {
      setLoading(true);
      setError(null);

      const filters = {
        category: currentCategory.title,
        page: currentPage,
        limit: itemsPerPage
      };

      const response = await searchProducts("", filters);
      
      if (response.success) {
        // Transform API data to match frontend format
        const transformedProducts = response.data.products.map(product => ({
          _id: product._id,
          id: product._id,
          brand: product.brand || 'Unknown',
          name: product.title,
          category: product.category,
          price: `₹${product.lowestPrice || 0}`,
          priceNumber: product.lowestPrice || 0,
          oldPrice: product.lowestPrice ? `₹${Math.round(product.lowestPrice * 1.2)}` : '₹0',
          sites: `Available on ${Math.floor(Math.random() * 10) + 1} sites`,
          badge: product.lowestPrice ? `${Math.floor(Math.random() * 30) + 10}% OFF` : 'NEW',
          inStock: true,
          image: product.image || `https://source.unsplash.com/400x400/?${encodeURIComponent(product.title.replace(/\s+/g, '+'))}`,
          rating: product.rating || 0,
          reviews: product.reviews || 0
        }));

        setProducts(transformedProducts);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Category products error:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when category changes
  useEffect(() => {
    if (currentCategory) {
      fetchCategoryProducts();
    }
  }, [currentCategory, currentPage]);

  const handleWishlistToggle = async (product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setAddingProduct(product._id);
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id, product);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setAddingProduct(null);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Show all categories page
  if (isAll) {
    return (
      <div className="min-h-screen flex flex-col">
        <CategoryNavbar />
        <div className="flex-1 p-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">All Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="cursor-pointer bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h2 className="text-lg font-semibold mb-1">{cat.title}</h2>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <CategoryFooter />
      </div>
    );
  }

  // Show specific category page with products
  return (
    <div className="min-h-screen flex flex-col">
      <CategoryNavbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
        {/* Category Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl">{currentCategory?.icon}</div>
            <div>
              <h1 className="text-3xl font-bold">{currentCategory?.title}</h1>
              <p className="text-gray-600">{currentCategory?.description}</p>
            </div>
          </div>
          
          {/* Back to categories */}
          <button
            onClick={() => navigate("/category")}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            ← Back to All Categories
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchCategoryProducts}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="mb-6">
              <h2 className="text-xl">
                Showing <b>{products.length}</b> products in {currentCategory?.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-[#e7ebf3] hover:shadow-lg transition overflow-hidden flex flex-col relative"
                >
                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(p);
                    }}
                    disabled={addingProduct === p._id}
                    className={`absolute top-3 right-3 z-20 p-2 bg-white rounded-full transition shadow-sm cursor-pointer disabled:opacity-50 ${
                      isInWishlist(p._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <span className="text-xl">
                      {isInWishlist(p._id) ? "❤️" : "🤍"}
                    </span>
                  </button>

                  {/* IMAGE */}
                  <div className="relative bg-gradient-to-b from-black to-[#1a1a1a] p-6 aspect-square">
                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {p.badge}
                    </span>

                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full mx-auto object-contain"
                      onError={(e) => {
                        // Fallback to category-specific image if original fails
                        const titleLower = p.name.toLowerCase();
                        if (titleLower.includes('iphone') || titleLower.includes('phone')) {
                          e.target.src = 'https://picsum.photos/seed/smartphone-mobile-device/400/400';
                        } else if (titleLower.includes('laptop')) {
                          e.target.src = 'https://picsum.photos/seed/laptop-computer-notebook/400/400';
                        } else if (titleLower.includes('headphones')) {
                          e.target.src = 'https://picsum.photos/seed/headphones-audio-music/400/400';
                        } else {
                          e.target.src = 'https://picsum.photos/seed/electronics-gadget-device/400/400';
                        }
                      }}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <p 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/search?q=${encodeURIComponent(p.brand)}`);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-colors"
                  >
                    {p.brand}
                  </p>

                    <h3 className="font-bold text-blue-600 text-lg leading-snug">
                      {p.name}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="material-symbols-outlined text-green-500 text-base">
                        storefront
                      </span>
                      {p.sites}
                    </div>

                    <div className="mt-auto">
                      <p className="text-sm text-gray-500">Starting from</p>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-primary">
                          {p.price}
                        </span>
                        <span className="line-through text-gray-400 text-sm">
                          {p.oldPrice}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/product/${p._id}`)}
                        className="w-full mt-[10px] py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm"
                      >
                        Compare Prices
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-10 pb-16">
                <div className="flex items-center gap-1">
                  {/* Prev */}
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>

                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`w-10 h-10 rounded-lg hover:bg-gray-200 ${
                        currentPage === page ? "bg-gray-200 font-bold" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next */}
                  <button
                    className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <CategoryFooter />
    </div>
  );
}
