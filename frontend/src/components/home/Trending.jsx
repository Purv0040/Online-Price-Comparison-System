import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"

const products = [
  {
    _id: "prod_001",
    id: "prod_001",
    brand: "Apple",
    name: "iPhone 15 Pro, 256GB - Natural Titanium",
    price: "$999.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCyrH1pXjH1HRbzXl33T1OO5ZoqhFVi5Cl1txlYQbRve5AlozjCMCnfrt4pZ2lswwsdniyiVpg6G1fVmwMV_rzbZEQ8fF4T68HFkR80aOVTEIKEIWcqR6cnUgHGjpofYHJGKsRG-HdI9evCRgsdEdp67Sic9f5-rPjD3-GYmckH4IBJ5mdBDQnMvI4kZyAoy3lIhPPHbcc6R9WocCiBRquzUkvJUtZ4WHA5w63573lHUiwl736mSDwxXlMW8C6mIfnjDGFhQ0L1llo",
    badge: "HOT DEAL",
    badgeColor: "bg-secondary",
    stores: "5 Stores Compared",
  },
  {
    _id: "prod_002",
    id: "prod_002",
    brand: "Sony",
    name: "WH-1000XM5 Wireless Noise Canceling",
    price: "$328.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCiJlAj3kCn8Z6LqPOKWUx5w3HBwb2CvYcWO6e0I8KMh7HSpMohpC74_jeVc8WXmfQCFehp_oR72QFa25YXKFNKIKweluhCvSwatNvQ_jDj0TzwTpW1uAfzEFWWO6LVP6b0ykuUGY_1R1ApECr7nH9lVssTyQCG5BXcRAdmGjdSUjT8Zj-FlMvSFdMuP6ww3QDNbiXkjojIUfZrrMWmxkWw9VCwEKAl63pXjYy43MTZU62cfJ3jkYR2v9NACazX8s6BRKesquOIe_vj",
    stores: "12 Stores Compared",
  },
  {
    _id: "prod_003",
    id: "prod_003",
    brand: "Keychron",
    name: "Keychron Q3 QMK Custom Mechanical Keyboard",
    price: "$159.00",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC01qLoBX_mtkQqySzvjARbuVrNtPEhdOWEsqKesy18vmAxlMrbQdSqB54gWk_tFCbc_h_x9o84hL7q_hefMx8DS3cI2d5sW5_lDa267k-NiUJj29A-a5nBINeDYeJAxsp6GElDd-40vs9d_6f2g03tuURRvknO9-5DJyPAPF3I-or4htJzvICtp5hBm8k6lKAbkNKm7672rAYk5xqjCxG-_jycJMfDMujHi8Epbeloq5IfakaXzvyYUTjlllSjiLosBjo1jWSRLUI7",
    badge: "-25% OFF",
    badgeColor: "bg-red-500",
    stores: "3 Stores Compared",
  },
  {
    _id: "prod_004",
    id: "prod_004",
    brand: "Hydro Flask",
    name: "Standard Mouth Bottle with Flex Cap 24oz",
    price: "$34.95",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4mimCgbayCEBefwYj63uRVi3Xtb0pDUd5r2rYDd0CaJZQs01M6ipGTLDVHJmtQkRWG7c0gQBIlPHurVACTBPvVsT7wL1wfD2JxoA0X-gnJy0tIXajn2DXFN1AVDJpUcHlJfqVr_DlDBeLgSUwYAwOZDnKBGKo0qv0NLC2stD_anMu3MTUdtOj8qqV4c1VOmBUcMakjjEMTOQXDuCGGsjjaEb-iNRSa31OkTqNdg5B867-1AwePGBueHA11XuUHUOVSicMzKgRalfk",
    stores: "8 Stores Compared",
  },
]

export default function Trending() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [addingProduct, setAddingProduct] = useState(null)
  const [error, setError] = useState("")

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
                  navigate(`/search?query=${encodeURIComponent(p.brand)}`);
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
