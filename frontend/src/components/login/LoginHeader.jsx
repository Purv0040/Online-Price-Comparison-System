export default function LoginHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#e7ebf3] px-6 py-3 bg-white">
      <div className="flex items-center gap-4">
        <div className="size-8 text-[#2463eb]">
          <svg viewBox="0 0 48 48" fill="currentColor">
            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold">PriceWise</h2>
      </div>

      <button className="h-10 w-10 rounded-lg bg-[#e7ebf3] flex items-center justify-center">
        <span className="material-symbols-outlined">light_mode</span>
      </button>
    </header>
  )
}
