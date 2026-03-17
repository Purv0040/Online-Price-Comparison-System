import items from "../../data/productV2/similarProducts"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"

export default function SimilarProducts() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [addingProduct, setAddingProduct] = useState(null)

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
        {items.map((p, i) => (
          <div
            key={i}
            className="group bg-white border border-slate-200 rounded-xl p-4
                       transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
              <span className="text-lg font-black">{p.price}</span>

              <button
                onClick={() => handleWishlistToggle(p)}
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
