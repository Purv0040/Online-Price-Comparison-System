export default function BulkFooter() {
  return (
    <footer className="border-t py-10 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex items-center gap-3 opacity-60">
          <div className="w-6 h-6 bg-gray-400 rounded-md flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-sm">analytics</span>
          </div>
          <h2 className="text-sm font-bold">PriceCompare Pro</h2>
        </div>

        <div className="flex gap-8 text-sm text-gray-400">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Bulk Buy Guide</a>
        </div>

        <p className="text-xs text-gray-400">
          © 2024 PriceCompare Pro. All rights reserved.
        </p>

      </div>
    </footer>
  )
}
