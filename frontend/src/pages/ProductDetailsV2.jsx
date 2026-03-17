import ProductDetailsNavbarV2 from "../components/navbars/ProductDetailsNavbarV2";
import ProductDetailsFooterV2 from "../components/footers/ProductDetailsFooterV2";
import { useState } from "react";
import sellers from "../data/productV2/sellers";

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
    const productImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC0mTTDv2J2THLjKqz6D5dw738wOHhlMgCdZ0-m3GM7uxsNRQ1JiX5t5gGAIDRqTu0zO2WIPp2SPICH48Q-WekKgeBnyN5Yk6K3yNH0eBsahXjR8t7bzcQiBGUGGMQtoHeBEhApfZWUIAw4GzU3y9xJKh9iETz3Jgdv_5w3d3DZG2yBGal4Aw2Iw4y_P862XoqZe2YkiXjtEY2loJfbmgSYAE_s1IwF5bpmVI0XafIjbPA6r2IQC85OuJGn_vmXDYb1Uy-dszntUcQk",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDqRiwScwpzSvhJaJIGreuLjuTO-N1r6cOH5QyX2NakuXqHSKYfqVgWn1Ttte_Y40SAbUDU5U59_PoBxvBtmdWzgymqRmSOclo9_U_ijfxTmOrCo6ooouP4qUGE9pOgUfpj0-QsZxop-hAs7NytNGNekvDiWFq87MnOA6ktEQhah9OhQGL2wcOfyLuw2P8iheBkiN8pV4gbWqw3nFkkQX6nrOdb4kMNpGKyzqi_4TEuBpUdRV9JQ3TYlp1eKNGPK9JNkAX44uRKXb3S",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC4Cmf0HzF-23lK0KrQfGsLHp5qdeI6uPLv4_NtFfV_zS46iGjwxxD6kcoTsHS__Ho7DvKohrG6FVp7Rc5hEFkEhfiqOkHvhKWBZfMrESdmLEGxmXOmGFqf6khFR4qg-GLLrboKiWCSJtwoGVKl_SEjUznlCSgLHJUUrteKtNoiZYBYoC9UVbo__S3n-nH9d_0Qi86S7KdHkhd97rq4Gxh_N045Mke63xuUV0hiGae4aYKcpie3DU4NJ_XzhKyZ__Lh6C3ysH8V0vlq",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDVuIFsumxQc5PFXa1FStv13tiAcyGD4nkz3DrOAtg9ofwFIYMZo7xwjVxq67FP0-ZRto8BWW4Ku0IX4LTKt9gP_W8vV-vTtvKQgy28mRfUFJN9OF-K8BK8fWSvM6IXXmmAHPVGl3AgVPyN6DYT8W7mS6QAYi2fTLGXHq3rfOAr7rQLt5hBfkAlfQCiXTW8HdsRalpNA1tLlMNolutm_tIGY4_La7F-CUZ5u4oZswQkzYUCq7pFBYBKh02_D3qpJiGUMorqfvKaaAIy"
  ]
 
  const getPriceNumber = (price) => Number(price.replace(/[^0-9.]/g, ""));

  const prices = sellers.map((s) => getPriceNumber(s.price));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [selectedSeller, setSelectedSeller] = useState(sellers[0]);

  const getStatus = (seller) => {
    if (!seller) return "average";
    const p = getPriceNumber(seller.price);
    if (p === minPrice) return "best";
    if (p === maxPrice) return "bad";
    return "average";
  };


    return (
      <>
        <ProductDetailsNavbarV2 />

        <main className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT SIDE – Gallery */}
            <div className="lg:col-span-5 space-y-4">
               <ProductGallery images={productImages} />
            </div>

            {/* RIGHT SIDE – Info */}
            <div className="lg:col-span-7 flex flex-col">
              <ProductInfo />

              {/* Push price box down to thumbnail level */}
                <div className="mt-auto">
              <BestPriceBox
                seller={selectedSeller}
                status={getStatus(selectedSeller)}
              />

              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">

            <div className="lg:col-span-9">
              <SellerTable
        onSelectSeller={setSelectedSeller}
        selectedSeller={selectedSeller}
      />
              <ProductDetailsInfo />
            </div>

            <div className="lg:col-span-3 space-y-6">
              {/*<BulkOrder />*/}
              
              <PriceHistory />
              {/*<PromoCard /> */}
            </div>
          </div>



          <SimilarProducts />
        </main>

        <ProductDetailsFooterV2 />
      </>
    );
  }
