export default function SavingsCard() {
  return (
    <div className="relative rounded-xl p-6 shadow-lg overflow-hidden">
      {/* Blurred background */}
     <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-xl"></div>


      {/* Content */}
      <div className="relative text-white">
        <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-white">
            savings
          </span>
        </div>

        <h4 className="font-bold text-xl">Total Savings</h4>
        <p className="text-4xl font-extrabold mt-2">$1,245.80</p>

        <p className="text-sm mt-4 leading-relaxed">
          You've saved over $1,200 by using PriceCheck alerts this year.
          Keep tracking to save more!
        </p>

        <button className="w-full mt-6 py-3 bg-white text-blue-600 font-bold rounded-lg">
          Upgrade to Premium
        </button>
      </div>
    </div>
  )
}
