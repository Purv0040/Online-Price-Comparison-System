import AuthNavbar from "../components/navbars/AuthNavbar"
import AuthFooter from "../components/footers/AuthFooter"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col">
      <AuthNavbar />

      <main className="flex-grow flex items-center justify-center p-6">
        {children}
      </main>

      <AuthFooter />
    </div>
  )
}
