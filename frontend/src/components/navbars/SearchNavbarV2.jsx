export default function SearchNavbarV2() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16 gap-6">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path d="M3 17L9 11L13 15L21 7" />
                <path d="M21 7V13" />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900">
              PriceWise
            </span>
          </div>

          {/* CENTER: Search Bar (STAYS INLINE) */}
          <div className="flex-1">
            <div className="relative max-w-3xl mx-auto">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>

              <input
                type="text"
                defaultValue="Laptop"
                className="w-full h-11 pl-11 pr-4 rounded-xl bg-[#f1f5f9] border border-slate-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-4 shrink-0">

            {/* Wishlist */}
            <button className="relative">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f172a"
                strokeWidth="2"
              >
                <path d="M20.8 4.6c-1.5-1.4-3.8-1.4-5.3 0L12 8.1l-3.5-3.5c-1.5-1.4-3.8-1.4-5.3 0-1.7 1.6-1.7 4.2 0 5.8L12 21l8.8-10.6c1.7-1.6 1.7-4.2 0-5.8z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Dark Mode */}
            <button>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0f172a"
                strokeWidth="2"
              >
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
            </button>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-300"></div>

            {/* Auth */}
            <button className="text-sm font-medium text-slate-900">
              Log in
            </button>

            <button className="bg-[#2563eb] text-white text-sm font-semibold px-4 py-2 rounded-lg">
              Sign up
            </button>

          </div>
        </div>
      </div>
    </header>
  )
}
