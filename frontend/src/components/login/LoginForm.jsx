import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }
    if (!formData.password) {
      setError("Password is required")
      return
    }

    try {
      setLoading(true)
      await login(formData.email, formData.password)
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 overflow-hidden bg-[#f5f7fb] flex items-center justify-center">
      <div className="w-[90vw] h-[85vh] max-w-[1200px] bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Shop Smarter 👕</h2>
          <p className="text-slate-300 mb-6">
            Discover the best deals and track prices in one place.
          </p>

          <ul className="space-y-4 text-slate-200 text-base">
            <li>✅ Compare prices from multiple stores</li>
            <li>✅ Save your favorite products</li>
            <li>✅ Get alerts when prices drop</li>
          </ul>

          <div className="mt-8 flex justify-center">
            <img
              src="/images/login-illustration.png"
              alt="Illustration"
              className="max-h-[220px] object-contain"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-10 flex flex-col justify-center overflow-hidden relative">

          {/* Back Button */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>

          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-slate-500 text-center mt-2 mb-6">
            Login to continue to your account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 mt-2 rounded-lg border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. alex@example.com"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 mt-2 rounded-lg border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200"></div>
              <span className="text-sm text-slate-400">OR</span>
              <div className="flex-1 h-px bg-slate-200"></div>
            </div>

            <button
              type="button"
              className="w-full border border-slate-300 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-50"
            >
              <img src="/images/google.png" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>

            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register now
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  )
}
