import DashboardNavbar from "../components/navbars/DashboardNavbar"
import DashboardFooter from "../components/footers/DashboardFooter"

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] flex flex-col">
      <DashboardNavbar />
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {children}
      </main>
      <DashboardFooter />
    </div>
  )
}

