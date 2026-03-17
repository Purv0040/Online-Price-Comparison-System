import ProductCardV2 from "./ProductCardV2"
import products from "../../data/searchV2/products"

export default function ProductGridV2() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
      {products.map((product, index) => (
        <ProductCardV2 key={index} product={product} />
      ))}
    </div>
  )
}
