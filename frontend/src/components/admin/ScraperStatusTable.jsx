export default function ScraperStatusTable() {
  const rows = [
    {
      name: "Amazon.com",
      status: "Success",
      time: "2 mins ago",
      color: "green",
      progress: "w-[90%]",
      iconBg: "bg-orange-100 text-orange-500",
      icon: "A",
    },
    {
      name: "Walmart.com",
      status: "Success",
      time: "15 mins ago",
      color: "green",
      progress: "w-[75%]",
      iconBg: "bg-blue-100 text-blue-600",
      icon: "W",
    },
    {
      name: "eBay.com",
      status: "Failed (403)",
      time: "1 hr ago",
      color: "red",
      progress: "w-[40%]",
      iconBg: "bg-red-100 text-red-500",
      icon: "E",
    },
    {
      name: "BestBuy.com",
      status: "Retrying...",
      time: "Just now",
      color: "yellow",
      progress: "w-[65%]",
      iconBg: "bg-yellow-100 text-yellow-600",
      icon: "B",
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h3 className="font-bold text-base">Price Scraper Status</h3>
        <button className="text-primary text-sm font-semibold">
          View all sources
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
          <tr>
            <th className="px-6 py-3 text-left">Source Domain</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Last Scrape</th>
            <th className="px-6 py-3 text-left">Success Rate</th>
            <th className="px-6 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-gray-100">
              {/* Source */}
              <td className="px-6 py-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${r.iconBg}`}
                >
                  {r.icon}
                </div>
                <span className="font-medium">{r.name}</span>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <span
                  className={`flex items-center gap-2 font-medium ${
                    r.color === "green"
                      ? "text-green-600"
                      : r.color === "red"
                      ? "text-red-500"
                      : "text-yellow-600"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {r.color === "green"
                      ? "check_circle"
                      : r.color === "red"
                      ? "error"
                      : "hourglass_top"}
                  </span>
                  {r.status}
                </span>
              </td>

              {/* Time */}
              <td className="px-6 py-4 text-gray-600">{r.time}</td>

              {/* Progress */}
              <td className="px-6 py-4">
                <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      r.color === "green"
                        ? "bg-green-500"
                        : r.color === "red"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    } ${r.progress}`}
                  />
                </div>
              </td>

              {/* Action */}
              <td className="px-6 py-4">
                <span className="material-symbols-outlined text-gray-500 cursor-pointer">
                  settings
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
