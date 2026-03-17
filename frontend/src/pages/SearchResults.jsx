import { useState, useEffect } from "react";

import { useSearchParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

import SearchNavbar from "../components/navbars/SearchNavbar";
import SearchFooter from "../components/footers/SearchFooter";

const products = [
  {
    brand: "Apple",
    name: "iPhone 15 Pro Max, 256GB",
    category: "Electronics",
    price: "$1,199.00",
    priceNumber: 1199,
    oldPrice: "$1,399.00",
    sites: "Available on 8 sites",
    badge: "20% OFF",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaGl6SXsp9y0TwwbpRtipXuVdsXVp0ysx02Q6dqlk6jOmi2PxYFhG-o06gSc8zBTRHwfuaaz0UEzxiN-fLmN-qWI3Q_T28QCh08Kc40oWrJM17SPq0PJCw-NRMXb7sHJac-FYLT38ZXjHs5L2knAU24O-n_dF8wKU2-1y4GyZCvy8kqJrGMqlx0hoBc5ZW0ZP5Okl7-xWytHJTbetRxLNPvavKgaPuWMm8pG2-fLjiu2TC4WXwHGEy7CKKZaXcUmc5Xb29miuKgX8j",
  },
  {
    brand: "Samsung",
    name: "Galaxy Z Fold 5, 512GB",
    category: "Electronics",
    price: "$1,649.00",
    priceNumber: 1649,
    oldPrice: "$1,899.00",
    sites: "Available on 5 sites",
    badge: "15% OFF",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhImye_s71Oxnh9zG2fIKJHiiaCCMDoT9FNKYpKyHyIPi9hePnchslmguqnx9MfiCizXJA6DH6kRfN4-6yQqeN3chVE_muzNqCT3P0lmHuEsjAsqX1CCvxDTQHoppAnGlXkefC0WQVFCi1rTODe5dR8sH_OQaNn-n1ZdU5OZBKSt_a-U4mPCuH_C10vMcchN_YdUeCfy0fsZEtmnc_haVc9kmrC4U4qWQafsa15lsmEgEHm9B54DzgyOjjE5JVQHKoaNRaU36QPh7v",
  },
  {
    brand: "Google",
    name: "Pixel 8 Pro, 128GB",
    category: "Electronics",
    price: "$749.00",
    priceNumber: 749,
    oldPrice: "$999.00",
    sites: "Available on 12 sites",
    badge: "25% OFF",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Gkl6-lwCazcOE8jMRrjcd38iRqHTyYozMR0-9Y4e6Jkt7UJGQvQpy6FVVn7eKnjTK10mNn6lW_nUyBtFwihqA2V7qGS1zAwM8RMx_A9R7mOR5ZWuqv3U1xJQlLL_M_c0OnQhK40ppCq_O1yuwiUm8oyqtzY-aRlw2nEosvcFnw-XKJJH3k0Xw1OwKPuYLiaxhdMHFubUX8UD9wuNv5wzs9j5xBNs7NIx19y-W6I2Y7Cpn488hj3zkpPpWAspwVkW7RkUICSZU0Hu",
  },
  {
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    category: "Electronics",
    price: "$1,299.00",
    priceNumber: 1299,
    oldPrice: "$1,419.00",
    sites: "Available on 4 sites",
    badge: "10% OFF",
    inStock: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBiVAoVyXKD_3461P5SRBm_pmcRpiLG_CgyOW8zsQ3SZVxBVND0FSdh_2W1UORSBXT0yOWvH-Xtt34SeNKRbIxe93GUstUUxi4ZTbjqiigYXYTy3zVtYEUeoWCYtP8hlzxtoTb0qsFEup20xzuwgixfRMhRf_S3V62TsYFiwxS2e6AU9fV1bckmkjTzSj-3iMMHnAlaL8iodK9QLm2ND3iRe3r4pJczx2HsP8vXaNCKywzVLycsbZf2uwl_EdK4QMguyXinEg9TdKmz",
  },
  {
    brand: "Nothing",
    name: "Nothing Phone (2)",
    category: "Accessories",
    price: "$549.00",
    priceNumber: 549,
    oldPrice: "$799.00",
    sites: "Available on 3 sites",
    badge: "30% OFF",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCC2_3vGcZkSOK4EgWvyN3wCwH82PdsDQcakLOWk7amBC6jr4d0koojjfYoqvGwiyliSEY_lTVTAX6wMXFZp6HOmqgOI3OP_riU34o6zsqjKH4WXrCO8fcdtYdopl87cf6GUYlEdz-9iYNeejR12R3EBcInNmL5ROR9Dl_Onj_zZfulWv5orqQ4s-c4m3etGhhy_VFcF5mgXVXAQbj9W8wYOzbE7nHs6F3bT5sAPolM7HO63X5ff1xq2na8rcWfQGbd_zaZW2ht-n6f",
  },
  {
    brand: "Apple",
    name: "iPhone 15, 128GB",
    category: "Electronics",
    price: "$799.00",
    priceNumber: 799,
    oldPrice: "$849.00",
    sites: "Available on 15 sites",
    badge: "5% OFF",
    inStock: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKXMY-VPro-14WdnKQvPbfNKnM6Z9EyF1r5AtSiMJM-zyerAkNHg_zisMmFollL1Ke7GzPQtx7-Sd9zYki5AFuLFPqrcG4Lp9BuKYMgJeTJL2gmjgCzM5iRT99y1z4ubIQ5WMVtr_mZAvT2VG1Fa6rOtR4_SAzNP_JCWPaWfgFsCoig_V3KJqS4mde2AVj0bWNyTdUW5Ni41RAeoD8E0xJVzgGWvlJPkydadJqmVpjWm34qDorJWnpSdrBD1jx6Yt9njSdI5Aea2xX",
  },
];

export default function SearchResults() {
  const [selectedCategories, setSelectedCategories] = useState(["Electronics"]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 6;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingProduct, setAddingProduct] = useState(null);

  // Add IDs to products for proper tracking
  const productsWithIds = products.map((p, idx) => ({
    ...p,
    _id: `search_prod_${idx}`,
    id: `search_prod_${idx}`,
  }));

const filteredProducts = productsWithIds.filter((p) => {
    if (selectedCategories.length && !selectedCategories.includes(p.category))
      return false;
    if (selectedBrands.length && !selectedBrands.includes(p.brand))
      return false;
    if (inStockOnly && !p.inStock) return false;
    if (p.priceNumber < priceRange[0] || p.priceNumber > priceRange[1])
      return false;
    return true;
  });
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

const handleWishlistToggle = async (product) => {
  if (!isAuthenticated) {
    navigate("/login");
    return;
  }

  try {
    setAddingProduct(product._id);
    if (isInWishlist(product._id)) {
      await removeFromWishlist(product._id);
    } else {
      await addToWishlist(product._id, product);
    }
  } catch (err) {
    console.error("Wishlist error:", err);
  } finally {
    setAddingProduct(null);
  }
};

useEffect(() => {
  setCurrentPage(1);
}, [selectedCategories, selectedBrands, inStockOnly, priceRange]);


  return (
    <>
      <SearchNavbar />

      <main className="max-w-[1440px] mx-auto flex gap-8 px-4 lg:px-10 py-8">
        {/* SIDEBAR */}
        <aside className="w-64 shrink-0 space-y-8">
          {/* CATEGORY */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Category
            </h3>
            {["Electronics", "Accessories", "Wearables"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-600"
                  checked={selectedCategories.includes(item)}
                  onChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(item)
                        ? prev.filter((c) => c !== item)
                        : [...prev, item],
                    )
                  }
                />
                {item}
              </label>
            ))}
          </div>

          {/* PRICE RANGE */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Price Range
            </h3>

            {/* Slider Track */}
            <div
              className="h-1.5 bg-gray-200 rounded relative mb-4"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = Math.min(Math.max(x / rect.width, 0), 1);
                const value = Math.round(100 + percent * (2000 - 100));

                // move the nearer knob
                const distMin = Math.abs(value - priceRange[0]);
                const distMax = Math.abs(value - priceRange[1]);

                if (distMin < distMax) {
                  setPriceRange([value, priceRange[1]]);
                } else {
                  setPriceRange([priceRange[0], value]);
                }
              }}
            >
              {/* Active range */}
              <div
                className="absolute h-1.5 bg-blue-600 rounded"
                style={{
                  left: `${((priceRange[0] - 100) / (2000 - 100)) * 100}%`,
                  right: `${100 - ((priceRange[1] - 100) / (2000 - 100)) * 100}%`,
                }}
              />

              {/* Min knob */}
              <div
                className="absolute -top-1 w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                style={{
                  left: `${((priceRange[0] - 100) / (2000 - 100)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />

              {/* Max knob */}
              <div
                className="absolute -top-1 w-4 h-4 bg-blue-600 rounded-full cursor-pointer"
                style={{
                  left: `${((priceRange[1] - 100) / (2000 - 100)) * 100}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            {/* Inputs */}
            <div className="flex gap-2">
              <input
                className="border rounded-lg p-2 text-sm w-full"
                value={`$${priceRange[0]}`}
                onChange={(e) =>
                  setPriceRange([
                    Number(e.target.value.replace(/\D/g, "")) || 0,
                    priceRange[1],
                  ])
                }
              />
              <input
                className="border rounded-lg p-2 text-sm w-full"
                value={`$${priceRange[1]}`}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Number(e.target.value.replace(/\D/g, "")) || 0,
                  ])
                }
              />
            </div>
          </div>

          {/* BRAND */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Brand
            </h3>
            {["Apple", "Samsung", "Google"].map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-sm mb-2"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={selectedBrands.includes(item)}
                  onChange={() =>
                    setSelectedBrands((prev) =>
                      prev.includes(item)
                        ? prev.filter((b) => b !== item)
                        : [...prev, item],
                    )
                  }
                />
                {item}
              </label>
            ))}
          </div>

          {/* AVAILABILITY */}
          <div>
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-3">
              Availability
            </h3>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={inStockOnly}
                onChange={() => setInStockOnly((prev) => !prev)}
              />
              In Stock Only
            </label>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="flex-1 space-y-6">
          <h2 className="text-xl">
            Showing <b>{filteredProducts.length}</b> results for{" "}
            <span className="text-primary italic">
              "
              {selectedCategories.length
                ? selectedCategories.join(", ")
                : "All Products"}
              "
            </span>
          </h2>
          {/* FILTER CHIPS */}
          <div className="flex flex-wrap gap-2">
            {/* Category chips */}
            {selectedCategories.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tag}
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c !== tag),
                    )
                  }
                >
                  close
                </span>
              </div>
            ))}

            {/* Price chip */}
            <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
              ${priceRange[0]} - ${priceRange[1]}
              <span
                className="material-symbols-outlined text-sm cursor-pointer"
                onClick={() => setPriceRange([100, 2000])}
              >
                close
              </span>
            </div>

            {/* Brand chips */}
            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {brand}
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() =>
                    setSelectedBrands((prev) => prev.filter((b) => b !== brand))
                  }
                >
                  close
                </span>
              </div>
            ))}

            {/* In Stock chip */}
            {inStockOnly && (
              <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                In Stock
                <span
                  className="material-symbols-outlined text-sm cursor-pointer"
                  onClick={() => setInStockOnly(false)}
                >
                  close
                </span>
              </div>
            )}
          </div>

           {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginatedProducts.map((p, i) => (


             <div
  key={i}
  className="bg-white rounded-2xl border border-[#e7ebf3] hover:shadow-lg transition overflow-hidden flex flex-col relative"
>
  {/* Wishlist */}
<button
  type="button"
  onClick={(e) => {
    e.stopPropagation();
    handleWishlistToggle(p);
  }}
  disabled={addingProduct === p._id}
  className={`absolute top-3 right-3 z-20 p-2 bg-white rounded-full transition shadow-sm cursor-pointer disabled:opacity-50 ${
    isInWishlist(p._id) ? "text-red-500" : "text-gray-400 hover:text-red-500"
  }`}
>
  <span className="text-xl">
    {isInWishlist(p._id) ? "❤️" : "🤍"}
  </span>
</button>



  {/* IMAGE */}
  <div className="relative bg-gradient-to-b from-black to-[#1a1a1a] p-6 aspect-square">
    {/* Badge */}
    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
      {p.badge}
    </span>

    <img
      src={p.image}
      alt={p.name}
      className="h-full mx-auto object-contain"
    />
  </div>

  {/* CONTENT */}
  <div className="p-5 flex flex-col gap-3 flex-1">
    <p className="text-sm text-blue-600">{p.brand}</p>

    <h3 className="font-bold text-blue-600 text-lg leading-snug">
      {p.name}
    </h3>

    <div className="flex items-center gap-2 text-sm text-gray-500">
      <span className="material-symbols-outlined text-green-500 text-base">
        storefront
      </span>
      {p.sites}
    </div>

    <div className="mt-auto">
      <p className="text-sm text-gray-500">Starting from</p>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-primary">
          {p.price}
        </span>
        <span className="line-through text-gray-400 text-sm">
          {p.oldPrice}
        </span>
      </div>

     <button
 onClick={() => navigate(`/product/${p.name}`)}
  className="w-full mt-[10px] py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm"
>
  Compare Prices
</button>


    </div>
  </div>
</div>

            ))}
          </div>

         {/* PAGINATION */}
<div className="flex justify-center pt-10 pb-16">
  <div className="flex items-center gap-1">
    {/* Prev */}
    <button
      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
    >
      <span className="material-symbols-outlined">chevron_left</span>
    </button>

    {/* Page numbers */}
    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
      <button
        key={page}
        className={`w-10 h-10 rounded-lg hover:bg-gray-200 ${
          currentPage === page ? "bg-gray-200 font-bold" : ""
        }`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ))}

    {/* Next */}
    <button
      className="p-2 rounded-lg hover:bg-gray-200 disabled:opacity-40"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
    >
      <span className="material-symbols-outlined">chevron_right</span>
    </button>
  </div>
</div>

        </section>
      </main>

      <SearchFooter />
    </>
  );
}
