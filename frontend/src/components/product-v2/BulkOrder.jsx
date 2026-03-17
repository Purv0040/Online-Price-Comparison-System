

import { useNavigate } from "react-router-dom"
export default function BulkOrder() {
    const navigate = useNavigate()
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-primary">
          groups
        </span>
        <h3 className="font-bold text-base">Bulk Order</h3>
      </div>

      <p className="text-xs text-slate-500 mb-4 leading-relaxed">
        Planning to buy more than 10 units? Get a custom quote from our verified sellers.
      </p>

      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
          Quantity
        </label>
        <input
          type="number"
          defaultValue="10"
          className="w-full bg-slate-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

       <button
      onClick={() => navigate("/bulk-orders")}
      className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
    >
      Check Bulk Price
    </button>
    </div>
  )
}
