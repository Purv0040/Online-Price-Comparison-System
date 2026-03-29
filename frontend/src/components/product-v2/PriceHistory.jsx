import { useNavigate } from "react-router-dom";

export default function PriceHistory({ history = [], stats }) {
  const navigate = useNavigate();

  // Sort history by date to render correctly
  const sortedHistory = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  // Calculate SVG polyline points if history exists
  const generateSparkline = () => {
    if (sortedHistory.length < 2) return null;
    
    const maxPrice = Math.max(...sortedHistory.map(h => h.price));
    const minPrice = Math.min(...sortedHistory.map(h => h.price));
    const range = maxPrice - minPrice || 1;
    
    const width = 200;
    const height = 40;
    const stepX = width / (sortedHistory.length - 1);
    
    const points = sortedHistory.map((h, i) => {
      const x = i * stepX;
      const y = height - ((h.price - minPrice) / range) * height;
      return `${x},${y}`;
    }).join(" ");
    
    return (
      <svg width="100%" height="40" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600">
            monitoring
          </span>
          <h3 className="font-bold text-base">Price History</h3>
        </div>

        {stats && history.length > 0 && history[0].price === stats.lowestPrice && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
            Lowest Now
          </span>
        )}
      </div>

      {/* Dynamic Sparkline */}
      <div className="h-24 bg-slate-50 rounded-lg mb-3 flex items-center justify-center p-4 relative overflow-hidden">
        {history.length > 1 ? (
          generateSparkline()
        ) : (
          <div className="text-[10px] text-slate-400">Waiting for more data...</div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-blue-500/5 to-transparent" />
      </div>

      <div className="flex justify-between text-[10px] font-semibold text-slate-400 mb-4">
        <span>30 DAYS AGO</span>
        <span>TODAY</span>
      </div>

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Highest</span>
          <span className="font-bold">₹{stats?.highestPrice?.toLocaleString() || '---'}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Lowest</span>
          <span className="font-bold text-emerald-600">₹{stats?.lowestPrice?.toLocaleString() || '---'}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/price-history")}
        className="mt-4 w-full text-blue-600 font-bold text-sm flex items-center justify-center gap-1 hover:underline"
      >
        View Full History
        <span className="material-symbols-outlined text-base">
          arrow_forward
        </span>
      </button>
    </div>
  );
}
