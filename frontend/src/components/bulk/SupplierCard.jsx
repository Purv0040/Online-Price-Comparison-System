export default function SupplierCard({ supplier, highlight }) {
  return (
    <div
      className={`relative bg-white rounded-xl p-6 flex justify-between items-center shadow-sm ${
        highlight
          ? "border border-blue-400"
          : "border border-gray-100"
      }`}
    >
      {/* BEST BULK VALUE badge */}
      {highlight && (
        <span className="absolute top-0 right-0 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
          BEST BULK VALUE
        </span>
      )}

      {/* LEFT */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold text-black">
            {supplier.name}
          </h4>
          <span className="material-symbols-outlined text-blue-600 text-sm">
            verified
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {supplier.desc}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500 mt-3">
          <span className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                highlight ? "bg-green-500" : "bg-orange-400"
              }`}
            />
            <span className="text-black font-medium">
              {supplier.stock}
            </span>{" "}
            in stock
          </span>

          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-gray-400">
              local_shipping
            </span>
            {supplier.delivery}
          </span>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="h-20 w-px bg-gray-100 mx-8" />

      {/* RIGHT */}
      <div className="text-right space-y-3 min-w-[170px]">
        <p className="text-xs text-gray-400 font-semibold tracking-wide">
          UNIT PRICE
        </p>

        <p
          className={`text-3xl font-black ${
            highlight ? "text-blue-600" : "text-black"
          }`}
        >
          ${supplier.price}
        </p>

        <button
          className={`w-full py-2.5 rounded-lg font-semibold ${
            highlight
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          Select
        </button>
      </div>
    </div>
  )
}
