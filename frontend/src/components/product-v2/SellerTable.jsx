export default function SellerTable({ sellers = [], onSelectSeller, selectedSeller }) {
  const getPriceNumber = (price) => {
    if (!price) return 0;
    if (typeof price === 'number') return price;
    return Number(String(price).replace(/[^0-9.]/g, ""));
  };

  const prices = sellers.map((s) => getPriceNumber(s.price))
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0

  const getLabel = (price) => {
    const p = getPriceNumber(price)
    if (p === minPrice) return { text: "Best", cls: "bg-emerald-100 text-emerald-700" }
    if (p === maxPrice) return { text: "Bad", cls: "bg-red-100 text-red-700" }
    return { text: "Average", cls: "bg-yellow-100 text-yellow-700" }
  }

  if (!sellers.length) return (
    <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-dashed">
      No sellers available for this product yet.
    </div>
  )

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <div className="flex items-center justify-between px-6 py-5">
        <h3 className="text-xl font-bold">Compare All Sellers</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wide">
            <tr className="text-left">
              <th className="px-6 py-4">Seller</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {sellers.map((s, i) => {
              const label = getLabel(s.price)
              const isSelected = selectedSeller?.seller?.name === s.seller?.name

              return (
                <tr
                  key={i}
                  onClick={() => onSelectSeller(s)}
                  className={`cursor-pointer border-t border-slate-50 ${
                    isSelected ? "bg-blue-50/50" : ""
                  } hover:bg-slate-50 transition-colors`}
                >
                  <td className="px-6 py-5 flex items-center gap-4 font-semibold text-slate-900">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden p-1">
                      {s.seller?.logo ? (
                        <img
                          src={s.seller.logo}
                          alt={s.seller.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-slate-400 capitalize">{s.seller?.name?.charAt(0)}</span>
                      )}
                    </div>
                    {s.seller?.name}
                  </td>

                  <td className="font-bold text-slate-900">${s.price.toFixed(2)}</td>

                  <td className={s.discount > 0 ? "text-emerald-600 font-medium" : "text-slate-400"}>
                    {s.discount > 0 ? `-${s.discount}%` : "No discount"}
                  </td>

                  <td className="px-6">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${label.cls}`}
                    >
                      {label.text}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
