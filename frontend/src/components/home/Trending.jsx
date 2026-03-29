import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import apiClient from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"

// Fetch from backend in the component

export default function Trending() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [products, setProducts] = useState([])
  const [addingProduct, setAddingProduct] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await apiClient.get('/trending')
        if (response.success) {
          // Display only the top 4 trending products on the homepage
          setProducts(response.data.slice(0, 4))
        }
      } catch (err) {
        console.error("Failed to fetch trending products", err)
      }
    }
    fetchTrending()
  }, [])

  const handleWishlistToggle = async (product) => {
    const productId = product._id || product.id
    
    console.log('Trending wishlist toggle:', { productId, isAuthenticated })
    
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    if (!productId) {
      setError("Product ID not found")
      return
    }

    try {
      setAddingProduct(productId)
      setError("")
      console.log('Toggling wishlist for:', productId)
      
      if (isInWishlist(productId)) {
        console.log('Removing from wishlist')
        await removeFromWishlist(productId)
      } else {
        console.log('Adding to wishlist')
        await addToWishlist(productId, product)
      }
      console.log('Successfully toggled wishlist')
    } catch (err) {
      const errorMsg = err.message || "Failed to update wishlist"
      setError(errorMsg)
      console.error("Wishlist error:", err)
    } finally {
      setAddingProduct(null)
    }
  }

  return (
    <section className="px-6 py-12">
      <h2 className="text-2xl font-bold mb-8 text-[#0e121b]">
        Trending Products
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div
            key={p._id}
            onClick={() => navigate(`/product/${p._id}`)}
            className="group bg-white rounded-2xl border border-[#d0d7e7] overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative cursor-pointer"
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
              title={isInWishlist(p._id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <span className="text-xl">
                {isInWishlist(p._id) ? "❤️" : "🤍"}
              </span>
            </button>

            {/* Badge */}
            {p.badge && (
              <div
                className={`absolute top-3 left-3 z-10 px-2 py-1 text-white text-[10px] font-black rounded uppercase ${p.badgeColor}`}
              >
                {p.badge}
              </div>
            )}

            {/* Image */}
            <div className="aspect-square bg-[#f8f9fc] overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
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
                {p.brand}
              </p>

              <h3 className="font-bold text-[#0e121b] text-base leading-tight mb-3">
                {p.name}
              </h3>

              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-xs text-secondary font-bold">
                    Best Price
                  </span>
                  <div className="text-xl font-black text-primary">
                    {p.price}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#4d6599] block mb-1">
                    {p.stores}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${p._id}`);
                    }}
                    className="px-3 py-1.5 bg-[#f8f9fc] text-[#0e121b] text-xs font-bold rounded-lg border border-[#d0d7e7] hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
