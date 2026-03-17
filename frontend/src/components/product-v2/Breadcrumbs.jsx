import { Link, useSearchParams } from "react-router-dom"

export default function Breadcrumbs() {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category")
  const subcategory = searchParams.get("subcategory")

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">

      {/* Home */}
      <Link to="/" className="hover:text-slate-900">
        Home
      </Link>

      {/* Category */}
      {category && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="hover:text-slate-900">
            {category}
          </span>
        </>
      )}

      {/* Subcategory */}
      {subcategory && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="font-medium text-slate-900">
            {subcategory}
          </span>
        </>
      )}
    </nav>
  )
}
