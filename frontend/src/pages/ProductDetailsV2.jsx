import ProductDetailsNavbarV2 from "../components/navbars/ProductDetailsNavbarV2";
import ProductDetailsFooterV2 from "../components/footers/ProductDetailsFooterV2";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/api";
import sellersData from "../data/productV2/sellers";

import Breadcrumbs from "../components/product-v2/Breadcrumbs";
import ProductGallery from "../components/product-v2/ProductGallery";
import ProductInfo from "../components/product-v2/ProductInfo";
import BestPriceBox from "../components/product-v2/BestPriceBox";
import SellerTable from "../components/product-v2/SellerTable";
import BulkOrder from "../components/product-v2/BulkOrder";
import PriceHistory from "../components/product-v2/PriceHistory";
import PromoCard from "../components/product-v2/PromoCard";
import SimilarProducts from "../components/product-v2/SimilarProducts";
import ProductDetailsInfo from "../components/product-v2/ProductDetailsInfo";

export default function ProductDetailsV2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback images if the product doesn't have enough
  const fallbackImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC0mTTDv2J2THLjKqz6D5dw738wOHhlMgCdZ0-m3GM7uxsNRQ1JiX5t5gGAIDRqTu0zO2WIPp2SPICH48Q-WekKgeBnyN5Yk6K3yNH0eBsahXjR8t7bzcQiBGUGGMQtoHeBEhApfZWUIAw4GzU3y9xJKh9iETz3Jgdv_5w3d3DZG2yBGal4Aw2Iw4y_P862XoqZe2YkiXjtEY2loJfbmgSYAE_s1IwF5bpmVI0XafIjbPA6r2IQC85OuJGn_vmXDYb1Uy-dszntUcQk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDqRiwScwpzSvhJaJIGreuLjuTO-N1r6cOH5QyX2NakuXqHSKYfqVgWn1Ttte_Y40SAbUDU5U59_PoBxvBtmdWzgymqRmSOclo9_U_ijfxTmOrCo6ooouP4qUGE9pOgUfpj0-QsZxop-hAs7NytNGNekvDiWFq87MnOA6ktEQhah9OhQGL2wcOfyLuw2P8iheBkiN8pV4gbWqw3nFkkQX6nrOdb4kMNpGKyzqi_4TEuBpUdRV9JQ3TYlp1eKNGPK9JNkAX44uRKXb3S"
  ];

  const getPriceNumber = (price) => {
    if (!price) return 0;
    if (typeof price === 'number') return price;
    return Number(String(price).replace(/[^0-9.]/g, ""));
  };

  const prices = sellersData.map((s) => getPriceNumber(s.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [selectedSeller, setSelectedSeller] = useState(sellersData[0]);

  const getStatus = (seller) => {
    if (!seller) return "average";
    const p = getPriceNumber(seller.price);
    if (p === minPrice) return "best";
    if (p === maxPrice) return "bad";
    return "average";
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // First try the trending endpoint where our new products are
        let response;
        try {
          response = await apiClient.get(`/trending/${id}`);
        } catch (err) {
          // If not found in trending, try normal products endpoint
          response = await apiClient.get(`/products/${id}`);
        }
        
        if (response.success) {
          setProduct(response.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <ProductDetailsNavbarV2 />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <ProductDetailsFooterV2 />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <ProductDetailsNavbarV2 />
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">{error || "Product not found"}</h2>
          <button onClick={() => navigate('/search')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Go back to Search</button>
        </div>
        <ProductDetailsFooterV2 />
      </>
    );
  }

  const productImages = [product.image, ...fallbackImages];

  return (
    <>
      <ProductDetailsNavbarV2 />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs dynamicProduct={product} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE – Gallery */}
          <div className="lg:col-span-5 space-y-4">
             <ProductGallery images={productImages} />
          </div>

          {/* RIGHT SIDE – Info */}
          <div className="lg:col-span-7 flex flex-col">
            <ProductInfo dynamicProduct={product} />

            {/* Push price box down to thumbnail level */}
              <div className="mt-auto">
            <BestPriceBox
              seller={selectedSeller}
              status={getStatus(selectedSeller)}
              dynamicPrice={product.price}
            />

            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

          <div className="lg:col-span-9">
            <SellerTable
              onSelectSeller={setSelectedSeller}
              selectedSeller={selectedSeller}
              dynamicPrice={product.price}
            />
            <ProductDetailsInfo />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <PriceHistory />
          </div>
        </div>

        <SimilarProducts />
      </main>

      <ProductDetailsFooterV2 />
    </>
  );
}
