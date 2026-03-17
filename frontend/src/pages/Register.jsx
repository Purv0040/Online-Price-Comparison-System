import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import PasswordStrength from "../components/ui/PasswordStrength"

export default function Register() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Validation
    if (!formData.name.trim()) {
      setError("Full name is required")
      return
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }
    if (!formData.password) {
      setError("Password is required")
      return
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to Terms & Conditions")
      return
    }

    try {
      setLoading(true)
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      // Success - navigate to dashboard
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.")
      console.error("Registration error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[480px] bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-[32px] font-bold">Create your account</h1>
      <p className="text-sm text-[#4d6599] mt-1">
        Start comparing prices today
      </p>

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-8">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          placeholder="name@example.com"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <div>
          <Input
            label="Password"
            placeholder="Create a password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <PasswordStrength password={formData.password} />
        </div>

        <Input
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="size-5 cursor-pointer"
          />
          <p className="text-sm text-[#4d6599]">
            I agree to the{" "}
            <span className="text-primary font-medium cursor-pointer">
              Terms & Conditions
            </span>
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-14 bg-[#2463eb] text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a47b8]"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center text-sm mt-6 text-[#4d6599]">
        Already have an account?
        <span
          onClick={() => navigate("/login")}
          className="text-[#2463eb] font-bold ml-1 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  )
}

function Input({ label, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium pb-2">{label}</label>
      <input
        {...props}
        className="h-12 rounded-lg border border-[#d0d7e7] bg-[#f8f9fc] px-4 focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  )
}
