import { NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function DashboardNavbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between gap-6">

          {/* LEFT: Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h1 className="font-bold text-xl">PriceWise</h1>
          </NavLink>

          {/* CENTER: Search */}
          <div className="flex-1 max-w-xl">
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
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
              <NavLink to="/" className="hover:text-primary">Home</NavLink>

              {/* ✅ FIX: use /category (not /categories) */}
              <NavLink to="/category" className="hover:text-primary">
                Categories
              </NavLink>
            </nav>

            {/* Notifications */}
            <button className="relative h-10 w-10 flex items-center justify-center rounded-xl hover:bg-slate-100">
              <span className="material-symbols-outlined">
                notifications
              </span>
              <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>

            {/* ✅ Avatar → open PROFILE (not dashboard) */}
            <div
              onClick={() => navigate("/dashboard ")}
              className="size-9 rounded-full bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw36RtlQVQcBrZ1A85hP2aQAVkiUhT1mf1tsmWZae2fIDceHWEayzfAVwIvadfBW0knp4yPd0HhCKkJN0ACPnqKS3liUQZnK2t0Cvs1m6HfYFCGg6JKgYbtBLC3fDFt6Jtw-sjlIPSmQcbz_-0r3IDWYTXjoo7h-hUeTQolsdEcJ6xGcVsttHisuDQni7urqDcLRj-fWgmpIka9Iq7wgr35CNm3IquhB6LSjfYbPlyXk3lN5yxTDsNFM2SrDav59UkM0Bb3ig0GD3M')",
              }}
              title="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
