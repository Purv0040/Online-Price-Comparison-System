import MainNavbar from "../components/navbars/MainNavbar"
import MainFooter from "../components/footers/MainFooter"

export default function MainLayout({ children }) {
  return (
    <>
      <MainNavbar />
      <main className="max-w-[1280px] mx-auto">
        {children}
      </main>
      <MainFooter />
    </>
  )
}

