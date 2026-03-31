import { useNavigate } from "react-router-dom"

export default function Categories() {
  const navigate = useNavigate()

  const categories = [
    { name: "Electronics", items: "12k+ items", icon: "devices", bg: "bg-blue-50", hoverBg: "group-hover:bg-blue-600", color: "text-blue-600", hoverColor: "group-hover:text-white", slug: "electronics" },
    { name: "Fashion", items: "20k+ items", icon: "checkroom", bg: "bg-green-50", hoverBg: "group-hover:bg-green-600", color: "text-green-600", hoverColor: "group-hover:text-white", slug: "fashion" },
    { name: "Home & Kitchen", items: "15k+ items", icon: "home", bg: "bg-orange-50", hoverBg: "group-hover:bg-orange-600", color: "text-orange-600", hoverColor: "group-hover:text-white", slug: "home" },
    { name: "Beauty", items: "8k+ items", icon: "self_care", bg: "bg-pink-50", hoverBg: "group-hover:bg-pink-600", color: "text-pink-600", hoverColor: "group-hover:text-white", slug: "beauty" },
    { name: "Sports", items: "10k+ items", icon: "sports_basketball", bg: "bg-cyan-50", hoverBg: "group-hover:bg-blue-600", color: "text-blue-600", hoverColor: "group-hover:text-white", slug: "sports" },
  ]

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
            <p className="text-sm text-gray-500">{cat.items}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
