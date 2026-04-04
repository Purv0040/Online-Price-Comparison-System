import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function WishlistNavbar() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const avatarStorageKey = `profileAvatar:${user?.email || "guest"}`
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0D8ABC&color=fff&size=128&bold=true`
  const avatarUrl = localStorage.getItem(avatarStorageKey) || fallbackAvatar

  const handleNotificationsClick = () => {
    // Notifications are surfaced on dashboard for now.
    navigate("/dashboard")
  }

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile")
    } else {
      navigate("/login")
    }
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        
        {/* LEFT: Logo + Nav */}
        <div className="flex items-center gap-4 sm:gap-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h1 className="font-bold text-lg sm:text-xl">PriceWise</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavLink
              to="/category"
              className="text-slate-600 hover:text-primary"
            >
              Categories
            </NavLink>

            <NavLink
              to="/wishlist"
              className="font-bold border-b-2 border-primary pb-1"
            >
              Wishlist
            </NavLink>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 text-sm outline-none"
              placeholder="Search saved items..."
            />
          </div>

          <button
            onClick={handleNotificationsClick}
            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center"
            title="Notifications"
          >
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <div
            onClick={handleProfileClick}
            className="w-10 h-10 rounded-full bg-cover bg-center border"
            style={{
              backgroundImage: `url('${avatarUrl}')`,
            }}
            title="Profile"
          />
        </div>
      </div>
    </header>
  )
}
