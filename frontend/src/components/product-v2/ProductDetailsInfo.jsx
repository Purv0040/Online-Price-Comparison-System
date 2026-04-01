const getCategoryType = (product) => {
  const value = String(product?.category || "").toLowerCase()
  const title = String(product?.title || product?.name || "").toLowerCase()

  if (value.includes("fashion") || /shoe|sneaker|shirt|jeans|watch/.test(title)) return "fashion"
  if (value.includes("home") || value.includes("kitchen")) return "home"
  if (value.includes("beauty")) return "beauty"
  if (value.includes("sports")) return "sports"
  if (value.includes("toy") || value.includes("baby") || /baby|stroller|walker|feeding bottle|blocks|kids/.test(title)) return "toys-baby"
  if (value.includes("automotive") || /car|tyre|tire|helmet|battery|engine oil/.test(title)) return "automotive"
  if (value.includes("grocery") || value.includes("groceries") || /atta|salt|oil|noodles|coffee|rice|flour/.test(title)) return "grocery"
  if (value.includes("book") || /book|novel|author/.test(title)) return "books"
  if (value.includes("other")) return "others"
  return "electronics"
}

const getBoxItems = (product) => {
  const title = product?.title || product?.name || "Product"
  const categoryType = getCategoryType(product)

  if (categoryType === "fashion") {
    return [
      title,
      "Brand tags and care instructions",
      "Protective packaging",
      "Style and fit guide",
    ]
  }

  if (categoryType === "home") {
    return [
      title,
      "User manual",
      "Installation accessories",
      "Warranty card",
    ]
  }

  if (categoryType === "beauty") {
    return [
      title,
      "Safety and usage instructions",
      "Ingredient information",
      "Original sealed packaging",
    ]
  }

  if (categoryType === "sports") {
    return [
      title,
      "Quick start guide",
      "Care and maintenance card",
      "Official warranty slip",
    ]
  }

  if (categoryType === "toys-baby") {
    return [
      title,
      "Age and safety guidance",
      "Usage and care instructions",
      "Warranty and customer support details",
    ]
  }

  if (categoryType === "automotive") {
    return [
      title,
      "Installation and fitment guide",
      "Safety and usage instructions",
      "Warranty and service information",
    ]
  }

  if (categoryType === "grocery") {
    return [
      title,
      "Ingredients and nutrition information",
      "Net quantity and packaging details",
      "Expiry and storage instructions",
    ]
  }

  if (categoryType === "others") {
    return [
      title,
      "Product overview and usage guide",
      "Care and maintenance instructions",
      "Warranty and support information",
    ]
  }

  if (categoryType === "books") {
    return [
      title,
      "Author and publisher information",
      "ISBN and edition details",
      "Original print packaging",
    ]
  }

  return [
    title,
    "Quick start guide",
    "Charging/connection accessories",
    "Warranty and support card",
  ]
}

const getDescription = (product) => {
  const title = product?.title || product?.name || "This product"
  const brand = product?.brand || "the brand"
  const categoryType = getCategoryType(product)

  if (categoryType === "fashion") {
    return `${title} by ${brand} is designed for daily comfort and modern style. It uses quality materials and a clean finish that pairs well with casual and smart outfits. Built for long wear, this product balances looks, durability, and value.`
  }

  if (categoryType === "home") {
    return `${title} from ${brand} is crafted to improve everyday convenience at home. The product focuses on practical design, dependable performance, and easy setup, making it suitable for regular use in modern households.`
  }

  if (categoryType === "beauty") {
    return `${title} by ${brand} is formulated to deliver reliable daily care with a user-friendly routine. It is designed for consistent results, smooth application, and comfortable usage across different skin and lifestyle needs.`
  }

  if (categoryType === "sports") {
    return `${title} from ${brand} is built for active performance with a focus on comfort and control. It supports daily training needs through balanced construction, durable materials, and dependable long-term usability.`
  }

  if (categoryType === "toys-baby") {
    return `${title} by ${brand} is designed for safe and comfortable everyday use for babies and kids. It focuses on child-friendly materials, practical design, and dependable quality to support learning, care, and daily convenience for parents.`
  }

  if (categoryType === "automotive") {
    return `${title} by ${brand} is built for reliable on-road performance and long-term durability. It is designed to support daily driving needs with dependable quality, practical fitment, and consistent efficiency for automotive use.`
  }

  if (categoryType === "grocery") {
    return `${title} from ${brand} is selected for daily household use with dependable quality and freshness. It is packed for convenient storage, easy usage, and consistent taste or performance, making it a practical essential for everyday needs.`
  }

  if (categoryType === "others") {
    return `${title} by ${brand} is a practical everyday product designed for reliable performance and convenience. It balances quality, usability, and value, making it suitable for regular personal, home, or utility use.`
  }

  if (categoryType === "books") {
    return `${title} by ${brand} offers an engaging reading experience with clear print quality and durable binding. It is curated for meaningful learning, storytelling, and repeated reading, making it a valuable addition to personal and family libraries.`
  }

  return `${title} by ${brand} is engineered for dependable performance and a premium user experience. It combines modern design, practical features, and durable build quality, making it a strong choice for everyday use.`
}

export default function ProductDetailsInfo({ product }) {
  const boxItems = getBoxItems(product)
  const description = getDescription(product)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Manufacturer Description */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold mb-4">Manufacturer Description</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* What's in the Box */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold mb-4">What's in the Box</h3>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          {boxItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
