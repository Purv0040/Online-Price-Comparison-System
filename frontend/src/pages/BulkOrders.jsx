import { useState } from "react"
import BulkLayout from "../layouts/BulkLayout"
import ProductBulkHeader from "../components/bulk/ProductBulkHeader"
import OrderConfiguration from "../components/bulk/OrderConfiguration"
import SupplierCard from "../components/bulk/SupplierCard"
import OrderSummary from "../components/bulk/OrderSummary"
import NeedHelpCard from "../components/bulk/NeedHelpCard"
import { suppliers } from "../data/suppliers"

export default function BulkOrders() {
  const [quantity, setQuantity] = useState(15)
  const product = {
    name: "ThinkPad X1 Carbon - Gen 11",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk72ru9kulmJ22TUUbBFWNK-RFrc7e11pLRCM1AwFEnlnQl-MmKo_xiC-e6_xIXWsGXdnM2Ju4VgKBHBPA0yLVNs115jJtVg4BmUZbL_evYphSeHBtfCPbrVqcDttT4Txce94LpxEB-zOP9yuZBnHijocFV8Cm72hi2HsEPJ25-4Rb2ZQFzsc8zBGoVblA7674mUJXuXZYWcR2oYlb2ComFNm5sJkr_IcOnXAoe2kfSe5h0BozehWytWHnvG1sJyMhWzzE-2tpG8QN",
    badgeText: "BULK STARTS AT 5 UNITS",
    description: 'Intel Core i7, 16GB RAM, 512GB SSD, 14" UHD+ Display',
    skuCount: "4,200+",
    verified: true,
  }

  return (
    <BulkLayout>
      <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-8">


        {/* Product Header */}
        <ProductBulkHeader product={product} />


        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <section className="lg:col-span-2 space-y-8">
            <OrderConfiguration
              quantity={quantity}
              setQuantity={setQuantity}
            />

            {/* ✅ ADDED HEADER (ONLY ADDITION) */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-black">
                Recommended Suppliers
              </h3>

              <a
                href="#"
                className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline"
              >
                View All 12 Suppliers
                <span className="material-symbols-outlined text-base">
                  chevron_right
                </span>
              </a>
            </div>

            {/* Supplier Cards (UNCHANGED) */}
            <div className="space-y-4">
              {suppliers.map((s, i) => (
                <SupplierCard
                  key={i}
                  supplier={s}
                  highlight={s.best}
                />
              ))}
            </div>
          </section>

          {/* RIGHT */}
          <div className="space-y-6">
            <OrderSummary />
            <NeedHelpCard />
          </div>

        </div>
      </div>
    </BulkLayout>
  )
}
