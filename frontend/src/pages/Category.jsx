import { useParams, useNavigate } from "react-router-dom";
import CategoryNavbar from "../components/navbars/CategoryNavbar";
import CategoryFooter from "../components/footers/CategoryFooter";

const categories = [
  { id: 1, slug: "electronics", title: "Electronics", description: "Mobiles, laptops, gadgets and accessories.", icon: "📱" },
  { id: 2, slug: "fashion", title: "Fashion", description: "Clothing, footwear and accessories.", icon: "👗" },
  { id: 3, slug: "home-kitchen", title: "Home & Kitchen", description: "Appliances, furniture and decor.", icon: "🏠" },
  { id: 4, slug: "beauty-personal-care", title: "Beauty & Personal Care", description: "Skincare, haircare and grooming.", icon: "💄" },
  { id: 5, slug: "sports-fitness", title: "Sports & Fitness", description: "Gym, outdoor and fitness equipment.", icon: "🏋️" },
  { id: 6, slug: "books", title: "Books", description: "Educational, novels and comics.", icon: "📚" },
  { id: 7, slug: "toys-baby", title: "Toys & Baby", description: "Toys, baby care and kids products.", icon: "🧸" },
  { id: 8, slug: "grocery", title: "Grocery", description: "Daily essentials and food items.", icon: "🛒" },
  { id: 9, slug: "computers", title: "Computers", description: "PCs, accessories and components.", icon: "💻" },
  { id: 10, slug: "mobile-accessories", title: "Mobile Accessories", description: "Covers, chargers, headphones.", icon: "🎧" },
  { id: 11, slug: "health", title: "Health", description: "Medicines and healthcare products.", icon: "🩺" },
  
];


export default function Category() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const isAll = !slug || slug === "all";

  const visibleCategories = isAll
    ? categories
    : categories.filter((c) => c.slug === slug);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <CategoryNavbar />

      {/* Page Content */}
      <div className="flex-1 p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {isAll ? "All Categories" : slug.replace("-", " ")}
        </h1>

        {visibleCategories.length === 0 ? (
          <p className="text-gray-500">No category found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/category/${cat.slug}`)}
                className="cursor-pointer bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h2 className="text-lg font-semibold mb-1">{cat.title}</h2>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <CategoryFooter />
    </div>
  );
}
