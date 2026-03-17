export default function NeedHelpCard() {
  return (
    <div className="relative bg-blue-600 rounded-xl p-6 text-white shadow-lg overflow-hidden">

      {/* Background Icon */}
      <span className="material-symbols-outlined absolute bottom-4 right-4 text-white/15 text-[96px]">
        business_center
      </span>

      {/* Content */}
      <div className="relative z-10">
        <h4 className="flex items-center gap-2 font-bold text-lg mb-2">
          <span className="material-symbols-outlined">
            support_agent
          </span>
          Need Help?
        </h4>

        <p className="text-sm text-blue-100 mb-5 leading-relaxed max-w-sm">
          Our dedicated account managers can assist with customs, logistics,
          and tax exemptions for large orders.
        </p>

        <button className="bg-white/20 hover:bg-white/30 transition px-5 py-2.5 rounded-lg text-sm font-bold">
          Talk to an Expert
        </button>
      </div>

    </div>
  )
}
