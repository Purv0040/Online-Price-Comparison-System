import sellers from "../../data/productV2/sellers"

export default function SellerTable({ onSelectSeller, selectedSeller, dynamicPrice }) {
  const getPriceNumber = (price) => {
    if (!price) return 0;
    if (typeof price === 'number') return price;
    return Number(String(price).replace(/[^0-9.]/g, ""));
  };

  // Modify the static sellers array dynamically using the actual product price
  const activeSellers = sellers.map((s, i) => {
    if (i === 0 && dynamicPrice) {
      return { ...s, price: dynamicPrice };
    }
    return s;
  });

  const prices = activeSellers.map((s) => getPriceNumber(s.price))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  const getLabel = (price) => {
    const p = getPriceNumber(price)
    if (p === minPrice) return { text: "Best", cls: "bg-emerald-100 text-emerald-700" }
    if (p === maxPrice) return { text: "Bad", cls: "bg-red-100 text-red-700" }
    return { text: "Average", cls: "bg-yellow-100 text-yellow-700" }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5">
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
          {activeSellers.map((s, i) => {
            const label = getLabel(s.price)
            const isSelected = selectedSeller?.name === s.name

            return (
              <tr
                key={i}
                onClick={() => onSelectSeller(s)}
                className={`cursor-pointer ${
                  isSelected ? "bg-blue-50" : ""
                } hover:bg-slate-50`}
              >
                <td className="px-6 py-5 flex items-center gap-4 font-semibold">
                  <img
                    src={s.logo}
                    alt={s.name}
                    className="w-10 h-10 rounded-md border object-contain"
                  />
                  {s.name}
                </td>

                <td className="font-bold">{s.price}</td>

                <td
                  className={
                    s.discount.startsWith("-")
                      ? "text-emerald-600"
                      : "text-slate-400"
                  }
                >
                  {s.discount}
                </td>

                <td>{s.delivery}</td>

                <td className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-blue-500 text-base">
                    verified
                  </span>
                  {s.trust}
                </td>

                <td className="px-6 text-right">
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
  )
}
