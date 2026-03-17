import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
export default function PriceAlerts() {
    const [alerts, setAlerts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("priceAlerts")) || []
    setAlerts(saved)
  }, [])

 

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="p-5 flex items-center justify-between">
        <h3 className="font-bold text-slate-900">Active Price Alerts</h3>
        <button className="text-sm font-medium text-primary">Manage All</button>
      </div>

      {alerts.map((item, i) => (
        <div
          key={i}
          className={`p-5 flex items-center justify-between ${
            i === 1 ? "bg-slate-50" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className="size-16 rounded-lg bg-slate-100 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div>
              <h4 className="font-semibold text-slate-900">{item.name}</h4>
              <p className="text-sm text-slate-500 mt-1">
                Current:{" "}
                <span className="font-medium text-slate-900">
                  {item.current}
                </span>
                <span className="mx-2 text-slate-300">|</span>
                Target:{" "}
                <span className="font-medium text-primary">
                  {item.target}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {item.dropping && (
              <span className="px-2 py-0.5 text-xs font-bold text-emerald-600 bg-emerald-100 rounded">
                DROPPING
              </span>
            )}

            {/* Toggle (ON = BLUE) */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked={item.active}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-slate-200 peer-checked:bg-blue-600 rounded-full relative transition-colors after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:h-5 after:w-5 after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>
      ))}

      <div className="p-4 bg-slate-50 text-center">
        <button
  onClick={() => navigate("/search")}
  className="text-sm font-semibold text-primary flex items-center justify-center gap-2 mx-auto"
>

          <span className="material-symbols-outlined text-lg">add_circle</span>
          Track New Product
        </button>
      </div>
    </div>
  )
}
