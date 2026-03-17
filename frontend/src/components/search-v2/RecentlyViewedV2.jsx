import items from "../../data/searchV2/recentlyViewed"

export default function RecentlyViewedV2() {
  return (
    <section className="border-t border-slate-200 pt-12 mt-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900">
          Recently Viewed
        </h2>

        {/* Arrows */}
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <span className="material-symbols-outlined">
              chevron_left
            </span>
          </button>

          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <span className="material-symbols-outlined">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {items.map((item, i) => (
          <div key={i} className="cursor-pointer">

            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-2 hover:border-blue-400 transition">
              <img
                src={item.image}
                alt={item.title}
                className="h-24 w-full object-contain"
              />
            </div>

            <p className="text-sm font-semibold text-slate-900 line-clamp-1">
              {item.title}
            </p>

            <p className="text-sm font-bold text-blue-600">
              {item.price}
            </p>

          </div>
        ))}
      </div>

    </section>
  )
}
