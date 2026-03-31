export default function ProductHeader({ product, stats }) {
  if (!product) return null;

  const currentPrice = stats?.lowestPrice || 0
  const originalPrice = stats?.highestPrice || currentPrice * 1.2
  const discount = originalPrice > 0 ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Product Summary Card */}
      <div className="bg-white border border-[#e7ebf3] rounded-[2rem] p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left: Product Info */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-600/5 rounded-3xl blur-2xl group-hover:bg-blue-600/10 transition-all duration-500"></div>
              <img
                src={product.image}
                alt={product.title}
                className="relative w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                <span className="bg-blue-600/10 text-blue-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category || "Electronics"}
                </span>
                <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  In Stock
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-[#0e121b] mb-2 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <span className="text-4xl font-black text-blue-600 tracking-tight">
                  ₹{currentPrice.toLocaleString('en-IN')}
                </span>
                <div className="flex flex-col">
                  {discount > 0 && (
                    <>
                      <span className="text-sm text-slate-400 line-through font-bold">
                        ₹{Math.round(originalPrice).toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-black text-emerald-600 uppercase">
                        Save {discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Export/Action if needed */}
          <div className="hidden lg:block shrink-0">
             {/* Optional: Add share or export button here */}
          </div>
        </div>
      </div>
    </div>
  )
}
