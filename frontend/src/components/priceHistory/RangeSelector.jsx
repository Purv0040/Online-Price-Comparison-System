import { useState } from "react"

export default function RangeSelector() {
  const ranges = ["7D", "30D", "6M", "1Y", "All"]
  const [activeRange, setActiveRange] = useState("6M")
  const [showExport, setShowExport] = useState(false)

  // Dummy data for export (you can replace with real price history data)
  const data = [
    { date: "2025-01-01", price: 320 },
    { date: "2025-02-01", price: 340 },
    { date: "2025-03-01", price: 330 },
    { date: "2025-04-01", price: 350 },
  ]

  // Convert data to CSV
  const exportCSV = () => {
    const header = "Date,Price\n"
    const rows = data.map(d => `${d.date},${d.price}`).join("\n")
    const csvContent = header + rows

    downloadFile(csvContent, "price-history.csv", "text/csv")
  }

  // Simple Excel export (CSV but with .xlsx name for demo)
  const exportExcel = () => {
    const header = "Date\tPrice\n"
    const rows = data.map(d => `${d.date}\t${d.price}`).join("\n")
    const content = header + rows

    downloadFile(content, "price-history.xlsx", "application/vnd.ms-excel")
  }

  // Simple PDF export (text-based demo)
  const exportPDF = () => {
    const content = data.map(d => `${d.date} : ${d.price}`).join("\n")
    downloadFile(content, "price-history.pdf", "application/pdf")
  }

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

  return (
    <div className="bg-white border border-[#e7ebf3] rounded-xl p-4 flex items-center justify-between shadow-sm relative">
      
      {/* Range buttons */}
      <div className="flex bg-[#eef2f7] rounded-lg p-1">
        {ranges.map(label => (
          <button
            key={label}
            onClick={() => setActiveRange(label)}
            className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeRange === label
                ? "bg-white text-primary shadow-sm"
                : "text-[#4d6599]"
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
          className="flex items-center gap-2 bg-[#eef2f7] px-4 py-2 rounded-lg text-sm font-bold text-[#0e121b]"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          Export
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </button>

        {/* Export dropdown */}
        {showExport && (
          <div className="absolute right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg w-40 z-50">
            <button
              onClick={exportCSV}
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
            >
              Export CSV
            </button>
            <button
              onClick={exportExcel}
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
            >
              Export Excel
            </button>
            <button
              onClick={exportPDF}
              className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100"
            >
              Export PDF
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
