import PriceHistoryNavbar from "../components/navbars/PriceHistoryNavbar"
import PriceHistoryFooter from "../components/footers/PriceHistoryFooter"
import ProductHeader from "../components/priceHistory/ProductHeader"
import RangeSelector from "../components/priceHistory/RangeSelector"
import PriceChart from "../components/priceHistory/PriceChart"
import InsightsSidebar from "../components/priceHistory/InsightsSidebar"
import sellers from "../data/productV2/sellers"

export default function PriceHistory({ seller }) {
  // ✅ Use selected seller if provided, otherwise fallback to first seller
  const activeSeller = seller || sellers[0]

  const history = activeSeller?.history || [
    { date: "Oct 20", price: 360 },
    { date: "Oct 27", price: 355 },
    { date: "Nov 03", price: 352 },
    { date: "Nov 10", price: 349 },
    { date: "Nov 17", price: 348 },
    { date: "Nov 24", price: 348 }
  ]

  
  return (
    <>
      <PriceHistoryNavbar />

      <main className="max-w-[1280px] mx-auto px-6 py-8">
        <ProductHeader product={activeSeller.product} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-3 space-y-6">
            <RangeSelector />
            <PriceChart history={history} />
          </div>

          {/* ✅ PASS ACTIVE SELLER */}
          <InsightsSidebar seller={activeSeller} />
        </div>
      </main>

      <PriceHistoryFooter />
    </>
  )
}
