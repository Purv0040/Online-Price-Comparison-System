import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"
import { priceAlertAPI } from "../../services"

const ALERTS_STORAGE_KEY = "priceAlerts"

const parsePriceNumber = (value) => {
  if (typeof value === "number") return value
  const parsed = Number(String(value || "").replace(/[^\d.]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0)

const isMongoObjectId = (value) => /^[0-9a-fA-F]{24}$/.test(String(value || ""))

const getStoredAlerts = () => {
  try {
    return JSON.parse(localStorage.getItem(ALERTS_STORAGE_KEY)) || []
  } catch {
    return []
  }
}

const saveStoredAlerts = (alerts) => {
  localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts))
}

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

  const [alertOn, setAlertOn] = useState(false)
  const [showTargetModal, setShowTargetModal] = useState(false)
  const [targetPriceInput, setTargetPriceInput] = useState("")
  const [targetPriceError, setTargetPriceError] = useState("")
  const [pendingCurrentPrice, setPendingCurrentPrice] = useState(0)
  const [currentAlertId, setCurrentAlertId] = useState(null)

  if (!product) return null

  useEffect(() => {
    let mounted = true

    const syncAlertState = async () => {
      if (!product?._id) return

      if (isAuthenticated) {
        try {
          const response = await priceAlertAPI.getAll()
          const alerts = response?.data?.alerts || []
          const already = alerts.find((alert) => {
            const alertProductId = alert?.product?._id || alert?.product
            return String(alertProductId) === String(product._id) && alert?.isActive !== false
          })

          if (!mounted) return
          setAlertOn(Boolean(already))
          setCurrentAlertId(already?._id || null)
          return
        } catch (error) {
          console.error("Price alert fetch error:", error)
        }
      }

      const existing = getStoredAlerts()
      const already = existing.find((p) => p.name === product.title)
      if (!mounted) return
      setAlertOn(Boolean(already && already.active !== false))
      setCurrentAlertId(null)
    }

    syncAlertState()

    return () => {
      mounted = false
    }
  }, [product._id, product.title, isAuthenticated])

  const openTargetModal = () => {
    const currentPrice = parsePriceNumber(product.lowestPrice || product.price)
    const suggestedTarget = currentPrice > 0 ? Math.max(1, Math.round(currentPrice * 0.95)) : ""

    setPendingCurrentPrice(currentPrice)
    setTargetPriceInput(String(suggestedTarget))
    setTargetPriceError("")
    setShowTargetModal(true)
  }

  const disableLocalAlert = () => {
    const existing = getStoredAlerts()
    const updated = existing.filter((p) => p.name !== product.title)
    saveStoredAlerts(updated)
    setAlertOn(false)
  }

  const disableRemoteAlert = async () => {
    let alertIdToDelete = currentAlertId

    if (!alertIdToDelete) {
      const response = await priceAlertAPI.getAll()
      const alerts = response?.data?.alerts || []
      const match = alerts.find((alert) => {
        const alertProductId = alert?.product?._id || alert?.product
        return String(alertProductId) === String(product._id) && alert?.isActive !== false
      })
      alertIdToDelete = match?._id || null
    }

    if (alertIdToDelete) {
      await priceAlertAPI.delete(alertIdToDelete)
    }

    setAlertOn(false)
    setCurrentAlertId(null)
  }

  const handleToggle = async () => {
    if (!alertOn) {
      if (!isAuthenticated) {
        navigate("/login")
        return
      }

      openTargetModal()
      return
    }

    if (isAuthenticated) {
      try {
        await disableRemoteAlert()
      } catch (error) {
        console.error("Price alert delete error:", error)
        setTargetPriceError(error?.response?.data?.message || "Failed to disable price alert")
        setShowTargetModal(true)
      }
      return
    }

    disableLocalAlert()
  }

  const handleTargetPriceSubmit = async (e) => {
    e.preventDefault()

    const targetPrice = parsePriceNumber(targetPriceInput)
    if (!targetPrice || targetPrice <= 0) {
      setTargetPriceError("Please enter a valid target price greater than 0")
      return
    }

    if (isAuthenticated) {
      if (!isMongoObjectId(product._id)) {
        setTargetPriceError("Price alerts are available only for products saved in database")
        return
      }

      try {
        const response = await priceAlertAPI.create({ productId: product._id, targetPrice })
        setCurrentAlertId(response?.data?.alert?._id || null)
        setAlertOn(true)
        setShowTargetModal(false)
        setTargetPriceError("")
      } catch (error) {
        console.error("Price alert create error:", error)
        setTargetPriceError(error?.response?.data?.message || "Failed to create alert")
      }
      return
    }

    const existing = getStoredAlerts()
    const already = existing.find((p) => p.name === product.title)
    const nextAlert = {
      ...product,
      name: product.title,
      active: true,
      current: formatINR(pendingCurrentPrice),
      target: formatINR(targetPrice),
    }

    const updated = already
      ? existing.map((p) => (p.name === product.title ? { ...p, ...nextAlert } : p))
      : [...existing, nextAlert]

    saveStoredAlerts(updated)
    setAlertOn(true)
    setShowTargetModal(false)
    setTargetPriceError("")
  }

  const handleCloseTargetModal = () => {
    setShowTargetModal(false)
    setTargetPriceError("")
    setAlertOn(false)
  }

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
    <>
      <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
        <div>
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Top Rated 2024
          </span>

          <h1 className="mt-3 sm:mt-4 text-2xl sm:text-[28px] font-bold leading-tight text-slate-900 break-words">
            {product.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
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

        <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
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

          <button onClick={handleWishlist} title="Add to Wishlist">
            <span className="material-symbols-outlined text-red-500 text-xl leading-none">
              {isInWishlist(product._id) ? "favorite" : "favorite_border"}
            </span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
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

      {showTargetModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/45 backdrop-blur-[2px] flex items-end sm:items-center justify-center p-2 sm:p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Set Target Price</h3>
              <p className="mt-1 text-sm text-slate-500">
                Enter the price at which you want to get notified.
              </p>
            </div>

            <form onSubmit={handleTargetPriceSubmit} className="px-4 sm:px-6 py-4 sm:py-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">Target price (INR)</label>
              <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
                <span className="pl-4 pr-2 text-slate-500 font-semibold">INR</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={targetPriceInput}
                  onChange={(event) => {
                    setTargetPriceInput(event.target.value)
                    if (targetPriceError) setTargetPriceError("")
                  }}
                  className="w-full pr-4 py-3 rounded-r-xl outline-none text-slate-900"
                  placeholder="Enter target price"
                  autoFocus
                />
              </div>

              {targetPriceError && (
                <p className="mt-2 text-sm text-red-600">{targetPriceError}</p>
              )}

              <div className="mt-5 flex items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleCloseTargetModal}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
