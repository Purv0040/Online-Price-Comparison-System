import BulkNavbar from "../components/navbars/BulkNavbar"
import BulkFooter from "../components/footers/BulkFooter"

export default function BulkLayout({ children }) {
  return (
    <>
      <BulkNavbar />
      <main className="bg-background-light min-h-screen">
        {children}
      </main>
      <BulkFooter />
    </>
  )
}
