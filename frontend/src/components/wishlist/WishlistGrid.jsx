import WishlistCard from "./WishlistCard"

export default function WishlistGrid({ items = [], onDelete }) {
  if (items.length === 0) {
    return (
      <p className="text-gray-500 text-center py-20">
        Your wishlist is empty 💔
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <WishlistCard
          key={item.title || i}
          item={item}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
