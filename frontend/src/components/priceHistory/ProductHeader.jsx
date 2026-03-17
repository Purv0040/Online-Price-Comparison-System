import { useNavigate } from "react-router-dom"

export default function ProductHeader() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/search")}
          className="flex items-center gap-1 text-slate-500 text-sm"
        >
          <span className="material-symbols-outlined text-base">
            chevron_left
          </span>
          Back to Comparison
        </button>

        
      </div>

      {/* Product header card */}
      <div className="bg-white border border-[#e7ebf3] rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-6">
            {/* ✅ Correct Image URL */}
            <img
              src="/images/products/sony-wh-1000xm5.png"
              alt="Sony WH-1000XM5 Wireless Headphones"
              className="size-24 rounded-xl object-cover bg-slate-100"
            />

            <div>
              <div className="flex gap-2 mb-1">
                {/* ✅ Correct category */}
                <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  ELECTRONICS
                </span>

                <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded">
                  IN STOCK
                </span>
              </div>

              <h2 className="text-2xl font-bold">
                Sony WH-1000XM5 Wireless Headphones
              </h2>

              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-black text-primary">
                  $348.00
                </span>
                <span className="line-through text-slate-400">
                  $399.99
                </span>
                <span className="text-green-600 font-medium">
                  Save 13%
                </span>
              </div>
            </div>
          </div>

          {/* Right – Price Alert */}
         
        </div>
      </div>
    </div>
  )
}
