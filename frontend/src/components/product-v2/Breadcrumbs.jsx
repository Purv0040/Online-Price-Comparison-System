import { Link, useLocation } from "react-router-dom"

export default function Breadcrumbs({ product, type = "product", query = "" }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Possible sources: search, category, or generic
  const from = searchParams.get("from") || (location.pathname.includes("/search") ? "search" : "");
  const urlQuery = searchParams.get("q") || query;

  return (
    <nav className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.1em] mb-8 bg-white/50 backdrop-blur-sm self-start px-4 py-2 rounded-full border border-slate-100 flex-wrap">
      {/* Home */}
      <Link 
        to="/" 
        className="text-slate-400 hover:text-blue-600 transition-all flex items-center"
      >
        Home
      </Link>

      <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
        chevron_right
      </span>

      {/* Path Logic */}
      {type === "search" ? (
        <>
          <span className="text-slate-400">Search Results</span>
          <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
            chevron_right
          </span>
          <span className="text-blue-600">"{urlQuery}"</span>
        </>
      ) : from === "search" ? (
        <>
          <Link to={`/search?q=${urlQuery}`} className="text-slate-400 hover:text-blue-600 transition-colors">
            Search: {urlQuery}
          </Link>
          <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
            chevron_right
          </span>
          <span className={type === "history" ? "text-slate-400" : "text-blue-600"}>
            {product?.title || "Product"}
          </span>
        </>
      ) : (
        <>
          <Link to="/category" className="text-slate-400 hover:text-blue-600 transition-all">
            Categories
          </Link>
          
          {(product?.category || product?.title) && (
            <>
              <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
                chevron_right
              </span>
              <Link 
                to={`/category/${product?.category?.toLowerCase() || 'all'}`} 
                className="text-slate-400 hover:text-blue-600 transition-all"
              >
                {product?.category || "General"}
              </Link>
            </>
          )}

          {product?.title && (
            <>
              <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
                chevron_right
              </span>
              <span className={type === "history" ? "text-slate-400" : "text-blue-600"}>
                {product.title}
              </span>
            </>
          )}
        </>
      )}

      {type === "history" && (
        <>
          <span className="material-symbols-outlined text-slate-300 text-[12px] opacity-50">
            chevron_right
          </span>
          <span className="text-blue-600">Price History</span>
        </>
      )}
    </nav>
  )
}
