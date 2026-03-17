import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";

const products = [
  {
    _id: "dash_prod_001",
    id: "dash_prod_001",
    category: "Electronics",
    title: "Nomad minimalist Watch",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNCFTloG0RA4opbPOE21reylixjpWTyXnw7TFBR-7GmYFUBzGfUx5oXabG1DpiiUIFus4RovgQ5y2wHAC3bLG9UA-GXdZgkexKoDqRNi8mVXzzzpyBcZJ5Z96vq8q0PNMpNqPZgbhgIu64pA97sbxs2o1CAXphNIA16veHIK16LvgNWAlxj-fO2c_pwXEI-OE5yL5dCSHsjD5J7CbyO8eeBNAH9mvrCklV3_W3R2bT5uB6HvYVqtab7e7zdfwsCvOJiaeG9rEdSY4T",
    price: "$149.00",
    oldPrice: "$175.00",
    badge: "15% OFF",
  },
  {
    _id: "dash_prod_002",
    id: "dash_prod_002",
    category: "Audio",
    title: "Beats Studio Pro",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC19yAfAot4rjc6OL68ySidvSqNzZBF5B4Be97jp-VYAEnyzJ-C2mQnGB_kJBjzZfxJBLteZD8NLDWF_d89ksv0h9BVzuViqUfynGmfNcdnKimlHkEu3tHDuXzjQJxlAo71NH99uHup_cRrTPO38TkAaD7-CGYQ9k0-JIoX7YJhjhDKw_vIuzVQg4Z0xfyL7MIlB4GEpoqdcxgGDLIegL_wfOkW56i9jJIiEO7_NUoiu8kvIE2NxcN6eETUdRASOlBD_9NPBzU04sfq",
    price: "$229.00",
    oldPrice: "$249.00",
    badge: "$20 DROP",
  },
  {
    _id: "dash_prod_003",
    id: "dash_prod_003",
    category: "Audio",
    title: "Sony WH-1000XM5 Headphones",
    image:
      "https://images.unsplash.com/photo-1580894908360-4f4f6a1a9aef?q=80&w=800&auto=format&fit=crop",
    price: "$348.00",
    oldPrice: "$399.00",
    badge: "HOT DEAL",
  },
  {
    _id: "dash_prod_004",
    id: "dash_prod_004",
    category: "Electronics",
    title: "Apple AirPods Pro (2nd Gen)",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa6b94db?q=80&w=800&auto=format&fit=crop",
    price: "$199.00",
    oldPrice: "$249.00",
    badge: "20% OFF",
  },
  {
    _id: "dash_prod_005",
    id: "dash_prod_005",
    category: "Wearables",
    title: "Apple Watch Series 9",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop",
    price: "$399.00",
    oldPrice: "$449.00",
    badge: "NEW",
  },
];

export default function WishlistGrid() {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [addingProduct, setAddingProduct] = useState(null);

  const handleWishlistToggle = async (product) => {
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

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">Recently Added to Wishlist</h3>
        <button
          onClick={() => navigate("/wishlist")}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Wishlist
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((item, i) => (
          <div
            key={i}
className="group bg-white rounded-xl border border-slate-200 p-4 shadow-sm
           transition-all duration-300 hover:shadow-lg hover:-translate-y-1"

          >
            {/* Image */}
            <div className="relative rounded-lg overflow-hidden aspect-square bg-slate-100 mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover
                           transition-transform duration-500
                           group-hover:scale-105"
              />

              {/* Heart */}
              <button
                onClick={() => handleWishlistToggle(item)}
                disabled={addingProduct === item._id}
                className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow
                           transition-transform duration-300
                           hover:scale-110 disabled:opacity-50"
              >
                <span className="text-lg">
                  {isInWishlist(item._id) ? "❤️" : "🤍"}
                </span>
              </button>

              {/* Badge */}
              <span className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded">
                {item.badge}
              </span>
            </div>

            {/* Text */}
            <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">
              {item.category}
            </p>
            <h4 className="font-bold text-slate-900 mt-1 transition-colors group-hover:text-primary">
              {item.title}
            </h4>

            {/* Price */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-bold text-slate-900">
                {item.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {item.oldPrice}
              </span>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/product/${item._id}`)}
              className="w-full mt-4 py-2 border border-slate-200 rounded-lg text-sm font-bold
                         transition-all duration-300
                         hover:bg-primary hover:text-white hover:border-primary"
            >
              Compare
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
