export default function PriceHistoryFooter() {
  return (
    <footer className="mt-20 border-t border-[#e7ebf3] bg-[#f6f6f8]">
      <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left */}
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[#8b8f97] uppercase">
          <span className="material-symbols-outlined text-sm">
            trending_up
          </span>
          PriceTracker Pro © 2023
        </div>

        {/* Right */}
        <div className="flex gap-8 text-xs font-bold tracking-widest uppercase">
          <a
            href="#"
            className="text-[#8b8f97] hover:text-[#2563EB] transition-colors"
          >
            API Documentation
          </a>
          <a
            href="#"
            className="text-[#8b8f97] hover:text-[#2563EB] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-[#8b8f97] hover:text-[#2563EB] transition-colors"
          >
            Contact Support
          </a>
        </div>

      </div>
    </footer>
  )
}
