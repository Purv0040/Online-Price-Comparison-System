import { useState, useEffect } from "react"

export default function ProductGallery({ images = [] }) {
  // Ensure we have a valid array
  const imageList = Array.isArray(images) ? images.filter(img => !!img) : []
  
  // Default placeholder
  const placeholder = "https://via.placeholder.com/600x600?text=No+Image+Available"
  
  // ✅ default main image = first image or placeholder
  const [activeImage, setActiveImage] = useState(imageList[0] || placeholder)

  // Update active image if images prop changes
  useEffect(() => {
    if (imageList.length > 0) {
      setActiveImage(imageList[0])
    }
  }, [images])

  return (
    <div className="space-y-4">

      {/* MAIN IMAGE */}
      <div className="aspect-square bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
        <img
          src={activeImage}
          alt="Product"
          className="w-full h-full object-contain transition-all"
          onError={(e) => {
             e.target.onerror = null; 
             e.target.src = placeholder;
          }}
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {imageList.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}   // ✅ CLICK → CHANGE MAIN IMAGE
            className={`aspect-square rounded-lg bg-white border flex items-center justify-center p-1
              ${
                activeImage === img
                  ? "border-blue-600 ring-2 ring-blue-600/30"
                  : "border-slate-200 hover:border-blue-300"
              }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://via.placeholder.com/100x100?text=Error";
              }}
            />
          </button>
        ))}
      </div>

    </div>
  )
}
