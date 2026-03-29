export default function BestPriceBox({ seller, status }) {
  if (!seller) return null;

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
  };

  const current = statusMap[status] || statusMap.best;
  const sellerInfo = seller.seller || seller; // Handle both populated and nested formats
  const displayName = sellerInfo.name || sellerInfo.platform || "Seller";

  return (
    <div className="mt-6 bg-emerald-50 border-2 border-emerald-500 rounded-xl px-6 py-5
                    flex items-center justify-between">

      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-white rounded-lg border border-emerald-100
                        flex items-center justify-center overflow-hidden">
          {sellerInfo.logo ? (
            <img src={sellerInfo.logo} alt={displayName} className="w-full h-full object-contain p-1" />
          ) : (
            <span className="font-black italic text-orange-500 text-xl">{displayName.charAt(0)}</span>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            {displayName}
          </p>

          <div className="flex items-baseline gap-3">
            <span className="text-[32px] font-black text-slate-900">
              ₹{seller.price?.toLocaleString()}
            </span>
            {seller.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                ₹{seller.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-xs text-emerald-700 mt-1">
            Discount: {seller.discount}%
          </p>
        </div>
      </div>

      <div className={`px-6 py-3 rounded-lg font-bold text-sm ${current.cls}`}>
        {current.text}
      </div>

    </div>
  );
}
