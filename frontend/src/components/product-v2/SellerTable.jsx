export default function SellerTable({ onSelectSeller, selectedSeller, prices, stats }) {
  const getStatusLabel = (price) => {
    if (!stats) return { text: "Average", cls: "bg-yellow-100 text-yellow-700" };
    if (price === stats.lowestPrice) return { text: "Best", cls: "bg-emerald-100 text-emerald-700" };
    if (price === stats.highestPrice) return { text: "Bad", cls: "bg-red-100 text-red-700" };
    return { text: "Average", cls: "bg-yellow-100 text-yellow-700" };
  };

  if (!prices || prices.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-500">
        No competing sellers found for this product.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden mt-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
        <h3 className="text-xl font-bold">Compare All Sellers</h3>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wide">
          <tr className="text-left">
            <th className="px-6 py-4">Seller</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Delivery</th>
            <th>Trust Score</th>
            <th className="px-6 text-right">Status</th>
          </tr>
        </thead>

        <tbody>
          {prices.map((p, i) => {
            const sellerInfo = p.seller || {};
            const label = getStatusLabel(p.price);
            const isSelected = selectedSeller?._id === p._id;

            return (
              <tr
                key={p._id || i}
                onClick={() => onSelectSeller(p)}
                className={`cursor-pointer transition-colors ${
                  isSelected ? "bg-blue-50/50" : ""
                } hover:bg-slate-50`}
              >
                <td className="px-6 py-5 flex items-center gap-4 font-semibold">
                  <div className="w-10 h-10 rounded-md border bg-white flex items-center justify-center overflow-hidden">
                    {sellerInfo.logo ? (
                      <img src={sellerInfo.logo} alt={sellerInfo.name} className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-blue-500 font-bold">{(sellerInfo.name || "S").charAt(0)}</span>
                    )}
                  </div>
                  {sellerInfo.name || "Unknown Seller"}
                </td>

                <td className="font-bold">₹{p.price?.toLocaleString()}</td>

                <td className={p.discount > 0 ? "text-emerald-600" : "text-slate-400"}>
                  {p.discount > 0 ? `-${p.discount}%` : '0%'}
                </td>

                <td className="text-slate-500">
                  {p.deliveryDays ? `${p.deliveryDays} days` : 'Free'}
                </td>

                <td className="flex h-full items-center gap-1 mt-5">
                  <span className="material-symbols-outlined text-blue-500 text-base">
                    verified
                  </span>
                  {sellerInfo.rating || 4.0}/5
                </td>

                <td className="px-6 text-right">
                  <span className={`px-4 py-1 rounded-full text-xs font-semibold ${label.cls}`}>
                    {label.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
