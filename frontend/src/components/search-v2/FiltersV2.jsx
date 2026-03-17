export default function FiltersV2() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">

      {/* Brand: Apple (highlighted) */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600
                      px-4 py-2 rounded-xl text-sm font-medium">
        Brand: Apple
        <span className="material-symbols-outlined text-base cursor-pointer">
          close
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600
                      px-4 py-2 rounded-xl text-sm font-medium">
        Price: $500 – $1500
        <span className="material-symbols-outlined text-base cursor-pointer">
          close
        </span>
      </div>

      {/* In Stock */}
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-600
                      px-4 py-2 rounded-xl text-sm font-medium">
        In Stock
        <span className="material-symbols-outlined text-base cursor-pointer">
          close
        </span>
      </div>

      {/* Clear all */}
      <button className="text-blue-600 text-sm font-medium hover:underline ml-2">
        Clear all
      </button>

    </div>
  )
}
