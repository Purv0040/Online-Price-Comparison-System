export default function PricingTiers() {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      {[
        ["1-9 units", "$1,499", "0% Discount"],
        ["10-19 units", "$1,349", "10% Discount", true],
        ["20-49 units", "$1,274", "15% Discount"],
        ["50+ units", "$1,199", "20% Discount"],
      ].map(([range, price, discount, active], i) => (
        <div
          key={i}
          className={`relative p-4 rounded-xl border text-center ${
            active
              ? "border-primary bg-primary/5"
              : "border-gray-200 bg-white"
          }`}
        >
          {active && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
              CURRENT
            </span>
          )}

          <p className="text-xs font-semibold text-gray-500">{range}</p>
          <p
            className={`text-lg font-bold mt-1 ${
              active ? "text-primary" : ""
            }`}
          >
            {price}
          </p>
          <p className="text-xs text-gray-400 mt-1">{discount}</p>
        </div>
      ))}
    </div>
  )
}
