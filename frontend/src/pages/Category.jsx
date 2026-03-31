import { useParams, useNavigate, Link } from "react-router-dom";
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
  { id: 9, slug: "automotive", title: "Automotive", description: "Car accessories and electronics.", icon: "🚗" },
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
      <div className="min-h-screen flex flex-col bg-[#fcfdff]">
        <CategoryNavbar />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-[#0e121b] mb-8 tracking-tighter leading-tight">
              Explore <span className="text-blue-600">Categories</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              Discover a meticulously curated selection of top-tier products across every lifestyle segment. Your premium directory for quality comparisons.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="group cursor-pointer bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                {/* Icon Container */}
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-4xl mb-8 group-hover:bg-blue-600 group-hover:rotate-6 transition-all duration-500 shadow-inner">
                  <span className="group-hover:filter group-hover:brightness-0 group-hover:invert transition-all duration-500 transform group-hover:scale-110">
                    {cat.icon}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-[#0e121b] mb-4 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h2>
                
                <p className="text-slate-500 text-base leading-relaxed mb-10 flex-1 font-medium">
                  {cat.description}
                </p>

                {/* Call to Action */}
                <div className="flex items-center text-blue-600 font-bold text-sm gap-2 mt-auto border-t border-slate-50 pt-6 group-hover:gap-4 transition-all">
                  View Listings
                  <span className="material-symbols-outlined text-sm font-bold animate-pulse">
                    arrow_forward
                  </span>
                </div>
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
    <div className="min-h-screen flex flex-col bg-[#fcfdff]">
      <CategoryNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-10 py-12">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6">
              <Link to="/" className="text-slate-400 hover:text-blue-600 transition-colors">Home</Link>
              <span className="material-symbols-outlined text-[10px] text-slate-300">chevron_right</span>
              <Link to="/category" className="text-slate-400 hover:text-blue-600 transition-colors">Categories</Link>
              <span className="material-symbols-outlined text-[10px] text-slate-300">chevron_right</span>
              <span className="text-blue-600 font-black">{currentCategory?.title}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#0e121b] mb-4 tracking-tighter capitalize">
              {currentCategory?.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              {currentCategory?.description}
            </p>
          </div>
          
          <div className="bg-blue-50 px-6 py-4 rounded-3xl border border-blue-100/50 self-start md:self-end">
            <h2 className="text-blue-700 font-bold text-sm">
              Showing <span className="text-blue-900">{products.length}</span> products in {currentCategory?.title}
            </h2>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-slate-500 font-medium">Finding the best prices...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-slate-600 font-medium mb-6">{error}</p>
            <button 
              onClick={fetchCategoryProducts}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Retry Search
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[2rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col relative group"
                >
                  {/* Wishlist */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlistToggle(p);
                    }}
                    disabled={addingProduct === p._id}
                    className={`absolute top-4 right-4 z-20 p-3 bg-white/80 backdrop-blur-md rounded-2xl transition shadow-sm cursor-pointer disabled:opacity-50 ${
                      isInWishlist(p._id) ? "text-red-500" : "text-slate-400 hover:text-red-500"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {isInWishlist(p._id) ? "favorite" : "favorite"}
                    </span>
                  </button>

                    <div className="p-6 flex flex-col h-full cursor-pointer" onClick={() => navigate(`/product/${p._id}?from=category`)}>
                      {/* IMAGE */}
                      <div className="relative bg-slate-50 rounded-2xl p-6 aspect-square mb-6 overflow-hidden">
                        {/* Badge */}
                        <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full z-10 shadow-lg shadow-blue-200">
                          {p.badge}
                        </span>

                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            e.target.src = 'https://picsum.photos/seed/gadget/400/400';
                          }}
                        />
                      </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">
                          {p.category}
                        </span>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
                          <span className="material-symbols-outlined text-yellow-500 text-xs font-filled">star</span>
                          <span className="text-yellow-700 text-[10px] font-bold">{p.rating}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-black text-[#0e121b] mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-2xl font-black text-[#0e121b]">
                          {p.price}
                        </span>
                        {p.oldPrice && (
                          <span className="text-slate-400 line-through text-sm font-medium">
                            {p.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${p._id}?from=category`);
                      }}
                      className="w-full py-4 bg-[#0e121b] hover:bg-blue-600 text-white rounded-2xl font-bold text-sm transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group/btn"
                    >
                      Compare Prices
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center pt-20 pb-12">
                <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  >
                    <span className="material-symbols-outlined text-slate-600">chevron_left</span>
                  </button>

                  <div className="flex gap-1 px-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                          currentPage === page 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                            : "text-slate-500 hover:bg-slate-50"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-50 disabled:opacity-30 transition-colors"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  >
                    <span className="material-symbols-outlined text-slate-600">chevron_right</span>
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
