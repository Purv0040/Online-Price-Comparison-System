import { Link, useSearchParams } from "react-router-dom"

export default function Breadcrumbs({ productTitle }) {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">

      {/* Home */}
      <Link to="/" className="hover:text-slate-900 transition-colors">
        Home
      </Link>

      {/* Category */}
      {(category || subcategory) && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            {category || "Electronics"}
          </span>
        </>
      )}

      {/* Subcategory */}
      {subcategory && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="hover:text-slate-900 cursor-pointer">
            {subcategory}
          </span>
        </>
      )}

      {/* Product Title */}
      {productTitle && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="font-medium text-slate-900 line-clamp-1 max-w-[200px]">
            {productTitle}
          </span>
        </>
      )}
    </nav>
  )
}
