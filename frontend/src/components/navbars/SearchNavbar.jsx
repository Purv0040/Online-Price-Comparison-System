import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SearchNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [search, setSearch] = useState("Smartphones");
  const [showMenu, setShowMenu] = useState(false);

  const handleWishlistClick = () => {
    if (isAuthenticated) navigate("/wishlist");
    else navigate("/login");
  };

  const handleProfileClick = () => {
    if (isAuthenticated) navigate("/profile");
    else navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowMenu(false);
  };

  const handleClearSearch = () => {
    setSearch(""); // 🔥 clears the search bar
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e7ebf3] px-4 lg:px-10 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h1 className="font-bold text-xl">PriceWise</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <label className="relative flex items-center w-full h-10">
            <div className="absolute left-3 text-[#4d6599]">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>

            <input
              className="w-full h-full pl-10 pr-10 rounded-lg border-none bg-[#e7ebf3] text-[#0e121b] placeholder:text-[#4d6599] focus:ring-2 focus:ring-primary transition-all text-sm"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 text-[#4d6599] hover:text-red-500"
              >
                <span className="material-symbols-outlined text-xl">
                  cancel
                </span>
              </button>
            )}
          </label>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <button
              onClick={handleWishlistClick}
              className="text-sm font-medium text-[#0e121b] hover:text-primary transition-colors"
            >
              Wishlist
            </button>

           
          </div>

          {/* Profile */}
          

          {/* Avatar */}
          <div
            onClick={handleProfileClick}
            className="size-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm cursor-pointer"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_h4JqOPIynNt1bTl2N1VNr2-M66I4wMmQUGMD5I7Tm3EwZN8TxxjwKbyclMaCVGncLEcbqm-DTcfrvVCqqc-5t7yxqK39feV1UxfkKDmBsTnF9oB_ZBYTLfjpoHw-WH0Ka83QQ9x4dz8hCNQMV5ZQa6yFIfQPf9NppAiCAyw2M88A9pC7wF_ulVveVUXcoeUoB1udNQKjl35xuh_TLVLtKqFuI24S7m_NwOaqZL98I7Lq4eNLth61fQ3ALCW7ylF7-B_R34Df37v5')",
            }}
          />
        </div>
      </div>
    </header>
  );
}
