export default function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white px-6">

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-400 text-white rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <h2 className="text-xl font-bold">PriceTracker Admin</h2>
        </div>

        <div className="relative hidden md:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            className="h-10 w-64 rounded-lg bg-gray-100 pl-10 pr-4 text-sm"
            placeholder="Search analytics..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
          <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
          <span className="text-xs font-bold text-blue-600">
            SUPER ADMIN
          </span>
        </div>

        <button className="relative h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="h-10 w-10 rounded-full bg-gray-300" />

        <button className="material-symbols-outlined text-gray-500 hover:text-red-500">
          logout
        </button>
      </div>

    </header>
  )
}
