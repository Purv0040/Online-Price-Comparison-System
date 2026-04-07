import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { priceAlertAPI } from "../../services"

export default function DashboardNavbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([])
  const notificationsRef = useRef(null)
  const { user, isAuthenticated } = useAuth()
  const avatarStorageKey = `profileAvatar:${user?.email || "guest"}`
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0D8ABC&color=fff&size=128&bold=true`
  const avatarUrl = localStorage.getItem(avatarStorageKey) || fallbackAvatar

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const formatINR = (value) => {
    const amount = Number(value || 0)
    if (!Number.isFinite(amount) || amount <= 0) return "Not set"
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const loadNotifications = async () => {
    if (isAuthenticated) {
      try {
        const response = await priceAlertAPI.getAll()
        const apiAlerts = response?.data?.alerts || []
        const mapped = apiAlerts.map((alert) => ({
          _id: alert?._id,
          productId: alert?.product?._id || alert?.product,
          name: alert?.product?.title || "Price Alert",
          target: alert?.targetPrice,
        }))
        setNotifications(mapped)
        return
      } catch (error) {
        console.error("Notification alert fetch error:", error)
      }
    }

    try {
      const alerts = JSON.parse(localStorage.getItem("priceAlerts")) || []
      setNotifications(alerts)
    } catch {
      setNotifications([])
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [isAuthenticated])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleNotificationsToggle = () => {
    if (!showNotifications) {
      loadNotifications()
    }
    setShowNotifications((prev) => !prev)
  }

  const handleNotificationClick = (item) => {
    setShowNotifications(false)
    if (item?.productId) {
      navigate(`/product/${item.productId}?from=dashboard`)
      return
    }
    if (item?._id && String(item._id).length === 24) {
      navigate(`/product/${item._id}?from=dashboard`)
      return
    }
    navigate("/dashboard")
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-6">

          {/* LEFT: Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h1 className="font-bold text-lg sm:text-xl">PriceWise</h1>
          </NavLink>

          {/* CENTER: Search */}
          <div className="hidden sm:block flex-1 max-w-xl">
            <form onSubmit={handleSearch} className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, or deals..."
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-100 text-sm
                           placeholder-slate-500 focus:outline-none
                           focus:ring-2 focus:ring-primary"
              />
            </form>
          </div>

          {/* RIGHT: Links + Icons */}
          <div className="flex items-center gap-2 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              <NavLink to="/" className="hover:text-primary">Home</NavLink>

              {/* ✅ FIX: use /category (not /categories) */}
              <NavLink to="/category" className="hover:text-primary">
                Categories
              </NavLink>
            </nav>

            <button
              onClick={() => navigate("/search")}
              className="sm:hidden h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-100"
              title="Search"
            >
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={handleNotificationsToggle}
                className="relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-100"
                title="Notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-slate-100 font-semibold text-slate-900">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-sm text-slate-500 text-center">
                      No notifications yet.
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 8).map((item, idx) => (
                        <button
                          key={`${item?._id || item?.name || "alert"}-${idx}`}
                          onClick={() => handleNotificationClick(item)}
                          className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                        >
                          <p className="text-sm font-medium text-slate-800 line-clamp-1">
                            {item?.name || "Price Alert"}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Target: {typeof item?.target === "number" ? formatINR(item.target) : (item?.target || "Not set")}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Avatar → open PROFILE (not dashboard) */}
            <div
              onClick={() => navigate("/profile")}
              className="size-9 rounded-full bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url('${avatarUrl}')`,
              }}
              title="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
