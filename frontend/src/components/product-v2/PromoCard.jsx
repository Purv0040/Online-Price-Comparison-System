export default function PromoCard() {
  return (
    <div
      className="relative rounded-xl p-6 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)"
      }}
    >
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest opacity-90">
          PRO MEMBER DEAL
        </p>

        <h4 className="text-lg font-bold mt-2">
          Get an extra 5% off!
        </h4>

        <p className="text-sm mt-2 opacity-90 leading-relaxed">
          Join PriceWise Pro to unlock exclusive coupons and cashback.
        </p>

        <button className="mt-4 bg-white text-[#2563EB] text-xs font-black px-5 py-2.5 rounded-lg uppercase">
          Join Now
        </button>
      </div>

      {/* decorative watermark */}
      <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-white/10 text-[120px] select-none">
        stars
      </span>
    </div>
  )
}
