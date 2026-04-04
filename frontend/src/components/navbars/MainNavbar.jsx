import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthContext"

export default function MainNavbar() {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)
  const avatarStorageKey = `profileAvatar:${user?.email || "guest"}`
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0D8ABC&color=fff&size=128&bold=true`
  const avatarUrl = localStorage.getItem(avatarStorageKey) || fallbackAvatar

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      navigate("/wishlist")
    } else {
      navigate("/login")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
    setShowMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h1 className="font-bold text-lg sm:text-xl">PriceWise</h1>
        </NavLink>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          
          <button
            onClick={handleWishlistClick}
            className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 transition"
            title="Wishlist"
          >
            <span className="material-symbols-outlined">favorite</span>
          </button>

          <button className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 transition">
            <span className="material-symbols-outlined">dark_mode</span>
          </button>

          <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>

          {/* User Menu or Auth Links */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <img
                  src={avatarUrl}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  title={user.name}
                />
                <span className="text-sm font-semibold text-gray-700 hidden md:block">{user.name}</span>
                <span className="material-symbols-outlined text-sm hidden sm:inline-flex">
                  {showMenu ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <NavLink
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <span className="material-symbols-outlined text-sm align-middle">person</span> Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                  >
                    <span className="material-symbols-outlined text-sm align-middle">dashboard</span> Dashboard
                  </NavLink>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <span className="material-symbols-outlined text-sm align-middle">logout</span> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition px-2"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
