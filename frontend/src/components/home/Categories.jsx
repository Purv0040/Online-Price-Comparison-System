import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { searchProducts } from "../../services/api"

export default function Categories() {
  const navigate = useNavigate()
  const [categoryCounts, setCategoryCounts] = useState({})

  const categories = [
    { name: "Electronics", queryCategory: "Electronics", icon: "devices", bg: "bg-blue-50", hoverBg: "group-hover:bg-blue-600", color: "text-blue-600", hoverColor: "group-hover:text-white", slug: "electronics" },
    { name: "Fashion", queryCategory: "Fashion", icon: "checkroom", bg: "bg-green-50", hoverBg: "group-hover:bg-green-600", color: "text-green-600", hoverColor: "group-hover:text-white", slug: "fashion" },
    { name: "Home & Kitchen", queryCategory: "Home & Kitchen", icon: "home", bg: "bg-orange-50", hoverBg: "group-hover:bg-orange-600", color: "text-orange-600", hoverColor: "group-hover:text-white", slug: "home" },
    { name: "Beauty", queryCategory: "Beauty & Personal Care", icon: "self_care", bg: "bg-pink-50", hoverBg: "group-hover:bg-pink-600", color: "text-pink-600", hoverColor: "group-hover:text-white", slug: "beauty" },
    { name: "Sports", queryCategory: "Sports & Fitness", icon: "sports_basketball", bg: "bg-cyan-50", hoverBg: "group-hover:bg-blue-600", color: "text-blue-600", hoverColor: "group-hover:text-white", slug: "sports" },
  ]

  useEffect(() => {
    const loadCategoryCounts = async () => {
      try {
        const countEntries = await Promise.all(
          categories.map(async (cat) => {
            const response = await searchProducts("", {
              category: cat.queryCategory,
              page: 1,
              limit: 1,
            })

            const total = response?.data?.pagination?.total || 0
            return [cat.slug, total]
          })
        )

        setCategoryCounts(Object.fromEntries(countEntries))
      } catch (error) {
        console.error("Failed to load category counts:", error)
      }
    }

    loadCategoryCounts()
  }, [])

  return (
    <section className="px-6 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0e121b]">
          Shop by Category
        </h2>

        {/* View All */}
        <button
          onClick={() => navigate("/category")}
          className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline"
        >
          View All
          <span className="material-symbols-outlined text-sm">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map(cat => (
          <div
            key={cat.name}
            onClick={() =>
              navigate(`/category/${cat.slug}`)
            }
            className="group bg-white rounded-2xl border border-[#dbe3f0] p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
          >
            <div className={`w-12 h-12 rounded-xl ${cat.bg} ${cat.hoverBg} flex items-center justify-center mb-4 transition-colors`}>
              <span className={`material-symbols-outlined ${cat.color} ${cat.hoverColor}`}>
                {cat.icon}
              </span>
            </div>

            <h3 className="font-semibold text-[#0e121b]">{cat.name}</h3>
            <p className="text-sm text-gray-500">{categoryCounts[cat.slug] ?? 0} items</p>
          </div>
        ))}
      </div>
    </section>
  )
}
