import { useState } from "react"

export default function ProductGallery({ images }) {
  // ✅ default main image = first image
  const [activeImage, setActiveImage] = useState(images[0])

  return (
    <div className="space-y-4">

      {/* MAIN IMAGE */}
      <div className="aspect-square bg-white rounded-xl border border-slate-200 p-8">
        <img
          src={activeImage}
          alt="Product"
          className="w-full h-full object-contain transition-all"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}   // ✅ CLICK → CHANGE MAIN IMAGE
            className={`aspect-square rounded-lg bg-white border
              ${
                activeImage === img
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-slate-200"
              }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>

    </div>
  )
}
