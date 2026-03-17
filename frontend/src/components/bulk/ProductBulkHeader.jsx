export default function ProductBulkHeader({ product }) {
  if (!product) return null

  const {
    name,
    image,
    badgeText,
    description,
    skuCount,
    verified,
  } = product

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-start gap-6">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-contain"
      />

      {/* Product Info */}
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl font-bold text-[#0e121b]">
            {name}
          </h2>

          {/* Badge */}
          {badgeText && (
            <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full tracking-wide">
              {badgeText}
            </span>
          )}
        </div>

        <p className="text-[#4d6599]">
          {description}
        </p>

        <div className="flex items-center gap-6 text-sm text-[#6b7280]">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-base">
              inventory_2
            </span>
            SKUs Available: {skuCount}
          </span>

          {verified && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">
                verified
              </span>
              Verified Sellers
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
