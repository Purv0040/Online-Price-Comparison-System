export default function SettingsSidebar() {
  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
        Settings & Privacy
      </h3>

      {/* Change Password */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600">
              lock
            </span>
          </div>
          <div>
            <p className="font-semibold">Change Password</p>
            <p className="text-sm text-slate-500">
              Last changed 3 months ago
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400">
          chevron_right
        </span>
      </div>

      {/* Notifications */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600">
              notifications
            </span>
          </div>
          <div>
            <p className="font-semibold">Notifications</p>
            <p className="text-sm text-slate-500">
              Email and Browser alerts
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400">
          chevron_right
        </span>
      </div>

      {/* Alert History */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-600">
              history
            </span>
          </div>
          <div>
            <p className="font-semibold">Alert History</p>
            <p className="text-sm text-slate-500">
              See all past notifications
            </p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400">
          chevron_right
        </span>
      </div>
    </div>
  )
}
