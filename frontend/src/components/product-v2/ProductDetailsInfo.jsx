export default function ProductDetailsInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {/* Manufacturer Description */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold mb-4">Manufacturer Description</h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          The WH-1000XM5 headphones rewrite the rules for distraction-free
          listening. Two processors control 8 microphones for unprecedented
          noise cancellation and exceptional call quality. With a newly
          developed driver, DSEE – Extreme and Hi-Res audio support the
          WH-1000XM5 headphones provide awe-inspiring audio quality.
        </p>
      </div>

      {/* What's in the Box */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h3 className="font-bold mb-4">What's in the Box</h3>
        <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
          <li>WH-1000XM5 Headphones</li>
          <li>Collapsible Carrying Case</li>
          <li>Connection Cable (1.2m)</li>
          <li>USB-C Charging Cable</li>
        </ul>
      </div>
    </div>
  )
}
