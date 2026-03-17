import { useNavigate } from "react-router-dom"
export default function PriceHistory() {
   const navigate = useNavigate()
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

      {/* Chart Placeholder */}
      <div className="h-24 bg-slate-100 rounded-lg mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent" />
      </div>

      <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-4">
        <span>30 DAYS AGO</span>
        <span>TODAY</span>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Highest</span>
          <span className="font-bold">$399.99</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Lowest</span>
          <span className="font-bold text-emerald-600">$348.00</span>
        </div>
      </div>
 <button
      onClick={() => navigate("/price-history")}
      className="mt-4 w-full text-blue-600 font-bold text-sm flex items-center justify-center gap-1 hover:underline"
    >
      View Full History
      <span className="material-symbols-outlined text-base">
        arrow_forward
      </span>
    </button>
    </div>
  )
}
