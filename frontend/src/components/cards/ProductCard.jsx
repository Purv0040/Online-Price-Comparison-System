import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext"
import { useAuth } from "../../context/AuthContext"

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isAdding, setIsAdding] = useState(false)
  const [error, setError] = useState("")

  // Make sure product has an ID
  const productId = product._id || product.id || product?.id
  const inWishlist = productId ? isInWishlist(productId) : false

  const handleWishlistToggle = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    console.log('Wishlist toggle clicked:', { productId, isAuthenticated, inWishlist })

    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      navigate("/login")
      return
    }

    if (!productId) {
      const err = "Product ID not found"
      setError(err)
      console.error(err)
      return
    }

    try {
      setError("")
      setIsAdding(true)
      console.log('Toggling wishlist for product:', productId)

      if (inWishlist) {
        console.log('Removing from wishlist...')
        await removeFromWishlist(productId)
      } else {
        console.log('Adding to wishlist...')
        await addToWishlist(productId, product)
      }
      
      console.log('Wishlist toggled successfully')
    } catch (err) {
      const errorMsg = err.message || "Failed to update wishlist"
      setError(errorMsg)
      console.error("Wishlist error:", err)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition">

      {/* Image */}
      <div className="relative aspect-square bg-slate-50 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isAdding}
          className={`absolute top-3 right-3 p-2 rounded-full shadow transition ${
            inWishlist ? "bg-red-100" : "bg-white hover:bg-gray-100"
          } disabled:opacity-50`}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <span className="text-lg">
            {inWishlist ? "❤️" : "🤍"}
          </span>
        </button>

        {/* Badge */}
        {product.badge && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold px-2 py-1 rounded bg-green-100 text-green-700">
            {product.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <h3 className="font-bold line-clamp-2">{product.title || product.name}</h3>
        <p className="text-xs text-gray-500">{product.specs || "Product specifications"}</p>

        {/* Error Message */}
        {error && (
          <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
            {error}
          </p>
        )}

        <p className="text-xs text-gray-500">STARTING FROM</p>
        <p className="text-2xl font-black">
          {typeof product.price === 'number' 
            ? `₹${product.price.toLocaleString('en-IN')}` 
            : (product.price?.startsWith('₹') ? product.price : `₹${product.price}`)}
        </p>

        {/* Button */}
        <button
          onClick={() => navigate(`/product/${product._id || product.id || "1"}`)}
          className="mt-[10px] w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          Compare Prices →
        </button>
      </div>
    </div>
  )
}
