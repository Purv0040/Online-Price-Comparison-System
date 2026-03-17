import DashboardLayout from "../layouts/DashboardLayout"
import ProfileHeader from "../components/dashboard/ProfileHeader"
import PriceAlerts from "../components/dashboard/PriceAlerts"
import WishlistGrid from "../components/dashboard/WishlistGrid"
import SettingsSidebar from "../components/dashboard/SettingsSidebar"
import SavingsCard from "../components/dashboard/SavingsCard"
import RecentlyViewed from "../components/dashboard/RecentlyViewed"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ProfileHeader />

      <div className="grid lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-12 space-y-8">
         <div>
    <PriceAlerts />
  </div>


  <div>
    <WishlistGrid />
  </div>
        </div>

       {/*  <div className="lg:col-span-4 space-y-6">
          <SettingsSidebar />
          <SavingsCard />
        </div>*/}
      </div>

      <RecentlyViewed />
    </DashboardLayout>
  )
}
