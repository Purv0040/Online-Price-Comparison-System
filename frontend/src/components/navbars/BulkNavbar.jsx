export default function BulkNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-white px-6 py-3">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h2 className="font-bold">PriceCompare Pro</h2>
          </div>
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">
              search
            </span>
            <input
              className="h-10 pl-10 pr-4 rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Search components, products..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search with icon */}
          <nav className="hidden lg:flex gap-8 text-sm font-medium">
            <a href="#">Price_History</a>
            <a href="#">wishlist</a>
          </nav>

          <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
      </div>
    </header>
  );
}
