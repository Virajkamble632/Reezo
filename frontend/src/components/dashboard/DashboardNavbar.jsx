import { Bell, Search, ChevronDown, LogOut, Menu, X, LayoutDashboard, Video, CalendarDays, Users, BarChart3, Settings, } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logout();

    toast.success("Logged out successfully.");

    navigate("/", { replace: true });
  } catch (error) {
    toast.error("Failed to logout.");
    console.error(error);
  }
};

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
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
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827]/80 backdrop-blur-2xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600">

            <span className="text-xl font-bold text-white">
              R
            </span>

          </div>

          <div>

            <h2 className="text-xl font-bold text-white">
              Reezo
            </h2>

            <p className="text-xs text-slate-400">
              Video Collaboration
            </p>

          </div>

        </div>

        {/* Search */}
 

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* User */}

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
              alt={user?.name}
              className="h-11 w-11 rounded-full"
            />

            <div className="hidden lg:block">

              <h3 className="font-semibold text-white">
                {user?.name}
              </h3>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500 transition hover:bg-red-600"
          >

            <LogOut size={18} className="text-white" />

          </button>

         

        </div>

      </div>

    </header>
  );
};

export default DashboardNavbar;