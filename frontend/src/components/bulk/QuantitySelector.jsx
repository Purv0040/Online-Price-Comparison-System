export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

      {/* LEFT */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
          ENTER QUANTITY
        </p>

        <div className="flex items-center">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-14 h-14 bg-white border border-gray-200 rounded-l-lg text-xl flex items-center justify-center"
          >
            −
          </button>

          <div className="w-24 h-14 flex items-center justify-center border-y border-gray-200 text-xl font-bold">
            {quantity}
          </div>

          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-14 h-14 bg-white border border-gray-200 rounded-r-lg text-xl text-primary flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>

      {/* RIGHT INFO BOX */}
      <div className="flex items-start gap-3 bg-blue-50 px-4 py-3 rounded-lg max-w-md">
        <span className="material-symbols-outlined text-primary mt-0.5">
          info
        </span>
        <p className="text-sm text-primary leading-relaxed">
          You&apos;ve unlocked the <span className="font-semibold">Tier 2</span> discount!
          Add 5 more units to reach Tier 3 (15% off).
        </p>
      </div>

    </div>
  )
}
