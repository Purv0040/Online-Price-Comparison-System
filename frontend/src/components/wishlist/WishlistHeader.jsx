export default function WishlistHeader({ count }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black">
        My Wishlist ({count} items)
      </h1>

      
    </div>
  )
}
