export default function WishlistToolbar({ onClearAll }) {
  return (
    <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-xl mb-8 gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-500">Sort by:</span>
        <select className="bg-slate-100 rounded-lg px-3 py-2 text-sm">
          <option>Biggest Price Drop</option>
          <option>Lowest Price</option>
          <option>Highest Price</option>
          <option>Recently Added</option>
        </select>
      </div>

      <button
        onClick={onClearAll}
        className="flex items-center gap-1 text-sm text-slate-500 hover:text-red-600"
      >
        <span className="material-symbols-outlined text-[18px]">
          delete_sweep
        </span>
        Clear All
      </button>
    </div>
  )
}
