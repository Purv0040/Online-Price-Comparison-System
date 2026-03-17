export default function RecentlyViewed() {
  return (
    <section className="border-t pt-12 mt-16">
      <h2 className="text-xl font-bold mb-6">Recently Viewed</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {["iPhone 14 Pro", "Razer Blade 15", "Apple Watch 8"].map((item, i) => (
          <div key={i}>
            <div className="bg-white p-3 rounded-lg border mb-2">
              <img
                src="/images/products/iphone.png"
                className="h-24 mx-auto object-contain"
              />
            </div>
            <p className="text-xs font-semibold">{item}</p>
            <p className="text-xs font-bold text-primary">$999.00</p>
          </div>
        ))}
      </div>
    </section>
  )
}
