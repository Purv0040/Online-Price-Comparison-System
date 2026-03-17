export default function OrderSummary() {
  return (
    <aside className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-5">
      
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-[#0e121b]">
          Order Summary
        </h3>
        <p className="text-sm text-[#6b7280] mt-1">
          15 × ThinkPad X1 Carbon
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Price rows */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-[#6b7280]">
          <span>Base Subtotal</span>
          <span className="text-[#0e121b] font-medium">$22,485.00</span>
        </div>

        <div className="flex justify-between text-[#16a34a] font-semibold">
          <span>Bulk Discount (10%)</span>
          <span>- $2,248.50</span>
        </div>

        <div className="flex justify-between text-[#6b7280]">
          <span>GST (18%)</span>
          <span className="text-[#0e121b] font-medium">$3,642.57</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Total */}
      <div>
        <div className="flex justify-between items-end">
          <span className="text-lg font-bold text-[#0e121b]">
            Total Amount
          </span>
          <span className="text-[32px] font-black text-[#2563eb]">
            $23,879.07
          </span>
        </div>
        <p className="text-[11px] text-[#9ca3af] uppercase mt-1">
          Inclusive of all taxes
        </p>
      </div>

      {/* Savings box */}
      <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#15803d] font-semibold text-sm">
          <span className="material-symbols-outlined text-base">
            savings
          </span>
          TOTAL SAVINGS
        </div>
        <span className="text-[#15803d] font-bold">$2,248.50</span>
      </div>

      {/* ✅ FIXED BUTTON (NO BLACK BORDER) */}
      <button className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2
  border-0 outline-none focus:outline-none focus:ring-0 hover:bg-[#1d4ed8] transition">
  Confirm Bulk Order
  <span className="material-symbols-outlined text-lg">shopping_cart</span>
</button>
      {/* Secondary button */}
      <button className="w-full border-2 border-[#2563eb] text-[#2563eb] py-3 rounded-lg font-bold hover:bg-[#2563eb]/5 transition">
        Request Custom Quotation
      </button>

      {/* Footer */}
      <p className="text-[11px] text-[#9ca3af] text-center flex items-center justify-center gap-1">
        <span className="material-symbols-outlined text-sm">lock</span>
        Secure B2B Transaction Powered by PriceCompare Pro
      </p>
    </aside>
  )
}
