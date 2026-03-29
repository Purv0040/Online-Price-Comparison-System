import { Link, useSearchParams } from "react-router-dom"

export default function Breadcrumbs({ dynamicProduct }) {
  const [searchParams] = useSearchParams()

  const category = searchParams.get("category") || dynamicProduct?.category || "Electronics"
  const subcategory = searchParams.get("subcategory") || dynamicProduct?.subcategory

  return (
    <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">

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
          <span className="hover:text-slate-900 capitalize">
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
          <span className="hover:text-slate-900 capitalize">
            {subcategory}
          </span>
        </>
      )}

      {/* Product Name */}
      {dynamicProduct && (
        <>
          <span className="material-symbols-outlined text-xs">
            chevron_right
          </span>
          <span className="font-medium text-slate-900 truncate max-w-[300px]" title={dynamicProduct.name}>
            {dynamicProduct.name}
          </span>
        </>
      )}
    </nav>
  )
}
