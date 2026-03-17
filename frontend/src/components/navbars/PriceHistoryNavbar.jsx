import { useNavigate } from "react-router-dom";

export default function PriceHistoryNavbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e7ebf3]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-lg">
                trending_up
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight">
              PriceTracker
            </h1>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-[#eef2f7] rounded-lg px-3 py-1.5 w-64">
            <span className="material-symbols-outlined text-sm text-[#64748b]">
              search
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent border-none outline-none focus:ring-0 text-sm w-full placeholder:text-[#64748b]"
            />
          </div>
        </div>

        {/* RIGHT */}
        <nav className="flex items-center gap-6">
          <span
            onClick={() => navigate("/dashboard")}
            className="text-sm text-[#0e121b] cursor-pointer hover:text-[#2563eb]"
          >
            Dashboard
          </span>

          <span
            onClick={() => navigate("/price-history")}
            className="text-sm font-semibold text-[#2563eb] h-16 flex items-center border-b-2 border-[#2563eb] cursor-pointer"
          >
            Price History
          </span>

         

          {/* Profile / Avatar */}
         <div
              onClick={() => navigate("/profile ")}
              className="size-9 rounded-full bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw36RtlQVQcBrZ1A85hP2aQAVkiUhT1mf1tsmWZae2fIDceHWEayzfAVwIvadfBW0knp4yPd0HhCKkJN0ACPnqKS3liUQZnK2t0Cvs1m6HfYFCGg6JKgYbtBLC3fDFt6Jtw-sjlIPSmQcbz_-0r3IDWYTXjoo7h-hUeTQolsdEcJ6xGcVsttHisuDQni7urqDcLRj-fWgmpIka9Iq7wgr35CNm3IquhB6LSjfYbPlyXk3lN5yxTDsNFM2SrDav59UkM0Bb3ig0GD3M')",
              }}
              title="Profile"
            />
        </nav>

      </div>
    </header>
  );
}
