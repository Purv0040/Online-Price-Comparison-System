export default function OrderConfiguration({ quantity, setQuantity }) {
  return (
    <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-bold">Order Configuration</h3>
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Quantity + Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          {/* ENTER QUANTITY */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-3 tracking-wide">
              ENTER QUANTITY
            </p>

            <div className="flex items-center">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-14 h-14 border border-gray-200 rounded-l-lg bg-white text-xl flex items-center justify-center"
              >
                −
              </button>

              <div className="w-24 h-14 border-y border-gray-200 flex items-center justify-center text-xl font-bold">
                {quantity}
              </div>

              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-14 h-14 border border-gray-200 rounded-r-lg bg-white text-xl text-blue-600 flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>

          {/* INFO BOX */}
          <div className="flex items-start gap-3 bg-blue-50 px-5 py-4 rounded-lg max-w-md">
            <span className="material-symbols-outlined text-blue-600 mt-0.5">
              info
            </span>
            <p className="text-sm text-blue-600 leading-relaxed">
              You&apos;ve unlocked the <span className="font-semibold">Tier 2</span> discount!
              Add 5 more units to reach Tier 3 (15% off).
            </p>
          </div>

        </div>

        {/* TIER TITLE */}
        <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wide">
          TIER-BASED PRICING
        </p>

        {/* TIERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">

          {/* Tier 1 */}
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <p className="text-sm text-gray-400 font-semibold mb-2">
              1-9 units
            </p>
            <p className="text-xl font-bold mb-1">$1,499</p>
            <p className="text-sm text-gray-400">0% Discount</p>
          </div>

          {/* Tier 2 CURRENT */}
          <div className="relative p-5 rounded-lg border-2 border-blue-600 bg-blue-50">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full">
              CURRENT
            </div>
            <p className="text-sm text-blue-600 font-semibold mb-2">
              10-19 units
            </p>
            <p className="text-xl font-bold text-blue-600 mb-1">$1,349</p>
            <p className="text-sm text-blue-600">10% Discount</p>
          </div>

          {/* Tier 3 */}
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <p className="text-sm text-gray-400 font-semibold mb-2">
              20-49 units
            </p>
            <p className="text-xl font-bold mb-1">$1,274</p>
            <p className="text-sm text-gray-400">15% Discount</p>
          </div>

          {/* Tier 4 */}
          <div className="p-5 rounded-lg border border-gray-200 bg-white">
            <p className="text-sm text-gray-400 font-semibold mb-2">
              50+ units
            </p>
            <p className="text-xl font-bold mb-1">$1,199</p>
            <p className="text-sm text-gray-400">20% Discount</p>
          </div>

        </div>
      </div>
    </section>
  )
}
