export default function InsightsSidebar({ seller }) {
  const history = seller?.history || []

  if (!history || history.length === 0) {
    return <div className="space-y-4 text-slate-400">No insights available</div>
  }

  const prices = history.map(h => h.price)

  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length

  const minItem = history.find(h => h.price === minPrice)
  const maxItem = history.find(h => h.price === maxPrice)

  const firstPrice = history[0].price
  const lastPrice = history[history.length - 1].price
  const isDropping = lastPrice < firstPrice

  const predictionTitle = isDropping ? "Price likely to drop" : "Price may rise"
  const predictionDesc = isDropping
    ? "Based on recent trend, price is decreasing. You may want to wait before buying."
    : "Based on recent trend, price is increasing. You may want to buy soon."

  const handleTrack = () => {
    const alerts = JSON.parse(localStorage.getItem("priceAlerts") || "[]")

    const newAlert = {
      seller: seller?.name,
      product: seller?.product?.title,
      currentPrice: seller?.price,
      date: new Date().toISOString()
    }

    const exists = alerts.some(
      a => a.seller === newAlert.seller && a.product === newAlert.product
    )

    if (!exists) {
      alerts.push(newAlert)
      localStorage.setItem("priceAlerts", JSON.stringify(alerts))
      alert("Added to Active Price Alerts ✅")
    } else {
      alert("This product is already being tracked ⚠️")
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold tracking-[0.25em] text-[#4d6599] uppercase px-1">
        Quick Insights
      </p>

      {/* Prediction */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined">auto_graph</span>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-green-600">
              Prediction
            </p>
            <p className="text-sm font-bold text-green-900">
              {predictionTitle}
            </p>
          </div>
        </div>
        <p className="text-sm text-green-800 leading-relaxed">
          {predictionDesc}
        </p>
      </div>

      {/* Lowest */}
      <div className="bg-white border border-[#e7ebf3] rounded-xl p-5 shadow-sm">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#4d6599] mb-1">
          Lowest Price Ever
        </p>
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-black">${minPrice.toFixed(2)}</h4>
          <span className="material-symbols-outlined text-green-500">arrow_downward</span>
        </div>
        <p className="text-xs text-[#4d6599] mt-1 font-medium">
          Recorded on {minItem?.date}
        </p>
      </div>

      {/* Highest */}
      <div className="bg-white border border-[#e7ebf3] rounded-xl p-5 shadow-sm">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#4d6599] mb-1">
          Highest Price Ever
        </p>
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-black">${maxPrice.toFixed(2)}</h4>
          <span className="material-symbols-outlined text-red-500">arrow_upward</span>
        </div>
        <p className="text-xs text-[#4d6599] mt-1 font-medium">
          Recorded on {maxItem?.date}
        </p>
      </div>

      {/* Average */}
      <div className="bg-white border border-[#e7ebf3] rounded-xl p-5 shadow-sm">
        <p className="text-[10px] font-bold tracking-widest uppercase text-[#4d6599] mb-1">
          Average Price
        </p>
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-black">${avgPrice.toFixed(2)}</h4>
          <span className="material-symbols-outlined text-primary">equalizer</span>
        </div>
        <p className="text-xs text-[#4d6599] mt-1 font-medium">
          Based on {history.length} records
        </p>
      </div>

      <button
        onClick={handleTrack}
        className="w-full mt-2 py-4 bg-[#2563EB] text-white rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">notifications_active</span>
        Track this product
      </button>
    </div>
  )
}
