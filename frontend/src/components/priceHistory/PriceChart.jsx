import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js"
import { Line } from "react-chartjs-2"

// Register chart components
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
)

export default function PriceChart({ history = [], stats = {} }) {
  const labels = history.length > 0 ? history.map(h => h.date) : ["Oct 20", "Oct 27", "Nov 03", "Nov 10", "Nov 17", "Nov 24"]
  const prices = history.length > 0 ? history.map(h => h.price) : [360, 355, 352, 349, 348, 348]

  const avg = stats?.averagePrice || (
    prices.length > 0
      ? prices.reduce((a, b) => a + b, 0) / prices.length
      : 0
  )

  const data = {
    labels,
    datasets: [
      {
        label: "Price History",
        data: prices,
        borderColor: "#2563eb",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(37, 99, 235, 0.2)");
          gradient.addColorStop(1, "rgba(37, 99, 235, 0)");
          return gradient;
        },
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#2563eb",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: "Average Price",
        data: prices.map(() => avg),
        borderColor: "#94a3b8",
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
        borderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString('en-IN')}`
        }
      }
    },
    hover: {
      mode: 'index',
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: value => `₹${value.toLocaleString('en-IN')}`,
          color: "#64748b",
          font: { weight: '600' }
        },
        grid: {
          color: "#f1f5f9"
        }
      },
      x: {
        ticks: {
          color: "#64748b",
          font: { weight: '600' }
        },
        grid: {
          display: false
        }
      }
    }
  }

  return (
    <div className="bg-white border border-[#e7ebf3] rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
        <div>
          <h3 className="text-xl font-black text-[#0e121b]">Historical Price Trend</h3>
          <p className="text-sm text-[#4d6599] font-medium mt-1">
            Visualizing price fluctuations over the tracking period
          </p>
        </div>

        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2 text-blue-600">
            <span className="w-3 h-3 bg-blue-600 rounded-full" />
            Current Price
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-3 h-3 border-2 border-slate-400 border-dashed rounded-full" />
            Rolling Average
          </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {history.length === 0 && !prices.length ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
            <span className="material-symbols-outlined text-5xl opacity-20">insights</span>
            <p className="font-bold">No history records found for this product</p>
          </div>
        ) : (
          <Line data={data} options={options} />
        )}
      </div>
    </div>
  )
}
