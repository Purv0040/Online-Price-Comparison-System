export default function MainFooter() {
  return (
    <footer className="bg-white border-t border-[#e7ebf3] pt-16 pb-8">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h2 className="text-[#0e121b] text-xl font-bold">
                PriceWise
              </h2>
            </div>

            <p className="text-[#4d6599] max-w-xs mb-8">
              The world's smartest price comparison engine. Helping you save on
              every purchase across hundreds of retailers.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#4d6599] hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  social_leaderboard
                </span>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#4d6599] hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#f8f9fc] flex items-center justify-center text-[#4d6599] hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">
                  groups
                </span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-[#0e121b] mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              {["About Us", "Press & Media", "Careers", "Retailer Center"].map(
                item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#4d6599] hover:text-primary text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-[#0e121b] mb-6">
              Categories
            </h4>
            <ul className="space-y-4">
              {["Electronics", "Home & Garden", "Clothing", "Beauty"].map(
                item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#4d6599] hover:text-primary text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-[#0e121b] mb-6">
              Support
            </h4>
            <ul className="space-y-4">
              {[
                "Help Center",
                "Price Match Policy",
                "Privacy Policy",
                "Contact Us",
              ].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#4d6599] hover:text-primary text-sm transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#e7ebf3] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#4d6599] text-sm">
            © 2024 PriceWise Inc. All rights reserved.
          </p>

          <div className="flex gap-8">
            {["Sitemap", "Cookies", "Terms of Service"].map(item => (
              <a
                key={item}
                href="#"
                className="text-[#4d6599] hover:text-primary text-xs font-bold uppercase transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
