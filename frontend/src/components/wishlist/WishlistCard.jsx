import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext"

export default function WishlistCard({ item, onDelete }) {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  // Extract product data from item
  // Item structure: { product: "id", productData: { name, price, image, ... }, addedAt }
  const productData = item.productData || item.product || item
  const productId = item.product || item._id || item.id
  
  const productName = productData?.name || productData?.title || "Product Name Not Available"
  const productImage = productData?.image || productData?.thumbnail || "https://via.placeholder.com/200?text=No+Image"
  const productPrice = productData?.price || "$0 - Price Not Available"
  const productCategory = productData?.category || productData?.brand || "Category"

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      await onDelete(item)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-[#d0d7e7] hover:shadow-md transition">
      {/* Image section */}
      <div className="relative bg-[#f8f9fc] rounded-xl p-4 overflow-hidden group">
        {/* Delete icon */}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow z-10 text-gray-500 hover:text-red-500 transition disabled:opacity-50"
          title="Remove from wishlist"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 3v1H5c-1.1 0-2 .9-2 2v1h2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7h2V6c0-1.1-.9-2-2-2h-4V3H9zm0 5h10v12H9V8z" />
            <path d="M11 10h2v8h-2zM15 10h2v8h-2z" />
          </svg>
        </button>

        {/* Image */}
        <img
          src={productImage}
          alt={productName}
          className="w-full h-40 sm:h-48 object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200?text=No+Image"
          }}
        />
      </div>

      {/* Content */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-[#4d6599] font-medium">
          {productCategory}
        </p>

        <h3 className="font-semibold text-[#0e121b] leading-tight line-clamp-2 text-sm sm:text-base">
          {productName}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-primary font-black text-base sm:text-lg">
            {productPrice}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4">
        {/* Compare → Product Details */}
        <button
          onClick={() => navigate(`/product/${productId}`)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Compare Prices
        </button>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
          {/* History → Price History page */}
          <button
            onClick={() => navigate(`/price-history`)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            History
          </button>

          {/* Bulk → Bulk Order page */}
          <button
            onClick={() => navigate(`/bulk-orders`)}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2-8m-10 8h12m0 0a1 1 0 01-1 1H6a1 1 0 01-1-1" />
            </svg>
            Bulk Order
          </button>
        </div>
      </div>
    </div>
  )
}
