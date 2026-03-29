import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useWishlist } from "../../context/WishlistContext"

export default function ProductInfo({ dynamicProduct }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToWishlist, isInWishlist } = useWishlist()

  const product = dynamicProduct || {
    _id: "prod_sony_wh1000xm5",
    id: "prod_sony_wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8LJ2FLhztgcF8RqQrnLWrnWZ5QNf2FSmO36mA1iCTmLuiCvlGU1uECNOoHEXmMUtx-CyWDyRSz6emnpkPTL6SlNUo6IQ0DrMMWEaLTB-srE910vYWrviSzrSXFvdcUK-RLjBs_KpbovwfUZoU_p9SpsYJYGB-IbL4MvRFbhjAT7KNGaArLEGHI-RYXJdkKWUYchxpOrVPPqokXJt_9Mf5dnxilYgtpkN2uhWypvITjRpPKuBQTTex-IFpP0SVpWm3XNTKFIq_p9vm",
    current: "$348.00",
    target: "$300.00",
  }

  const [alertOn, setAlertOn] = useState(false)

  // 🔹 On load: check if this product already has a price alert
  useEffect(() => {
    let existing = []
    try {
      existing = JSON.parse(localStorage.getItem("priceAlerts")) || []
    } catch (e) {
      existing = []
    }
    const already = existing.find((p) => p.name === product.name)
    if (already) {
      setAlertOn(true)
    }
  }, [])

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
      const already = existing.find((p) => p.name === product.name)
      if (!already) {
        const updated = [...existing, { ...product, active: true }]
        localStorage.setItem("priceAlerts", JSON.stringify(updated))
      }
    } else {
      // turn OFF → remove from alerts
      const updated = existing.filter((p) => p.name !== product.name)
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
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-semibold text-slate-900">
              <span className="material-symbols-outlined fill text-yellow-400 text-lg">
                star
              </span>
              4.8
            </span>

            <span className="text-slate-500">(2,450 reviews)</span>
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
            <span className="text-red-500 text-xl leading-none">❤️</span>
          </button>
        </div>
      </div>

      {/* KEY SPECS */}
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Key Specifications
        </h3>

        <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm text-slate-700">
          {[
            "Industry-leading noise cancellation",
            "Up to 30-hour battery life",
            "2x2 Beamforming Microphones",
            "Speak-to-chat technology",
            "Multipoint connection",
            "Quick charging (3min for 3h)",
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 text-lg">
                check_circle
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
