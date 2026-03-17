export default function ProductDetailsFooterV2() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
              <span className="material-symbols-outlined">
                local_offer
              </span>
              PriceWise
            </div>
            <p className="text-sm text-slate-600 max-w-xs">
              Your personal shopping assistant. Compare prices across
              hundreds of stores automatically.
            </p>

            <div className="flex gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <span className="material-symbols-outlined text-sm">
                  language
                </span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-md bg-slate-100 text-slate-600">
                <span className="material-symbols-outlined text-sm">
                  alternate_email
                </span>
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Help Center</li>
              <li>Price Matching</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Browser Extension</li>
              <li>Mobile App</li>
              <li>Sitemap</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-10"></div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <span>© 2024 PriceWise Inc. All rights reserved.</span>

          <div className="flex items-center gap-4">
            <span>English (US)</span>
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
