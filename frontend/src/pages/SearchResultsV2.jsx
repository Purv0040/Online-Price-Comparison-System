import SearchLayout from "../layouts/SearchLayout"
import HeaderV2 from "../components/search-v2/HeaderV2"
import FiltersV2 from "../components/search-v2/FiltersV2"
import ProductGridV2 from "../components/search-v2/ProductGridV2"
import RecentlyViewedV2 from "../components/search-v2/RecentlyViewedV2"

export default function SearchResultsV2() {
  return (
    <SearchLayout>
      <HeaderV2 />
      <FiltersV2 />
      <ProductGridV2 />
      <RecentlyViewedV2 />
    </SearchLayout>
  )
}
