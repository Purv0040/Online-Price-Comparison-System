import SearchNavbarV2 from "../components/navbars/SearchNavbarV2"
import SearchFooterV2 from "../components/footers/SearchFooterV2"

export default function SearchLayout({ children }) {
  return (
    <>
      <SearchNavbarV2 />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <SearchFooterV2 />
    </>
  )
}
