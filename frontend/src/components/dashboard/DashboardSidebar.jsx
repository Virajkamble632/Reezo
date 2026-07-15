import {
  LayoutDashboard,
  Video,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Meetings",
    icon: Video,
  },
  {
    title: "Schedule",
    icon: CalendarDays,
  },
  {
    title: "Contacts",
    icon: Users,
  },
  {
    title: "Analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-[#111827]/80 backdrop-blur-xl">

      <div className="p-6">

        <h2 className="text-lg font-bold text-white">
          Workspace
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Manage your meetings
        </p>

      </div>

      <nav className="flex-1 px-4">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`mb-3 flex w-full items-center gap-4 rounded-2xl px-5 py-4 transition ${
                item.active
                  ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >

              <Icon size={22} />

              <span className="font-medium">
                {item.title}
              </span>

            </button>
          );
        })}

      </nav>

      <div className="border-t border-white/10 p-6">

        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5">

          <h3 className="text-lg font-bold text-white">
            Upgrade Pro
          </h3>

          <p className="mt-2 text-sm text-blue-100">
            Unlock unlimited meetings and premium collaboration features.
          </p>

          <button className="mt-5 w-full rounded-xl bg-white py-3 font-semibold text-blue-700 transition hover:bg-slate-100">
            Upgrade
          </button>

        </div>

      </div>

    </aside>
  );
};

export default DashboardSidebar;