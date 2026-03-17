export default function FilterChips() {
  const chips = [
    "Brand: Apple",
    "Price: $500 - $1500",
    "In Stock",
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {chips.map((c) => (
        <div
          key={c}
          className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-medium border border-primary/20"
        >
          {c}
          <span className="material-symbols-outlined text-base cursor-pointer">
            close
          </span>
        </div>
      ))}
      <button className="text-slate-500 text-sm font-semibold ml-2">
        Clear all
      </button>
    </div>
  )
}
