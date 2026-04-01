import items from "../../data/productV2/similarProducts"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"
import { searchProducts, getTrendingProducts } from "../../services/api"

const USD_TO_INR_RATE = 83

const formatPriceInINR = (price) => {
  if (price == null) return "N/A"

  if (typeof price === "number") {
    return `₹${Math.round(price).toLocaleString("en-IN")}`
  }

  const value = String(price).trim()
  if (value.startsWith("₹")) return value

  const numericValue = Number(value.replace(/[^0-9.]/g, ""))
  if (Number.isNaN(numericValue)) return value

  const inrValue = value.includes("$") ? numericValue * USD_TO_INR_RATE : numericValue
  return `₹${Math.round(inrValue).toLocaleString("en-IN")}`
}

export default function SimilarProducts({ category, excludeId }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [addingProduct, setAddingProduct] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await searchProducts("", { category, limit: 8 })
        const apiProducts = response?.data?.products || []
        const filtered = apiProducts
          .filter((product) => String(product._id) !== String(excludeId))
          .slice(0, 4)

        if (filtered.length > 0) {
          setProducts(filtered)
          return
        }

        const trendingResponse = await getTrendingProducts()
        const trendingProducts = (trendingResponse?.data || [])
          .filter((product) => String(product._id) !== String(excludeId))
          .slice(0, 4)

        if (trendingProducts.length > 0) {
          setProducts(trendingProducts)
          return
        }

        setProducts(items.slice(0, 4))
      } catch (err) {
        console.error("Failed to load similar products:", err)
        setProducts(items.slice(0, 4))
      }
    }

    fetchSimilarProducts()
  }, [category, excludeId])

  const handleWishlistToggle = async (product) => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    try {
      setAddingProduct(product._id || product.id)
      if (isInWishlist(product._id || product.id)) {
        await removeFromWishlist(product._id || product.id)
      } else {
        await addToWishlist(product._id || product.id, product)
      }
    } catch (err) {
      console.error("Wishlist error:", err)
    } finally {
      setAddingProduct(null)
    }
  }

  const handleProductClick = async (product) => {
    const productId = product._id || product.id
    if (productId) {
      navigate(`/product/${productId}?from=similar`)
      return
    }

    try {
      const response = await searchProducts(product.title || product.name || "", { limit: 1 })
      const matchedProduct = response?.data?.products?.[0]
      if (matchedProduct?._id) {
        navigate(`/product/${matchedProduct._id}?from=similar`)
      }
    } catch (err) {
      console.error("Failed to open similar product:", err)
    }
  }

  return (
    <section className="mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">
          Similar Products You Might Like
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p, i) => (
          <div
            key={p._id || p.id || i}
            onClick={() => handleProductClick(p)}
            className="group bg-white border border-slate-200 rounded-xl p-4
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            {/* Image wrapper */}
            <div className="aspect-square bg-slate-100 rounded-lg mb-4 p-4 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-contain
                           transition-transform duration-300
                           group-hover:scale-105"
              />
            </div>

            {/* Brand */}
            <p className="text-xs font-bold text-primary uppercase tracking-tight mb-1">
              {p.brand}
            </p>

            {/* Title */}
            <h4 className="font-bold text-sm leading-snug line-clamp-2">
              {p.title}
            </h4>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-yellow-400 fill text-sm">
                star
              </span>
              <span className="text-xs font-bold">{p.rating}</span>
            </div>

            {/* Price + Wishlist */}
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-black">{formatPriceInINR(p.price ?? p.lowestPrice)}</span>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleWishlistToggle(p)
                }}
                disabled={addingProduct === (p._id || p.id)}
                className={`size-9 rounded-full flex items-center justify-center transition disabled:opacity-50
                  ${
                    isInWishlist(p._id || p.id)
                      ? "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-900 hover:bg-red-500 hover:text-white"
                  }
                `}
                title={isInWishlist(p._id || p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <span className="text-lg">
                  {isInWishlist(p._id || p.id) ? "❤️" : "🤍"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
