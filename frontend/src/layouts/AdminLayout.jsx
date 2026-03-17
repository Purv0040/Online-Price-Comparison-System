import AdminNavbar from "../components/admin/AdminNavbar"
import AdminSidebar from "../components/admin/AdminSidebar"

export default function AdminLayout({ children }) {
  return (
    <>
      <AdminNavbar />
      <div className="flex min-h-[calc(100vh-64px)]">
        <AdminSidebar />
        <main className="flex-1 bg-background-light p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </>
  )
}
