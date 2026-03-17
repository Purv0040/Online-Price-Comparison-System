import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register chart components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

export default function PriceChart({ history = [] }) {
  // history example:
  // [
  //   { date: "Oct 20", price: 360 },
  //   { date: "Oct 27", price: 355 },
  //   { date: "Nov 03", price: 352 },
  //   { date: "Nov 10", price: 349 },
  //   { date: "Nov 17", price: 348 },
  //   { date: "Nov 24", price: 348 }
  // ]

  const labels = history.map(h => h.date)
  const prices = history.map(h => h.price)

  const avg =
    prices.length > 0
      ? prices.reduce((a, b) => a + b, 0) / prices.length
      : 0

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: "#2563eb", // blue-600
        backgroundColor: "rgba(37,99,235,0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#2563eb",
        fill: true
      },
      {
        label: "Average",
        data: prices.map(() => avg),
        borderColor: "#cbd5e1", // slate-300
        borderDash: [6, 6],
        pointRadius: 0,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        ticks: {
          callback: value => `$${value}`
        },
        grid: {
          color: "#eef2ff"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="bg-white border border-[#e7ebf3] rounded-xl p-8 shadow-sm h-[480px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold">Historical Trend</h3>
          <p className="text-sm text-[#4d6599]">
            Price volatility over the last 30 days
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#4d6599]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            Price
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-slate-300 rounded-full" />
            Avg.
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64 w-full">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-sm">
            No price history available
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  )
}
