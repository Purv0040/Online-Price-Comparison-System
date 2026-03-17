import AdminLayout from "../layouts/AdminLayout"
import StatsCards from "../components/admin/StatsCards"
import PriceTrendsChart from "../components/admin/PriceTrendsChart"
import MostSearchedProducts from "../components/admin/MostSearchedProducts"
import ScraperStatusTable from "../components/admin/ScraperStatusTable"

export default function AdminAnalytics() {
  return (
    <AdminLayout>

      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Overview</h1>
          <p className="text-gray-500">
            Real-time performance metrics and market trends
          </p>
        </div>

        <div className="flex gap-3">
          {/* Last 30 Days */}
         <button className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
  <span className="material-symbols-outlined text-base">
    calendar_month
  </span>
  Last 30 Days
</button>

          {/* Export Report */}
          <button className="flex items-center gap-2 bg-[#2b66f6] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow border-none outline-none">
  <span className="material-symbols-outlined text-base">
    download
  </span>
  Export Report
</button>

        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <PriceTrendsChart />
        <MostSearchedProducts />
      </div>

      {/* Table */}
      <ScraperStatusTable />

    </AdminLayout>
  )
}
