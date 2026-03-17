export default function RecentlyViewed() {
  const items = [
    {
      name: "Designer Shades",
      price: "$199",
      label: "FASHION",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600",
    },
    {
      name: "Polaroid 3000",
      price: "$89",
      label: "CAMERA",
      image:
        "https://images.unsplash.com/photo-1519183071298-a2962eadcdb2?q=80&w=600",
    },
    {
      name: "Oxford Classic",
      price: "$210",
      label: "WATCH",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600",
    },
    {
      name: "Pro Sound X1",
      price: "$450",
      label: "AUDIO",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600",
    },
    {
      name: "Eames Replica",
      price: "$340",
      label: "FURNITURE",
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=600",
    },
  ]

  return (
    <section className="mt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Recently Viewed</h3>

       
        
      </div>

      {/* Cards */}
      <div className="flex gap-5 overflow-x-auto pb-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="min-w-[200px] bg-white p-4 rounded-xl border border-slate-200"
          >
            {/* Image box */}
            <div className="relative w-full h-40 bg-slate-100 rounded-lg mb-4 overflow-hidden">
              {/* Image label */}
              <span className="absolute top-2 left-2 bg-white text-xs font-bold px-2 py-0.5 rounded-md shadow">
                {item.label}
              </span>

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="font-semibold">{item.name}</p>
            <p className="text-primary font-bold">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
