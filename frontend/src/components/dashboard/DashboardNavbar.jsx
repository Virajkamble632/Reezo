import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111827]/80 backdrop-blur-2xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

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

        <div className="hidden w-full max-w-md lg:block">

          <div className="relative">

            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />

            <input
              type="text"
              placeholder="Search meetings..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-5 text-white outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Notification */}

          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10">

            <Bell size={20} className="text-white" />

            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>

          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

            <img
              src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${user?.name}`}
              alt={user?.name}
              className="h-11 w-11 rounded-full"
            />

            <div className="hidden md:block">

              <h3 className="font-semibold text-white">
                {user?.name}
              </h3>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>

            </div>

            <ChevronDown
              size={18}
              className="text-slate-400"
            />

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