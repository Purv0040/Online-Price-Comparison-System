import ProductDetailsNavbarV2 from "../components/navbars/ProductDetailsNavbarV2";
import ProductDetailsFooterV2 from "../components/footers/ProductDetailsFooterV2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../services/api";

import Breadcrumbs from "../components/product-v2/Breadcrumbs";
import ProductGallery from "../components/product-v2/ProductGallery";
import ProductInfo from "../components/product-v2/ProductInfo";
import BestPriceBox from "../components/product-v2/BestPriceBox";
import SellerTable from "../components/product-v2/SellerTable";
import PriceHistory from "../components/product-v2/PriceHistory";
import SimilarProducts from "../components/product-v2/SimilarProducts";
import ProductDetailsInfo from "../components/product-v2/ProductDetailsInfo";

const normalizeCategoryLabel = (category) => {
  const value = String(category || "General").trim();
  return value.toUpperCase();
};

export default function ProductDetailsV2() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [prices, setPrices] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductDetails(id);
        if (response.success && response.data.prices.length > 0) {
          const { product, prices, priceHistory, stats } = response.data;
          setProduct(product);
          setPrices(prices);
          setPriceHistory(priceHistory);
          setStats(stats);
          
          // Explicitly find the best (lowest price) seller as default
          const bestSeller = prices.reduce((prev, curr) => 
            (prev.price < curr.price) ? prev : curr
          );
          setSelectedSeller(bestSeller);
        } else if (response.success) {
           setProduct(response.data.product);
           setLoading(false);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!product?._id) return;

    try {
      const storageKey = "recentlyViewedProducts";
      const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const nextItem = {
        _id: product._id,
        name: product.title || product.name || "Product",
        image: (product.images && product.images[0]) || product.image || "",
        price: stats?.lowestPrice || stats?.averagePrice || 0,
        category: product.category || "General",
        label: normalizeCategoryLabel(product.category),
        brand: product.brand || "PriceWise",
        stores: stats?.availableOn ? `${stats.availableOn} Stores Compared` : "Recently Viewed",
        viewedAt: Date.now(),
      };

      const deduped = existing.filter((item) => String(item._id) !== String(product._id));
      const updated = [nextItem, ...deduped].slice(0, 12);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to store recently viewed product:", err);
    }
  }, [product, stats]);

  const getStatus = (seller) => {
    if (!seller || !prices.length) return "average";
    if (seller.price === stats.lowestPrice) return "best";
    if (seller.price === stats.highestPrice) return "bad";
    return "average";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium italic">Loading product excellence...</p>
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
            className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle product images (ensure it's an array for ProductGallery)
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  // Map backend seller data to BestPriceBox format
  const bestPriceSeller = selectedSeller ? {
    name: selectedSeller.seller?.name || "Unknown",
    price: `₹${selectedSeller.price.toLocaleString('en-IN')}`,
    discount: selectedSeller.discount > 0 ? `-${selectedSeller.discount}%` : "0%",
  } : null;

  return (
    <>
      <ProductDetailsNavbarV2 />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE – Gallery */}
          <div className="lg:col-span-5">
             <ProductGallery images={galleryImages} />
          </div>

          {/* RIGHT SIDE – Info */}
          <div className="lg:col-span-7 flex flex-col">
            <ProductInfo product={product} />

            <div className="mt-auto">
              <BestPriceBox
                seller={bestPriceSeller}
                status={getStatus(selectedSeller)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
          <div className="lg:col-span-9">
            <SellerTable
              sellers={prices}
              onSelectSeller={setSelectedSeller}
              selectedSeller={selectedSeller}
            />
            <ProductDetailsInfo product={product} />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <PriceHistory productId={product._id} history={priceHistory} stats={stats} />
          </div>
        </div>

        <SimilarProducts category={product.category} excludeId={product._id} />
      </main>

      <ProductDetailsFooterV2 />
    </>
  );
}
