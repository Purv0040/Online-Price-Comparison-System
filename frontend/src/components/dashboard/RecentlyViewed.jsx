import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext"
import { getProductDetails } from "../../services/api"

const STORAGE_KEY = "recentlyViewedProducts"
const FALLBACK_IMAGE = "https://loremflickr.com/600/600/product?lock=93"

const formatPriceInINR = (value) => {
  const amount = Number(value)
  if (Number.isNaN(amount) || amount <= 0) return "N/A"
  return `₹${Math.round(amount).toLocaleString("en-IN")}`
}

const inferCategoryFromName = (name = "") => {
  const value = String(name).toLowerCase()
  if (/(shoe|sneaker|shirt|jean|dress|fashion)/.test(value)) return "FASHION"
  if (/(kitchen|home|sofa|table|furniture)/.test(value)) return "HOME"
  if (/(cream|facewash|beauty|makeup|lipstick)/.test(value)) return "BEAUTY"
  if (/(ball|bat|sport|fitness)/.test(value)) return "SPORTS"
  return "ELECTRONICS"
}

const getCategoryLabel = (item) => {
  const raw = item?.category || item?.label
  if (raw && String(raw).trim()) return String(raw).trim().toUpperCase()
  return inferCategoryFromName(item?.name)
}

export default function RecentlyViewed() {
  const navigate = useNavigate()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [items, setItems] = useState([])
  const [addingProduct, setAddingProduct] = useState(null)

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        const baseItems = Array.isArray(stored) ? stored.slice(0, 4) : []

        const hydratedItems = await Promise.all(
          baseItems.map(async (item) => {
            if ((item?.category || item?.label) && String(item?.category || item?.label).trim()) {
              return item
            }

            if (!item?._id) {
              return {
                ...item,
                category: inferCategoryFromName(item?.name),
                label: inferCategoryFromName(item?.name),
              }
            }

            try {
              const response = await getProductDetails(item._id)
              const product = response?.data?.product

              const resolvedCategory = product?.category || inferCategoryFromName(item?.name)
              return {
                ...item,
                category: resolvedCategory,
                label: String(resolvedCategory).toUpperCase(),
                brand: item?.brand || product?.brand || "PriceWise",
              }
            } catch {
              return {
                ...item,
                category: inferCategoryFromName(item?.name),
                label: inferCategoryFromName(item?.name),
              }
            }
          })
        )

        setItems(hydratedItems)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(hydratedItems))
      } catch (err) {
        console.error("Failed to load recently viewed products:", err)
        setItems([])
      }
    }

    loadRecentlyViewed()
  }, [])

  const handleWishlistToggle = async (item) => {
    const productId = item._id
    if (!productId) return

    try {
      setAddingProduct(productId)
      if (isInWishlist(productId)) {
        await removeFromWishlist(productId)
      } else {
        await addToWishlist(productId, {
          _id: item._id,
          name: item.name,
          title: item.name,
          image: item.image,
          price: item.price,
          brand: item.brand || "PriceWise",
        })
      }
    } catch (err) {
      console.error("Wishlist toggle failed:", err)
    } finally {
      setAddingProduct(null)
    }
  }

  if (!items.length) return null

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recently Viewed</h3>

       
        
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            key={item._id || i}
            onClick={() => item._id && navigate(`/product/${item._id}?from=dashboard`)}
            className="group bg-white rounded-2xl border border-[#d0d7e7] overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 relative cursor-pointer"
          >
            {/* Wishlist */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleWishlistToggle(item)
              }}
              disabled={addingProduct === item._id}
              className={`absolute top-3 right-3 z-10 p-2 bg-white rounded-full transition shadow-sm disabled:opacity-50 ${
                isInWishlist(item._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <span className="text-xl">{isInWishlist(item._id) ? "❤️" : "🤍"}</span>
            </button>

            {/* Image box */}
            <div className="relative aspect-square bg-[#f8f9fc] overflow-hidden p-6">
              {/* Image label */}
              <span className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[#0e121b] text-[10px] font-black rounded uppercase bg-white/95 border border-slate-200 shadow-sm">
                {getCategoryLabel(item)}
              </span>

              <img
                src={item.image || FALLBACK_IMAGE}
                alt={item.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE
                }}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 bg-white">
              <p className="text-xs text-[#4d6599] font-medium mb-1">
                {item.brand || "PriceWise"}
              </p>

              <h3 className="font-bold text-[#0e121b] text-base leading-tight mb-3 line-clamp-2 min-h-[2.5rem]">
                {item.name}
              </h3>

              <div className="mt-auto flex items-end justify-between">
                <div>
                  <span className="text-xs text-secondary font-bold">Best Price</span>
                  <div className="text-xl font-black text-primary">{formatPriceInINR(item.price)}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#4d6599] block mb-1">
                    {item.stores || "Recently Viewed"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (item._id) navigate(`/product/${item._id}?from=dashboard`)
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
    </section>
  )
}
