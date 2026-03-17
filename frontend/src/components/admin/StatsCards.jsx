export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">

      {/* Total Products */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Total Products</p>
          <span className="material-symbols-outlined text-blue-600">
            package_2
          </span>
        </div>
        <p className="text-2xl font-bold">12,405</p>
        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            trending_up
          </span>
          +3.2%
        </p>
      </div>

      {/* Total Users */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Total Users</p>
          <span className="material-symbols-outlined text-blue-600">
            person
          </span>
        </div>
        <p className="text-2xl font-bold">3,820</p>
        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            trending_up
          </span>
          +12%
        </p>
      </div>

      {/* Active Alerts */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Active Alerts</p>
          <span className="material-symbols-outlined text-blue-600">
            notifications_active
          </span>
        </div>
        <p className="text-2xl font-bold">142</p>
        <p className="text-xs text-gray-500 mt-2">
          Tracking currently
        </p>
      </div>

      {/* Pending Orders */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <span className="material-symbols-outlined text-blue-600">
            shopping_cart_checkout
          </span>
        </div>
        <p className="text-2xl font-bold">28</p>
        <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">
            priority_high
          </span>
          5 urgent
        </p>
      </div>

      {/* Today's Updates */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-gray-500">Today's Updates</p>
          <span className="material-symbols-outlined text-blue-600">
            sync
          </span>
        </div>
        <p className="text-2xl font-bold">1,105</p>
        <p className="text-xs text-gray-500 mt-2">
          Last updated 5m ago
        </p>
      </div>

    </div>
  )
}
