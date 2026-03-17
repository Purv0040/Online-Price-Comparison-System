export default function AdminSidebar() {
  const active = "Analytics" // 👈 active item

  return (
    <aside className="w-64 bg-white hidden lg:flex flex-col justify-between p-4">

      <nav className="flex flex-col gap-1">
        {[
          ["inventory_2", "Products"],
          ["group", "Users"],
          ["terminal", "Scraper Logs"],
          ["local_offer", "Offers"],
          ["local_shipping", "Bulk Orders"],
          ["insert_chart", "Analytics"],
        ].map(([icon, label]) => {
          const isActive = label === active

          return (
            <a
              key={label}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <span
                className={`material-symbols-outlined ${
                  isActive ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {icon}
              </span>
              {label}
            </a>
          )
        })}
      </nav>

      {/* Bottom Status Card */}
      <div className="bg-blue-600 rounded-xl p-4 text-white mt-4">
        <p className="text-xs uppercase opacity-80">Platform Health</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-2xl font-bold">99.8%</span>
          <span className="material-symbols-outlined text-green-300">
            check_circle
          </span>
        </div>
        <p className="text-xs opacity-80">All systems operational</p>
      </div>

    </aside>
  )
}
