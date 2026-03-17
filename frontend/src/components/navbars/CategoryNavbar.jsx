import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CategoryNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleWishlistClick = () => {
    if (isAuthenticated) {
      // ✅ User is logged in → go to wishlist
      navigate("/wishlist");
    } else {
      // ❌ Not logged in → go to login page first
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <h1 className="font-bold text-xl">PriceWise</h1>
        </NavLink>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          {/* Wishlist with login check */}
          <button
            onClick={handleWishlistClick}
            className="hover:text-blue-600 transition"
          >
            Wishlist
          </button>

        </div>
      </div>
    </nav>
  );
}
