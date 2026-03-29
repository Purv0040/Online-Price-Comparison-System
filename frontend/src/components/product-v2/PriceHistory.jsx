import { useNavigate } from "react-router-dom"
export default function PriceHistory({ history = [], stats = {} }) {
  const navigate = useNavigate()
  
  const lowestPrice = stats.lowestPrice || 0
  const highestPrice = stats.highestPrice || 0

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            monitoring
          </span>
          <h3 className="font-bold text-base">Price History</h3>
        </div>

        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
          Lowest Now
        </span>
      </div>

      {/* Chart Placeholder - In a real app, use a chart library here */}
      <div className="h-24 bg-slate-50 rounded-lg mb-3 relative overflow-hidden border border-slate-100 flex items-end px-2 gap-1">
        {history.length > 0 ? (
          history.slice(0, 15).reverse().map((h, i) => {
            const height = ((h.price - lowestPrice) / (highestPrice - lowestPrice || 1)) * 100 || 50;
            return (
              <div 
                key={i} 
                className="bg-blue-400/30 w-full rounded-t-sm hover:bg-blue-500/50 transition-colors" 
                style={{ height: `${Math.max(10, height)}%` }}
                title={`$${h.price}`}
              ></div>
            )
          })
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent flex items-center justify-center">
             <span className="text-[10px] text-slate-400 font-medium">No history data</span>
          </div>
        )}
      </div>

      <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-4 uppercase">
        <span>{history.length} Checkpoints</span>
        <span>TODAY</span>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Highest</span>
          <span className="font-bold text-slate-900">${highestPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Lowest</span>
          <span className="font-bold text-emerald-600">${lowestPrice.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={() => navigate("/price-history")}
        className="mt-5 w-full py-2 bg-slate-50 text-blue-600 font-bold text-sm rounded-lg flex items-center justify-center gap-1 hover:bg-blue-50 transition-colors"
      >
        View Full History
        <span className="material-symbols-outlined text-base">
          arrow_forward
        </span>
      </button>
    </div>
  )
}
