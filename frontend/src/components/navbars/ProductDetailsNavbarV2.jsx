import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ProductDetailsNavbarV2() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">

          {/* LEFT: Logo + Search */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h1 className="font-bold text-xl">PriceWise</h1>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative w-full max-w-md hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products or brands..."
                className="w-full bg-slate-100 rounded-lg pl-10 pr-4 py-2 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </form>
          </div>

          {/* RIGHT: Links + Icons */}
          <div className="flex items-center gap-6">

            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/category"
                className="text-sm font-medium text-slate-700 hover:text-primary"
              >
                Categories
              </NavLink>
            </nav>

            {/* Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="p-2 rounded-lg hover:bg-slate-100"
              title="Wishlist"
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 rounded-lg hover:bg-slate-100 relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Avatar */}
            <div
              onClick={() => navigate("/Dashboard ")}
              className="size-9 rounded-full overflow-hidden cursor-pointer border border-slate-200"
              title="Profile"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_h4JqOPIynNt1bTl2N1VNr2-M66I4wMmQUGMD5I7Tm3EwZN8TxxjwKbyclMaCVGncLEcbqm-DTcfrvVCqqc-5t7yxqK39feV1UxfkKDmBsTnF9oB_ZBYTLfjpoHw-WH0Ka83QQ9x4dz8hCNQMV5ZQa6yFIfQPf9NppAiCAyw2M88A9pC7wF_ulVveVUXcoeUoB1udNQKjl35xuh_TLVLtKqFuI24S7m_NwOaqZL98I7Lq4eNLth61fQ3ALCW7ylF7-B_R34Df37v5"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}
