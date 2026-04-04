import { useEffect, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import ProfileHeader from "../components/dashboard/ProfileHeader"
import PriceAlerts from "../components/dashboard/PriceAlerts"
import SettingsSidebar from "../components/dashboard/SettingsSidebar"
import SavingsCard from "../components/dashboard/SavingsCard"
import RecentlyViewed from "../components/dashboard/RecentlyViewed"
import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { user, updateProfile } = useAuth()
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsError, setSettingsError] = useState("")
  const [settingsSuccess, setSettingsSuccess] = useState("")
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  const [customOptions, setCustomOptions] = useState({
    emailAlerts: true,
    browserNotifications: true,
    showProfilePublicly: false,
    currency: "INR",
    language: "English",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const optionsStorageKey = `profileOptions:${user?.email || "guest"}`

  useEffect(() => {
    const savedOptions = localStorage.getItem(optionsStorageKey)
    if (savedOptions) {
      try {
        setCustomOptions((prev) => ({ ...prev, ...JSON.parse(savedOptions) }))
      } catch {
        // Ignore malformed data.
      }
    }
  }, [optionsStorageKey])

  const handleCustomOptionChange = (e) => {
    const { name, type, checked, value } = e.target
    setCustomOptions((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveDashboardSettings = async () => {
    setSettingsError("")
    setSettingsSuccess("")

    const wantsPasswordChange =
      passwordForm.currentPassword || passwordForm.newPassword || passwordForm.confirmPassword

    if (wantsPasswordChange) {
      if (!passwordForm.currentPassword || !passwordForm.newPassword) {
        setSettingsError("Current and new password are required.")
        return
      }

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setSettingsError("New password and confirm password do not match.")
        return
      }
    }

    try {
      setIsSavingSettings(true)
      localStorage.setItem(optionsStorageKey, JSON.stringify(customOptions))

      if (wantsPasswordChange) {
        await updateProfile({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        })
      }

      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setSettingsSuccess("Settings saved successfully ✅")
    } catch (error) {
      setSettingsError(error?.response?.data?.message || error.message || "Failed to save settings")
    } finally {
      setIsSavingSettings(false)
    }
  }

  return (
    <DashboardLayout>
      <ProfileHeader onSettingsClick={() => setShowSettingsModal(true)} />

      <div className="grid lg:grid-cols-12 gap-8 mt-8">
        <div className="lg:col-span-12 space-y-8">
         <div>
    <PriceAlerts />
  </div>


        </div>

       {/*  <div className="lg:col-span-4 space-y-6">
          <SettingsSidebar />
          <SavingsCard />
        </div>*/}
      </div>

      <RecentlyViewed />

      {showSettingsModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-[2px] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Dashboard Settings</h3>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <h4 className="text-base font-semibold text-slate-900">Custom Options</h4>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Email price alerts</span>
                  <input
                    type="checkbox"
                    name="emailAlerts"
                    checked={customOptions.emailAlerts}
                    onChange={handleCustomOptionChange}
                    className="w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Browser notifications</span>
                  <input
                    type="checkbox"
                    name="browserNotifications"
                    checked={customOptions.browserNotifications}
                    onChange={handleCustomOptionChange}
                    className="w-5 h-5"
                  />
                </label>

                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Public profile visibility</span>
                  <input
                    type="checkbox"
                    name="showProfilePublicly"
                    checked={customOptions.showProfilePublicly}
                    onChange={handleCustomOptionChange}
                    className="w-5 h-5"
                  />
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Preferred Currency</label>
                    <select
                      name="currency"
                      value={customOptions.currency}
                      onChange={handleCustomOptionChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="INR">INR (₹)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Language</label>
                    <select
                      name="language"
                      value={customOptions.language}
                      onChange={handleCustomOptionChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Gujarati">Gujarati</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-5">
                <h4 className="text-base font-semibold text-slate-900">Change Password</h4>
                <p className="text-sm text-slate-500">Leave blank if you do not want to change password.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="Re-enter new password"
                    />
                  </div>
                </div>
              </div>

              {settingsError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {settingsError}
                </div>
              )}

              {settingsSuccess && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  {settingsSuccess}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDashboardSettings}
                disabled={isSavingSettings}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {isSavingSettings ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
