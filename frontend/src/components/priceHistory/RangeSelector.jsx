import { useState } from "react"

export default function RangeSelector() {
  const ranges = ["7D", "30D", "6M", "1Y", "All"]
  const [activeRange, setActiveRange] = useState("6M")
  const [showExport, setShowExport] = useState(false)

  // Demo data for export
  const exportData = [
    { date: "2025-01-01", price: 32000 },
    { date: "2025-02-01", price: 34000 },
    { date: "2025-03-01", price: 33000 },
    { date: "2025-04-01", price: 35000 },
  ]

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    setShowExport(false)
  }

  const exportCSV = () => {
    const csvContent = "Date,Price\n" + exportData.map(d => `${d.date},${d.price}`).join("\n")
    downloadFile(csvContent, "price-history.csv", "text/csv")
  }

  return (
    <div className="bg-white border border-[#e7ebf3] rounded-[1.5rem] p-4 flex items-center justify-between shadow-sm relative">
      {/* Range buttons */}
      <div className="flex bg-[#f4f7fa] rounded-2xl p-1 gap-1">
        {ranges.map(label => (
          <button
            key={label}
            onClick={() => setActiveRange(label)}
            className={`px-6 py-2 text-[11px] font-black rounded-xl uppercase tracking-wider transition-all duration-300 ${
              activeRange === label
                ? "bg-white text-blue-600 shadow-md scale-[1.05]"
                : "text-[#4d6599] hover:bg-white/50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Export */}
      <div className="relative">
        <button
          onClick={() => setShowExport(!showExport)}
          className="flex items-center gap-2 bg-[#f4f7fa] px-5 py-2.5 rounded-2xl text-xs font-black text-[#0e121b] hover:bg-slate-100 transition-colors uppercase tracking-widest"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export
          <span className="material-symbols-outlined text-[18px] opacity-40">expand_more</span>
        </button>

        {showExport && (
          <div className="absolute right-0 mt-3 bg-white border border-slate-200 rounded-[1.5rem] shadow-2xl w-48 z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
            <button
              onClick={exportCSV}
              className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">csv</span>
              Download CSV
            </button>
            <button
              onClick={() => setShowExport(false)}
              className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors flex items-center gap-3"
            >
              <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
