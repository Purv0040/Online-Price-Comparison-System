import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { searchProducts } from "../services/api";
import SearchNavbar from "../components/navbars/SearchNavbar";
import SearchFooter from "../components/footers/SearchFooter";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingProduct, setAddingProduct] = useState(null);

  // Search state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  });

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Get search query from URL
  const searchQuery = searchParams.get('q') || '';

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {
        category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        page: currentPage,
        limit: itemsPerPage
      };

      const response = await searchProducts(searchQuery, filters);
      
      if (response.success) {
        // Transform API data to match frontend format
        const transformedProducts = response.data.products.map(product => ({
          _id: product._id,
          id: product._id,
          brand: product.brand || 'Unknown',
          name: product.title,
          category: product.category,
          price: `$${product.lowestPrice || 0}`,
          priceNumber: product.lowestPrice || 0,
          oldPrice: product.lowestPrice ? `$${Math.round(product.lowestPrice * 1.2)}` : '$0',
          sites: `Available on ${Math.floor(Math.random() * 10) + 1} sites`,
          badge: product.lowestPrice ? `${Math.floor(Math.random() * 30) + 10}% OFF` : 'NEW',
          inStock: true,
          image: product.image || `https://picsum.photos/seed/${product._id}/400/400`,
          rating: product.rating || 0,
          reviews: product.reviews || 0
        }));

        setProducts(transformedProducts);
        setPagination(response.data.pagination);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Apply client-side filters
  const filteredProducts = products.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category))
      return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (inStockOnly && !p.inStock) return false;
    if (p.priceNumber < priceRange[0] || p.priceNumber > priceRange[1])
      return false;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

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

  // Fetch on component mount and when dependencies change
  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [searchQuery, selectedCategories, selectedBrands, inStockOnly, priceRange, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, inStockOnly, priceRange]);

  if (loading) {
    return (
      <>
        <SearchNavbar />
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching products...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SearchNavbar />
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!searchQuery) {
    return (
      <>
        <SearchNavbar />
        <div className="max-w-[1440px] mx-auto px-4 lg:px-10 py-8">
          <div className="text-center py-20">
            <p className="text-gray-600">Please enter a search term to find products.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SearchNavbar />

      <main className="max-w-[1440px] mx-auto flex gap-8 px-4 lg:px-10 py-8">
        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 space-y-8">
          {/* CATEGORY */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Category
            </h3>
            {["Electronics", "Fashion", "Home", "Books", "Sports", "Beauty", "Groceries", "Toys", "Automotive", "Others"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={selectedCategories.includes(item)}
                  onChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(item)
                        ? prev.filter((c) => c !== item)
                        : [...prev, item],
                    )
                  }
                />
                {item}
              </label>
            ))}
          </div>

          {/* PRICE RANGE */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Price Range
            </h3>

            {/* Slider Track */}
            <div
              className="h-1.5 bg-gray-200 rounded relative mb-4"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = Math.min(Math.max(x / rect.width, 0), 1);
                const value = Math.round(100 + percent * (2000 - 100));

                // move the nearer knob
                const distMin = Math.abs(value - priceRange[0]);
                const distMax = Math.abs(value - priceRange[1]);

                if (distMin < distMax) {
                  setPriceRange([value, priceRange[1]]);
                } else {
                  setPriceRange([priceRange[0], value]);
                }
              }}
            >
              {/* Active range */}
              <div
                className="absolute h-1.5 bg-blue-600 rounded"
                style={{
                  left: `${((priceRange[0] - 100) / (2000 - 100)) * 100}%`,
                  right: `${100 - ((priceRange[1] - 100) / (2000 - 100)) * 100}%`,
                }}
              />

              {/* Min knob */}
              <div
                className="absolute -top-1 w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                style={{
                  left: `${((priceRange[0] - 100) / (2000 - 100)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />

              {/* Max knob */}
              <div
                className="absolute -top-1 w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                style={{
                  left: `${((priceRange[1] - 100) / (2000 - 100)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            {/* Inputs */}
            <div className="flex gap-2">
              <input
                className="border rounded-lg p-2 text-sm w-full"
                value={`$${priceRange[0]}`}
                onChange={(e) =>
                  setPriceRange([
                    Number(e.target.value.replace(/\D/g, "")) || 0,
                    priceRange[1],
                  ])
                }
              />
              <input
                className="border rounded-lg p-2 text-sm w-full"
                value={`$${priceRange[1]}`}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Number(e.target.value.replace(/\D/g, "")) || 0,
                  ])
                }
              />
            </div>
          </div>

          {/* BRAND */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Brand
            </h3>
            {["Apple", "Samsung", "Google", "OnePlus", "Sony", "Dell", "HP", "Lenovo"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedBrands.includes(item)}
                  onChange={() =>
                    setSelectedBrands((prev) =>
                      prev.includes(item)
                        ? prev.filter((b) => b !== item)
                        : [...prev, item],
                    )
                  }
                />
                {item}
              </label>
            ))}
          </div>

          {/* AVAILABILITY */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Availability
            </h3>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={inStockOnly}
                onChange={() => setInStockOnly((prev) => !prev)}
              />
              In Stock Only
            </label>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="flex-1 space-y-6">
          <h2 className="text-xl">
            Showing <b>{filteredProducts.length}</b> results for{" "}
            <span className="text-primary italic">
              "{searchQuery}"
            </span>
          </h2>

          {/* FILTER CHIPS */}
          <div className="flex flex-wrap gap-2">
            {/* Category chips */}
            {selectedCategories.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tag}
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== tag),
                    )
                  }
                >
                  close
                </span>
              </div>
            ))}

            {/* Price chip */}
            <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              ${priceRange[0]} - ${priceRange[1]}
              <span
                className="material-symbols-outlined text-sm cursor-pointer"
                onClick={() => setPriceRange([100, 2000])}
              >
                close
              </span>
            </div>

            {/* Brand chips */}
            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {brand}
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() =>
                    setSelectedBrands((prev) => prev.filter((b) => b !== brand))
                  }
                >
                  close
                </span>
              </div>
            ))}

            {/* In Stock chip */}
            {inStockOnly && (
              <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                In Stock
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() => setInStockOnly(false)}
                >
                  close
                </span>
              </div>
            )}
          </div>

          {/* GRID */}
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
                      navigate(`/search?query=${encodeURIComponent(p.brand)}`);
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

          {/* PAGINATION */}
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
        </section>
      </main>

      <SearchFooter />
    </>
  );
}
