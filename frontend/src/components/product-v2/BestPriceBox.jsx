export default function BestPriceBox({ seller, status }) {
  if (!seller) return null

  const statusMap = {
    best: {
      text: "Best Deal Found",
      cls: "bg-emerald-600 text-white",
      containerCls: "bg-emerald-50 border-emerald-500",
      accentCls: "text-emerald-700",
      icon: "task_alt"
    },
    average: {
      text: "Average Deal",
      cls: "bg-amber-500 text-white",
      containerCls: "bg-amber-50 border-amber-400",
      accentCls: "text-amber-700",
      icon: "info"
    },
    bad: {
      text: "High Price",
      cls: "bg-red-600 text-white",
      containerCls: "bg-red-50 border-red-500",
      accentCls: "text-red-700",
      icon: "warning"
    },
  }

  const current = statusMap[status] || statusMap.best

  return (
    <div className={`mt-6 border-2 rounded-xl px-6 py-5 flex items-center justify-between transition-colors duration-300 ${current.containerCls}`}>

      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 bg-white rounded-lg border flex items-center justify-center font-black italic text-xl shadow-sm ${current.accentCls}`}>
          {seller.name.substring(0, 2).toUpperCase()}
        </div>

        <div>
          <p className={`text-sm font-semibold flex items-center gap-1 ${current.accentCls}`}>
            <span className="material-symbols-outlined text-sm">{current.icon}</span>
            {status === 'best' ? 'Maximum Savings' : 'Selected Seller'}
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-[32px] font-black text-slate-900">
              {seller.price}
            </span>
          </div>

          <p className={`text-xs mt-1 font-medium ${current.accentCls}`}>
            Discount: {seller.discount}
          </p>
        </div>
      </div>

      {/* STATUS BADGE */}
      <div className={`px-6 py-3 rounded-lg font-bold text-sm shadow-sm ${current.cls}`}>
        {current.text}
      </div>

    </div>
  )
}
