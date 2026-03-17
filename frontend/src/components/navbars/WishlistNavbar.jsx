import { NavLink } from "react-router-dom"

export default function WishlistNavbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* LEFT: Logo + Nav */}
        <div className="flex items-center gap-10">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <h1 className="font-bold text-xl">PriceWise</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <NavLink
              to="/deals"
              className="text-slate-600 hover:text-primary"
            >
              Deals
            </NavLink>

            <NavLink
              to="/categories"
              className="text-slate-600 hover:text-primary"
            >
              Categories
            </NavLink>

            <NavLink
              to="/history"
              className="text-slate-600 hover:text-primary"
            >
              History
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
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 text-sm outline-none"
              placeholder="Search saved items..."
            />
          </div>

          <button className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined">
              notifications
            </span>
          </button>

          <button className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined">
              settings
            </span>
          </button>

          <div
            className="w-10 h-10 rounded-full bg-cover bg-center border"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBo4H1FTzI7ZCKw7RTxIk5DGr5Nkszo5SOImTxAA7LaQi6DJauKCPwS54cMmWqoTIGHiwD15ECf9h6osT4N7FtxOXLgvd9wbMxrDyEh2i3PJBgl6dvSBtd6BRSmwI1gvO9ch9wFcuXCSjFgAaIOh-8rDZEA4TIffanCgbc5yKp8u_IMYUbcYi2UeQmupaXw3FzkU6x7tUFWh9tdkPYXKUyR7s0Lv444NJ0Yk4yDzKkn0wmtgHgAIcFk4adxixIUnoOzr3MUv1rrIRuK")',
            }}
          />
        </div>
      </div>
    </header>
  )
}
