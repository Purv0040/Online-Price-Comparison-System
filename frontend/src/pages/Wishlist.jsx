import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useWishlist } from "../context/WishlistContext"
import WishlistNavbar from "../components/navbars/WishlistNavbar"
import WishlistFooter from "../components/footers/WishlistFooter"
import WishlistHeader from "../components/wishlist/WishlistHeader"
import WishlistToolbar from "../components/wishlist/WishlistToolbar"
import WishlistGrid from "../components/wishlist/WishlistGrid"

export default function Wishlist() {
  const { user, isAuthenticated } = useAuth()
  const { wishlist, loading, error, removeFromWishlist, fetchWishlist } = useWishlist()
  const [deleteError, setDeleteError] = useState("")

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist()
    }
  }, [isAuthenticated])

  const handleRemoveFromWishlist = async (item) => {
    try {
      setDeleteError("")
      // Product ID is stored in item.product field
      const productId = item.product || item._id || item.id
      if (!productId) {
        throw new Error("Product ID not found")
      }
      await removeFromWishlist(productId)
    } catch (err) {
      setDeleteError(err.message || "Failed to remove item")
      console.error("Remove error:", err)
    }
  }

  const handleClearAll = async () => {
    if (!window.confirm("Are you sure you want to clear your entire wishlist?")) {
      return
    }
    try {
      setDeleteError("")
      // Remove all items one by one
      for (const item of wishlist) {
        const productId = item.product || item._id || item.id
        if (productId) {
          await removeFromWishlist(productId)
        }
      }
    } catch (err) {
      setDeleteError(err.message || "Failed to clear wishlist")
      console.error("Clear error:", err)
    }
  }

  if (!isAuthenticated) {
    return (
      <>
        <WishlistNavbar />
        <main className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to log in to view your wishlist</p>
          <a href="/login" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Go to Login
          </a>
        </main>
        <WishlistFooter />
      </>
    )
  }

  return (
    <>
      <WishlistNavbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error message */}
        {deleteError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {deleteError}
          </div>
        )}

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-gray-600 mt-4">Loading your wishlist...</p>
          </div>
        ) : (
          <>
            <WishlistHeader count={wishlist.length} />
            <WishlistToolbar onClearAll={handleClearAll} />
            <WishlistGrid items={wishlist} onDelete={handleRemoveFromWishlist} />
          </>
        )}
      </main>

      <WishlistFooter />
    </>
  )
}
