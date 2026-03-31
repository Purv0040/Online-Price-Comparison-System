import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PriceHistoryNavbar from "../components/navbars/PriceHistoryNavbar"
import PriceHistoryFooter from "../components/footers/PriceHistoryFooter"
import ProductHeader from "../components/priceHistory/ProductHeader"
import Breadcrumbs from "../components/product-v2/Breadcrumbs"
import RangeSelector from "../components/priceHistory/RangeSelector"
import PriceChart from "../components/priceHistory/PriceChart"
import InsightsSidebar from "../components/priceHistory/InsightsSidebar"
import { getProductDetails } from "../services/api";

export default function PriceHistory() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [stats, setStats] = useState({});
  const [activeSeller, setActiveSeller] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductDetails(id);
        if (response.success) {
          const { product, prices, priceHistory, stats } = response.data;
          setProduct(product);
          setPriceHistory(priceHistory);
          setStats(stats);
          
          // Current best seller or first one
          if (prices && prices.length > 0) {
            const bestSeller = prices.reduce((prev, curr) => 
              (prev.price < curr.price) ? prev : curr
            );
            setActiveSeller({
              ...bestSeller,
              product // Attach product info for components that expect it
            });
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching price history:", err);
        setError("Failed to load price history. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-medium italic">Analyzing price trends...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center max-w-md">
          <span className="material-symbols-outlined text-red-500 text-6xl mb-4">error</span>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h2>
          <p className="text-slate-600 mb-6">{error || "Product not found"}</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-[#fcfdff] flex flex-col">
      <PriceHistoryNavbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-10 py-8">
        <Breadcrumbs product={product} type="history" />
        <ProductHeader product={product} stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-8">
            <RangeSelector />
            <PriceChart history={priceHistory} stats={stats} />
          </div>

          <aside className="space-y-6">
            <InsightsSidebar seller={activeSeller} stats={stats} />
          </aside>
        </div>
      </main>

      <PriceHistoryFooter />
    </div>
  )
}
