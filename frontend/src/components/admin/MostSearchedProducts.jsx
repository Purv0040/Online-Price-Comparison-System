export default function MostSearchedProducts() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Most Searched Products</h3>
          <p className="text-sm text-gray-500">
            Top performing search keywords
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">iPhone 15</p>
          <span className="text-xs font-bold text-red-500">
            -2.1% Today
          </span>
        </div>
      </div>

      {/* Bars */}
      <div className="grid h-64 grid-cols-5 items-end gap-6 px-4 pb-2">
        
        {[
          ["iPhone", "h-[50%]"],
          ["Galaxy", "h-[30%]"],
          ["MacBook", "h-[75%]"],
          ["PS5", "h-[60%]"],
          ["iPad Air", "h-[90%]"],
        ].map(([label, height]) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div
              className={`w-full rounded-t-lg bg-blue-200 hover:bg-blue-600 transition ${height}`}
            />
            <span className="text-[10px] font-bold text-gray-500">
              {label}
            </span>
          </div>
        ))}

      </div>
    </div>
  )
}
