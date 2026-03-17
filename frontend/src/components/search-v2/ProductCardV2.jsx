export default function ProductCardV2({ product }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-lg transition">

      {/* IMAGE */}
      <div className="relative rounded-xl overflow-hidden bg-slate-50 mb-4">

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[220px] object-contain"
        />

        {/* Wishlist */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow">
          <span className="material-symbols-outlined text-slate-500">
            favorite
          </span>
        </button>

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute bottom-3 left-3 px-2 py-1 text-[11px] font-semibold rounded
              ${product.badge === "IN STOCK" && "bg-emerald-100 text-emerald-700"}
              ${product.badge === "TOP CHOICE" && "bg-blue-100 text-blue-700"}
              ${product.badge === "PRICE DROP" && "bg-red-100 text-red-600"}
            `}
          >
            {product.badge}
          </div>
        )}

      </div>

      {/* CONTENT */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {product.title}
        </h3>

        <p className="text-sm text-slate-500 mb-3">
          {product.specs}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <span className="material-symbols-outlined text-yellow-400 text-sm">
            star
          </span>
          <span className="font-semibold text-slate-900">
            {product.rating}
          </span>
          <span className="text-sm text-slate-500">
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <p className="text-xs uppercase text-slate-500 mb-1">
          Starting from
        </p>

        <p className="text-3xl font-extrabold text-slate-900 mb-4">
          {product.price}
        </p>

        {/* Button */}
        <button className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
          Compare Prices
          <span className="material-symbols-outlined">
            arrow_forward
          </span>
        </button>
      </div>

    </div>
  )
}
