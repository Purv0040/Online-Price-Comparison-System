import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"
import { getTrendingProducts } from "../../services/api"

const TRENDING_PRODUCTS = [
  {
    "_id": "660000000000000000000101",
    "brand": "Apple",
    "name": "iPhone 15 Pro, 256GB - Natural Titanium",
    "price": "₹93,906",
    "image": "https://rukminim1.flixcart.com/image/2880/2880/xif0q/mobile/z/4/r/-original-imagtc4g22rcatjg.jpeg?q=90",
    "badge": "HOT DEAL",
    "badgeColor": "bg-secondary",
    "stores": "5 Stores Compared"
  },
  {
    "_id": "660000000000000000000102",
    "brand": "Samsung",
    "name": "Galaxy S24 Ultra, 512GB - Titanium Gray",
    "price": "₹122,106",
    "image": "https://rukminim1.flixcart.com/image/2880/2880/xif0q/mobile/j/m/z/-original-imahgfmxumntk7sy.jpeg?q=90",
    "badge": "NEW RELEASE",
    "badgeColor": "bg-blue-600",
    "stores": "8 Stores Compared"
  },
  {
    "_id": "660000000000000000000103",
    "brand": "Google",
    "name": "Pixel 8 Pro, 128GB - Bay Blue",
    "price": "₹75,106",
    "image": "https://rukminim1.flixcart.com/image/2880/2880/xif0q/mobile/3/q/3/-original-imahegqhgnafpbzh.jpeg?q=90",
    "badge": "-15% OFF",
    "badgeColor": "bg-red-500",
    "stores": "4 Stores Compared"
  },
  {
    "_id": "660000000000000000000104",
    "brand": "OnePlus",
    "name": "OnePlus 12, 256GB - Silky Black",
    "price": "₹65,706",
    "image": "https://rukminim1.flixcart.com/image/2880/2880/xif0q/mobile/6/6/p/12-cph2573-oneplus-original-imahhg7buwavsvxp.jpeg?q=90",
    "badge": "BEST VALUE",
    "badgeColor": "bg-green-600",
    "stores": "6 Stores Compared"
  }
];

export default function Trending() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [addingProduct, setAddingProduct] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true)
        const response = await getTrendingProducts()
        if (response.success && response.data && response.data.length > 0) {
          setProducts(response.data)
        } else {
          // Fallback to static data if DB is empty for UI continuity
          setProducts(TRENDING_PRODUCTS)
        }
        setLoading(false)
      } catch (err) {
        console.error("Error fetching trending products:", err)
        // Fallback to static data on error
        setProducts(TRENDING_PRODUCTS)
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  const handleWishlistToggle = async (product) => {
    const productId = product._id
    
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    try {
      setAddingProduct(productId)
      setError("")
      
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId)
      } else {
        await addToWishlist(productId, product)
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to update wishlist"
      setError(errorMsg)
    } finally {
      setAddingProduct(null)
    }
  }

  const handleImageError = (e) => {
    e.target.src = "https://loremflickr.com/400/400/gadget,technology?lock=" + Math.floor(Math.random() * 100);
  };

  if (loading) {
    return (
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold mb-8 text-[#0e121b]">Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-[4/5] bg-slate-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0e121b]">
          Trending Products
        </h2>
        <button 
          onClick={() => navigate('/search')}
          className="text-sm font-bold text-primary hover:underline"
        >
          View All
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="p-8 text-center text-slate-500 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
           No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
              className="group bg-white rounded-2xl border border-[#d0d7e7] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 relative cursor-pointer"
            >
              {/* Wishlist */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleWishlistToggle(p);
                }}
                disabled={addingProduct === p._id}
                className={`absolute top-3 right-3 z-10 p-2 bg-white rounded-full transition shadow-sm disabled:opacity-50 ${
                  isInWishlist(p._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
                }`}
              >
                <span className="text-xl">
                  {isInWishlist(p._id) ? "❤️" : "🤍"}
                </span>
              </button>

              {/* Badge */}
              {(p.badge || p.rating > 4.5 || p.price < 50) && (
                <div
                  className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-white text-[10px] font-black rounded uppercase ${
                    p.badgeColor || (p.rating > 4.5 ? "bg-secondary" : "bg-red-500")
                  }`}
                >
                  {p.badge || (p.rating > 4.5 ? "TOP RATED" : "HOT DEAL")}
                </div>
              )}

              {/* Image */}
              <div className="aspect-square bg-[#f8f9fc] overflow-hidden p-6">
                <img
                  src={p.image}
                  alt={p.name || p.title}
                  onError={handleImageError}
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 bg-white">
                <p 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/search?q=${encodeURIComponent(p.brand)}`);
                  }}
                  className="text-xs text-[#4d6599] font-medium mb-1 hover:text-blue-600 cursor-pointer transition-colors"
                >
                  {p.brand || "PriceWise Certified"}
                </p>

                <h3 className="font-bold text-[#0e121b] text-base leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">
                  {p.name || p.title}
                </h3>

                <div className="mt-auto flex items-end justify-between">
                  <div>
                    <span className="text-xs text-secondary font-bold">
                      Best Price
                    </span>
                    <div className="text-xl font-black text-primary">
                      {p.price || (p.lowestPrice ? `$${p.lowestPrice.toFixed(2)}` : "N/A")}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-[#4d6599] block mb-1">
                      {p.stores || `Available on ${p.storesCount || "multiple"} stores`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${p._id}`);
                      }}
                      className="px-3 py-1.5 bg-[#f8f9fc] text-[#0e121b] text-xs font-bold rounded-lg border border-[#d0d7e7] hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                    >
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
