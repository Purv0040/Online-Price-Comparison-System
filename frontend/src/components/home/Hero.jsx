import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Hero() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 text-center">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
          <span className="material-symbols-outlined text-sm">bolt</span>
          NEW: AI PRICE TRACKING
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
          Compare Prices.<br />
          Save Money. <span className="text-blue-600">Shop Smart.</span>
        </h1>

        <p className="text-gray-500 text-base sm:text-lg px-2">
          Search over 10 million products from 500+ trusted retailers including
          Amazon, Best Buy, and Walmart.
        </p>

        {/* Search box */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center bg-white border rounded-2xl p-2 shadow-xl gap-2 sm:gap-0">
            <span className="material-symbols-outlined text-gray-400 px-3 hidden sm:inline-flex">
              search
            </span>

            <input
              className="flex-1 outline-none text-base sm:text-lg px-2 sm:px-0"
              placeholder="Search for products, brands or stores..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl font-bold"
            >
              Search
            </button>
          </div>
        </div>

       {/* Suggestions */}
<div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
  <span className="w-full sm:w-auto text-center sm:text-left">Try searching for:</span>
  {["iPhone 15", "AirPods Pro", "Mechanical Keyboards"].map(item => (
    <button
      key={item}
      onClick={() => setQuery(item)}   // ✅ only set input value
      className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-full"
    >
      <span className="material-symbols-outlined text-sm">history</span>
      {item}
    </button>
  ))}
</div>


      </div>
    </section>
  )
}
