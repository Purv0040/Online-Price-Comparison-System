export default function HeaderV2() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">

      {/* LEFT: Title + subtitle */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Search results for: Laptop
        </h2>

        <p className="text-slate-500 mt-2">
          120 products found across 15 retailers
        </p>
      </div>

      {/* RIGHT: Sort */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-600">
          Sort by
        </span>

        <select
          className="min-w-[180px] rounded-xl border border-blue-500 bg-white px-4 py-2.5 text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Relevance</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Highest Rated</option>
        </select>
      </div>

    </div>
  )
}
