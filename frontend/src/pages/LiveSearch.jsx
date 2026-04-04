import { useState } from 'react';
import axios from 'axios';
import MainNavbar from '../components/navbars/MainNavbar';

export default function LiveSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({ amazon: null, flipkart: null });
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);
    setResults({ amazon: null, flipkart: null });

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const [amazonResponse, flipkartResponse] = await Promise.allSettled([
        axios.get(`${baseUrl}/api/amazon/${encodeURIComponent(query)}`),
        axios.get(`${baseUrl}/api/flipkart/${encodeURIComponent(query)}`)
      ]);

      const newResults = {
        amazon: amazonResponse.status === 'fulfilled' && amazonResponse.value.data.success ? amazonResponse.value.data.data : [],
        flipkart: flipkartResponse.status === 'fulfilled' && flipkartResponse.value.data.success ? flipkartResponse.value.data.data : []
      };

      setResults(newResults);
    } catch (error) {
      console.error("Live search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const ProductCard = ({ product, platform }) => (
    <div className="bg-white rounded-xl overflow-hidden shadow border border-slate-100 hover:shadow-lg transition-all duration-300">
      <div className="h-48 overflow-hidden bg-slate-50 flex items-center justify-center p-4">
        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-slate-800 line-clamp-2 mb-2 h-12 leading-tight" title={product.title}>
          {product.title}
        </h3>
        <div className="flex items-end space-x-2 mb-4">
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            {typeof product.price === 'string' && product.price.startsWith('₹') ? product.price : `₹${product.price}`}
          </span>
          {product.rating && product.rating !== 'N/A' && (
            <div className="flex items-center text-sm font-medium text-amber-500 mb-1">
              <span className="material-symbols-outlined text-[16px] mr-1">star</span>
              {product.rating}
            </div>
          )}
        </div>
        
        <a 
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-white font-medium transition-colors ${
            platform === 'amazon' ? 'bg-[#FF9900] hover:bg-[#e68a00]' : 'bg-[#2874F0] hover:bg-[#1a5bca]'
          }`}
        >
          View on {product.sellerName}
          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      <MainNavbar />
      <div className="min-h-screen bg-slate-50 pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto xl:mt-10 mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
              Live Scraper Compare
            </h1>
            <p className="text-lg text-slate-600">
              Fetch real-time prices directly from Amazon and Flipkart simultaneously.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch} className="relative shadow-sm rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-sm text-lg transition-shadow"
                placeholder="E.g. iPhone 15 Pro, Sony Headphones..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute inset-y-2 right-2 px-6 py-2 bg-slate-900 hover:bg-black text-white text-md font-semibold rounded-xl disabled:opacity-70 transition-colors shadow-md flex items-center"
              >
                {loading ? 'Searching...' : 'Compare'}
              </button>
            </form>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
              <p className="text-xl font-medium text-slate-700">Connecting to Scrapers...</p>
              <p className="text-slate-500 mt-2 text-center max-w-md">
                We are actively running Apify actors for Amazon and Flipkart in parallel. This may take a moment.
              </p>
            </div>
          )}

          {!loading && searched && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Amazon Column */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 object-contain" />
                  <h2 className="text-2xl font-bold text-slate-800">Results</h2>
                </div>
                
                {results.amazon?.length > 0 ? (
                  <div className="space-y-6">
                    {results.amazon.map((product, idx) => (
                      <ProductCard key={`amz-${idx}`} product={product} platform="amazon" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                    <p>No products found or scraper timed out.</p>
                  </div>
                )}
              </div>

              {/* Flipkart Column */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                  <img src="https://upload.wikimedia.org/wikipedia/en/7/7a/Flipkart_logo.svg" alt="Flipkart" className="h-8 object-contain" />
                  <h2 className="text-2xl font-bold text-slate-800">Results</h2>
                </div>

                {results.flipkart?.length > 0 ? (
                  <div className="space-y-6">
                    {results.flipkart.map((product, idx) => (
                      <ProductCard key={`flp-${idx}`} product={product} platform="flipkart" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                    <p>No products found or scraper timed out.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
