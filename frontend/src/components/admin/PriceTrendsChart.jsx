export default function PriceTrendsChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Price Fluctuation Trends</h3>
          <p className="text-sm text-gray-500">
            Average change across all categories
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">Avg +12%</p>
          <span className="text-xs font-bold text-green-600">
            Last 7 Days
          </span>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative h-64 w-full">
        <svg
          viewBox="0 0 472 150"
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="none"
        >
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <path
            d="M0 109C18 109 18 21 36 21C54 21 54 41 72 41C90 41 90 93 108 93C127 93 127 33 145 33C163 33 163 101 181 101C199 101 199 61 217 61C236 61 236 45 254 45C272 45 272 121 290 121C308 121 308 149 326 149C344 149 344 1 363 1C381 1 381 81 399 81C417 81 417 129 435 129C453 129 453 25 472 25 V150 H0 Z"
            fill="url(#trendGradient)"
          />
        </svg>
      </div>

      {/* Days */}
      <div className="flex justify-between px-2 mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}
