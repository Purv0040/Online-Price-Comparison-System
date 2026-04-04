import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PriceHistoryNavbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const avatarStorageKey = `profileAvatar:${user?.email || "guest"}`;
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0D8ABC&color=fff&size=128&bold=true`;
  const avatarUrl = localStorage.getItem(avatarStorageKey) || fallbackAvatar;

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
              onClick={() => navigate("/profile")}
              className="size-9 rounded-full bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url('${avatarUrl}')`,
              }}
              title="Profile"
            />
        </nav>

      </div>
    </header>
  );
}
