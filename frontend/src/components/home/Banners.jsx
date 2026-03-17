export default function Banners() {
  return (
    <section className="px-6 py-12 grid md:grid-cols-2 gap-6">
      <div className="bg-blue-600 text-white rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-2">Top Deals Today</h3>
        <p className="mb-4">Flash sales ending soon. Save up to 60%.</p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
          Browse Deals
        </button>
      </div>

      <div className="bg-green-500 text-white rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-2">Most Compared</h3>
        <p className="mb-4">See what everyone is checking this week.</p>
        <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold">
          View List
        </button>
      </div>
    </section>
  )
}
