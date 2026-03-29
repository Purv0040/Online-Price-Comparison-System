export default function BestPriceBox({ seller, status, dynamicPrice }) {
  if (!seller) return null

  const statusMap = {
    best: {
      text: "Best For Now",
      cls: "bg-emerald-600 text-white",
    },
    average: {
      text: "Average Deal",
      cls: "bg-yellow-500 text-white",
    },
    bad: {
      text: "High Price",
      cls: "bg-red-600 text-white",
    },
  }

  const current = statusMap[status] || statusMap.best

  return (
    <div className="mt-6 bg-emerald-50 border-2 border-emerald-500 rounded-xl px-6 py-5
                    flex items-center justify-between">

      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-lg border border-emerald-100
                        flex items-center justify-center font-black italic text-orange-500 text-xl">
          {seller.name.toLowerCase()}
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            Selected Seller
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-[32px] font-black text-slate-900">
              {dynamicPrice || seller.price}
            </span>
          </div>

          <p className="text-xs text-emerald-700 mt-1">
            Discount: {seller.discount}
          </p>
        </div>
      </div>

      {/* STATUS BUTTON */}
<div
  className={`px-6 py-3 rounded-lg font-bold text-sm ${current.cls}`}
>
  {current.text}
</div>

    </div>
  )
}
