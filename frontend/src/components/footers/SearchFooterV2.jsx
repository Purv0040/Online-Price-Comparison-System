export default function SearchFooterV2() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* TOP FOOTER */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">

          {/* ABOUT */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-500">Our Story</li>
              <li className="text-sm text-slate-500">How it Works</li>
              <li className="text-sm text-slate-500">Careers</li>
              <li className="text-sm text-slate-500">Contact</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-500">Help Center</li>
              <li className="text-sm text-slate-500">Safety Center</li>
              <li className="text-sm text-slate-500">Price Match</li>
              <li className="text-sm text-slate-500">Refund Policy</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li className="text-sm text-slate-500">Privacy Policy</li>
              <li className="text-sm text-slate-500">Terms of Service</li>
              <li className="text-sm text-slate-500">Cookie Settings</li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              Follow Us
            </h4>
            <div className="flex items-center gap-4 text-slate-400">

              <span className="material-symbols-outlined">
                public
              </span>

              <span className="material-symbols-outlined">
                alternate_email
              </span>

              <span className="material-symbols-outlined">
                rss_feed
              </span>

            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          {/* LEFT */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="material-symbols-outlined text-primary">
              monitoring
            </span>
            <span className="font-bold text-slate-900">
              PriceWise
            </span>
            <span className="ml-3">
              © 2024 Price Comparison Ltd. All rights reserved.
            </span>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                language
              </span>
              English (US)
            </div>

            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                attach_money
              </span>
              USD
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
