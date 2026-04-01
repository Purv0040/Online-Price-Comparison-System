import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"

const getDynamicSpecs = (product) => {
  const category = String(product?.category || "").toLowerCase()
  const title = String(product?.title || "").toLowerCase()

  if (category.includes("fashion") || /shoe|sneaker|jeans|shirt|hoodie/.test(title)) {
    return [
      "Comfort-focused fit and breathable material",
      "Durable stitching for daily wear",
      "Easy-care fabric and color retention",
      "Designed for regular lifestyle use",
      "Brand-authentic finish and detailing",
      "Balanced style and long-term comfort",
    ]
  }

  if (category.includes("home") || category.includes("kitchen")) {
    return [
      "Built for practical daily household usage",
      "Reliable performance with easy operation",
      "Compact and space-efficient design",
      "Low-maintenance build quality",
      "Energy-conscious usage profile",
      "Suitable for modern home routines",
    ]
  }

  if (category.includes("beauty")) {
    return [
      "Skin and hair friendly formulation",
      "Easy daily routine compatibility",
      "Tested quality with consistent results",
      "Convenient packaging for regular use",
      "Balanced care for multiple skin/hair types",
      "Trusted brand-grade product safety",
    ]
  }

  if (category.includes("sports")) {
    return [
      "Performance-focused build for active use",
      "Comfortable grip and handling support",
      "Durable material for routine training",
      "Lightweight yet stable construction",
      "Designed for indoor and outdoor sessions",
      "Reliable everyday fitness usability",
    ]
  }

  if (category.includes("automotive") || /car|tyre|battery|helmet|engine oil/.test(title)) {
    return [
      "Engineered for dependable road performance",
      "Built with long-term durability standards",
      "Vehicle-use compatible practical design",
      "Consistent reliability in daily driving",
      "Quality tested for routine automotive needs",
      "Value-focused maintenance support",
    ]
  }

  if (category.includes("grocery") || /atta|salt|oil|coffee|noodles|rice|flour/.test(title)) {
    return [
      "Freshness-oriented packaging quality",
      "Daily kitchen use convenience",
      "Clear nutrition and quantity labeling",
      "Easy storage and handling",
      "Consistent taste and cooking outcome",
      "Suitable for regular household consumption",
    ]
  }

  if (category.includes("book") || /book|novel|author/.test(title)) {
    return [
      "Readable print quality and layout",
      "Strong binding for repeated use",
      "Engaging content structure",
      "Portable format for daily reading",
      "Useful for learning and personal growth",
      "High shelf-life print durability",
    ]
  }

  if (category.includes("toy") || category.includes("baby") || /baby|stroller|walker|feeding bottle|blocks/.test(title)) {
    return [
      "Child-friendly and parent-safe design",
      "Comfort-focused daily usability",
      "Durable build for repeated handling",
      "Easy to clean and maintain",
      "Suitable for early learning and care",
      "Practical support for baby routines",
    ]
  }

  if (category.includes("other")) {
    return [
      "Versatile everyday utility product",
      "Practical and easy-to-use design",
      "Reliable quality for regular needs",
      "Balanced performance and value",
      "Simple maintenance and long usability",
      "Suitable for home, study, or personal use",
    ]
  }

  return [
    "Dependable performance for regular use",
    "User-friendly and practical design",
    "Durable build quality and finish",
    "Smooth day-to-day usability",
    "Trusted product reliability",
    "Balanced value and functionality",
  ]
}

export default function ProductInfo({ product }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, isInWishlist } = useWishlist()

  if (!product) return null

  const [alertOn, setAlertOn] = useState(false)

  // 🔹 On load: check if this product already has a price alert
  useEffect(() => {
    let existing = []
    try {
      existing = JSON.parse(localStorage.getItem("priceAlerts")) || []
    } catch (e) {
      existing = []
    }
    const already = existing.find((p) => p.name === product.title)
    if (already) {
      setAlertOn(true)
    }
  }, [product.title])

  // 🔹 Toggle price alert
  const handleToggle = () => {
    const newValue = !alertOn
    setAlertOn(newValue)

    let existing = []
    try {
      existing = JSON.parse(localStorage.getItem("priceAlerts")) || []
    } catch (e) {
      existing = []
    }

    if (newValue) {
      // turn ON → add if not exists
      const already = existing.find((p) => p.name === product.title)
      if (!already) {
        const updated = [...existing, { ...product, name: product.title, active: true }]
        localStorage.setItem("priceAlerts", JSON.stringify(updated))
      }
    } else {
      // turn OFF → remove from alerts
      const updated = existing.filter((p) => p.name !== product.title)
      localStorage.setItem("priceAlerts", JSON.stringify(updated))
    }
  }

  // 🔹 Wishlist heart click
  const handleWishlist = async () => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    try {
      if (!isInWishlist(product._id)) {
        await addToWishlist(product._id, product)
      }
      navigate("/wishlist")
    } catch (err) {
      console.error("Wishlist error:", err)
    }
  }

  return (
    <div className="space-y-8">
      {/* TOP ROW */}
      <div className="flex justify-between items-start">
        {/* LEFT */}
        <div>
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Top Rated 2024
          </span>

          <h1 className="mt-4 text-[28px] font-bold leading-tight text-slate-900">
            {product.title}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-semibold text-slate-900">
              <span className="material-symbols-outlined fill text-yellow-400 text-lg">
                star
              </span>
              {product.rating || "4.8"}
            </span>

            <span className="text-slate-500">({product.reviews || "2,450"} reviews)</span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-600 font-medium">In Stock</span>
          </div>
        </div>

        {/* RIGHT – PRICE ALERT + WISHLIST */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
          <span className="text-sm font-medium text-slate-900">
            Price Alert
          </span>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={alertOn}
              onChange={handleToggle}
            />

            <div
              className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:bg-blue-600
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:border after:border-slate-300 after:rounded-full
              after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"
            ></div>
          </label>

          {/* ❤️ Wishlist */}
          <button onClick={handleWishlist} title="Add to Wishlist">
            <span className="text-red-500 text-xl leading-none">
              {isInWishlist(product._id) ? "❤️" : "🤍"}
            </span>
          </button>
        </div>
      </div>

      {/* KEY SPECS */}
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Key Specifications
        </h3>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-slate-700">
          {(product.specifications && Object.keys(product.specifications).length > 0
            ? Object.entries(product.specifications).map(([key, val]) => `${key}: ${val}`)
            : getDynamicSpecs(product)
          ).map((item, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-lg">
                check_circle
              </span>
              <span className="line-clamp-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
