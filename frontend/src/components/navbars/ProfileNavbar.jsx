import { useNavigate } from "react-router-dom";

export default function ProfileNavbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center">
        
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-700 font-semibold hover:text-blue-600 transition"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>

      </div>
    </header>
  );
}
