export default function SearchFooter() {
  return (
    <footer className="bg-white border-t border-[#e7ebf3] py-10">
      <div className="max-w-[1440px] mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Logo */}
         {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h1 className="font-bold text-xl">PriceWise</h1>
        </div>

        {/* Center: Copyright */}
        <p className="text-sm text-[#4d6599] text-center">
          © 2024 PriceWise Inc. All rights reserved.
        </p>

        {/* Right: Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-[#4d6599] hover:text-primary transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-[#4d6599] hover:text-primary transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-[#4d6599] hover:text-primary transition-colors"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  )
}
