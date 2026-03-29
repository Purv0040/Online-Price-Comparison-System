import { useState, useEffect } from "react"

export default function ProductGallery({ images }) {
  const [activeImage, setActiveImage] = useState(images[0])
  
  // Update active image if prop changes
  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  const handleImageError = (e) => {
    e.target.src = `https://loremflickr.com/600/600/product?lock=${Math.floor(Math.random() * 1000)}`;
  };

  return (
    <div className="space-y-4">

      {/* MAIN IMAGE */}
      <div className="aspect-square bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
        <img
          src={activeImage}
          alt="Product"
          onError={handleImageError}
          className="max-w-full max-h-full object-contain transition-all"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`aspect-square rounded-lg bg-white border flex items-center justify-center overflow-hidden
              ${
                activeImage === img
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-slate-200"
              }`}
          >
            <img
              src={img}
              alt="Thumbnail"
              onError={handleImageError}
              className="w-full h-full object-contain p-2"
            />
          </button>
        ))}
      </div>

    </div>
  )
}
