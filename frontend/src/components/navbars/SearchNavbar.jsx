import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function SearchNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const avatarStorageKey = `profileAvatar:${user?.email || "guest"}`;
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.name || "User"
  )}&background=0D8ABC&color=fff&size=128&bold=true`;
  const avatarUrl = localStorage.getItem(avatarStorageKey) || fallbackAvatar;

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
    setSearch("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
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
          <form onSubmit={handleSearch} className="relative flex items-center w-full h-10">
            <div className="absolute left-3 text-[#4d6599]">
              <span className="material-symbols-outlined text-xl">search</span>
            </div>

            <input
              className="w-full h-full pl-10 pr-20 rounded-lg border-none bg-[#e7ebf3] text-[#0e121b] placeholder:text-[#4d6599] focus:ring-2 focus:ring-primary transition-all text-sm"
              placeholder="Search for products, brands or stores..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleKeyPress}
            />

            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 text-[#4d6599] hover:text-red-500"
              >
                <span className="material-symbols-outlined text-xl">
                  cancel
                </span>
              </button>
            )}

            <button
              type="submit"
              className="absolute right-2 bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-6 mr-4">
            <button
              onClick={() => navigate("/category")}
              className="text-sm font-medium text-[#0e121b] hover:text-primary transition-colors"
            >
              Categories
            </button>
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
              backgroundImage: `url('${avatarUrl}')`,
            }}
          />
        </div>
      </div>
    </header>
  );
}
