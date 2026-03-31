export default function InsightsSidebar({ seller, stats }) {
  const history = seller?.history || []

  // Fallback to stats if history is empty (though stats usually come from history)
  const minPrice = stats?.lowestPrice || (history.length > 0 ? Math.min(...history.map(h => h.price)) : 0)
  const maxPrice = stats?.highestPrice || (history.length > 0 ? Math.max(...history.map(h => h.price)) : 0)
  const avgPrice = stats?.averagePrice || (history.length > 0 ? history.reduce((a, b) => a + b, 0) / history.length : 0)

  const minItem = history.find(h => h.price === minPrice)
  const maxItem = history.find(h => h.price === maxPrice)

  const isDropping = history.length > 1 ? history[history.length - 1].price < history[0].price : false

  const predictionTitle = isDropping ? "Price likely to drop" : "Price likely to stay"
  const predictionDesc = isDropping
    ? "Based on recent trend, price is decreasing. You may want to wait before buying."
    : "Based on recent trend, price is stable. It's a good time to buy now."

  const handleTrack = () => {
    alert("Added to Active Price Alerts ✅")
  }

  return (
    <div className="space-y-6">
      <p className="text-xs font-black tracking-[0.2em] text-[#4d6599] uppercase px-1">
        Quick Insights
      </p>

      {/* Prediction Card */}
      <div className="bg-[#f0fdf4] border border-[#bcf5d4] rounded-[2rem] p-6 shadow-sm">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-[#22c55e] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
            <span className="material-symbols-outlined text-2xl font-bold">auto_graph</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#166534] opacity-60">
              Prediction
            </p>
            <p className="text-lg font-black text-[#166534]">
              {predictionTitle}
            </p>
          </div>
        </div>
        <p className="text-sm text-[#166534] font-medium leading-relaxed opacity-80">
          {predictionDesc}
        </p>
      </div>

      {/* Lowest Price Card */}
      <div className="bg-white border border-[#e7ebf3] rounded-[2rem] p-6 shadow-sm group hover:border-emerald-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#4d6599] opacity-70">
            Lowest Price Ever
          </p>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-emerald-500 text-lg">arrow_downward</span>
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-3xl font-black text-[#0e121b]">₹{minPrice.toLocaleString('en-IN')}</h4>
          <p className="text-xs text-[#4d6599] font-bold">
            Recorded on {minItem?.date || "N/A"}
          </p>
        </div>
      </div>

      {/* Highest Price Card */}
      <div className="bg-white border border-[#e7ebf3] rounded-[2rem] p-6 shadow-sm group hover:border-red-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#4d6599] opacity-70">
            Highest Price Ever
          </p>
          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-red-500 text-lg">arrow_upward</span>
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-3xl font-black text-[#0e121b]">₹{maxPrice.toLocaleString('en-IN')}</h4>
          <p className="text-xs text-[#4d6599] font-bold">
            Recorded on {maxItem?.date || "N/A"}
          </p>
        </div>
      </div>

      {/* Average Price Card */}
      <div className="bg-white border border-[#e7ebf3] rounded-[2rem] p-6 shadow-sm group hover:border-blue-200 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#4d6599] opacity-70">
            Average Price
          </p>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-blue-500 text-lg">equalizer</span>
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-3xl font-black text-[#0e121b]">₹{Math.round(avgPrice).toLocaleString('en-IN')}</h4>
          <p className="text-xs text-[#4d6599] font-bold">
            Based on {history.length} records
          </p>
        </div>
      </div>

      <button
        onClick={handleTrack}
        className="w-full mt-2 py-5 bg-[#2563EB] text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-200 flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all duration-300"
      >
        <span className="material-symbols-outlined font-bold">notifications_active</span>
        TRACK THIS PRODUCT
      </button>
    </div>
  )
}
