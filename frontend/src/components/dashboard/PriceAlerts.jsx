import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { priceAlertAPI } from "../../services"

export default function PriceAlerts() {
  const [alerts, setAlerts] = useState([])
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const parsePriceNumber = (value) => {
    if (typeof value === "number") return value
    const parsed = Number(String(value || "").replace(/[^\d.]/g, ""))
    return Number.isFinite(parsed) ? parsed : 0
  }

  const formatINR = (value) => {
    const amount = parsePriceNumber(value)
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const mapApiAlertToUi = (alert) => {
    const product = alert?.product || {}
    return {
      _id: alert?._id,
      productId: product?._id || alert?.product,
      name: product?.title || "Price Alert",
      image: product?.image || "",
      current: Number(alert?.currentPrice || 0),
      target: Number(alert?.targetPrice || 0),
      active: alert?.isActive !== false,
      dropping: false,
    }
  }

  useEffect(() => {
    let mounted = true

    const loadAlerts = async () => {
      if (isAuthenticated) {
        try {
          const response = await priceAlertAPI.getAll()
          const apiAlerts = response?.data?.alerts || []
          if (!mounted) return
          setAlerts(apiAlerts.map(mapApiAlertToUi))
          return
        } catch (error) {
          console.error("Price alerts fetch error:", error)
        }
      }

      let saved = []
      try {
        saved = JSON.parse(localStorage.getItem("priceAlerts")) || []
      } catch (e) {
        saved = []
      }
      if (!mounted) return
      setAlerts(saved)
    }

    loadAlerts()

    return () => {
      mounted = false
    }
  }, [isAuthenticated])

  const getAlertKey = (item, index) => item._id || item.id || item.name || index

  const handleAlertToggle = async (toggledItem, index) => {
    const toggledKey = getAlertKey(toggledItem, index)

    const targetItem = alerts.find((item, idx) => getAlertKey(item, idx) === toggledKey)
    const currentActive = typeof targetItem?.active === "boolean" ? targetItem.active : true

    if (isAuthenticated && currentActive) {
      try {
        if (targetItem?._id) {
          await priceAlertAPI.delete(targetItem._id)
        }
        const updatedAlerts = alerts.filter((item, idx) => getAlertKey(item, idx) !== toggledKey)
        setAlerts(updatedAlerts)
        return
      } catch (error) {
        console.error("Price alert delete error:", error)
        return
      }
    }

    // OFF behavior: remove alert immediately from dashboard + localStorage.
    const updatedAlerts = currentActive
      ? alerts.filter((item, idx) => getAlertKey(item, idx) !== toggledKey)
      : alerts.map((item, idx) => {
          const itemKey = getAlertKey(item, idx)
          if (itemKey !== toggledKey) return item
          return { ...item, active: true }
        })

    setAlerts(updatedAlerts)
    if (!isAuthenticated) {
      localStorage.setItem("priceAlerts", JSON.stringify(updatedAlerts))
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Active Price Alerts</h3>
        <button className="text-sm font-medium text-primary">Manage All</button>
      </div>

      {alerts.map((item, i) => (
        <div
          key={i}
          className={`p-5 flex items-center justify-between ${
            i === 1 ? "bg-slate-50" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="size-16 rounded-lg bg-slate-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div>
              <h4 className="font-semibold text-slate-900">{item.name}</h4>
              <p className="text-sm text-slate-500 mt-1">
                Current:{" "}
                <span className="font-medium text-slate-900">
                  {parsePriceNumber(item.current) > 0 ? formatINR(item.current) : "N/A"}
                </span>
                <span className="mx-2 text-slate-300">|</span>
                Target:{" "}
                <span className="font-medium text-primary">
                  {parsePriceNumber(item.target) > 0 ? formatINR(item.target) : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {item.dropping && (
              <span className="px-2 py-0.5 text-xs font-bold text-emerald-600 bg-emerald-100 rounded">
                DROPPING
              </span>
            )}

            {/* Toggle (ON = BLUE) */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={typeof item.active === "boolean" ? item.active : true}
                onChange={() => handleAlertToggle(item, i)}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-slate-200 peer-checked:bg-blue-600 rounded-full relative transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>
      ))}

      <div className="p-4 bg-slate-50 text-center">
        <button
  onClick={() => navigate("/category")}
  className="text-sm font-semibold text-primary flex items-center justify-center gap-2 mx-auto"
>

          <span className="material-symbols-outlined text-lg">add_circle</span>
          Track New Product
        </button>
      </div>
    </div>
  )
}
