export default function PasswordStrength() {
  return (
    <div className="mt-3">
      <span className="text-xs font-semibold text-green-600">Strong</span>
      <div className="flex gap-1.5 mt-1.5">
        {[1,2,3,4].map(i => (
          <div key={i} className="flex-1 h-1.5 bg-green-500 rounded-full" />
        ))}
      </div>
    </div>
  )
}
