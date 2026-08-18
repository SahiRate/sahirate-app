import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Store,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      to: "/materials",
      label: "Materials",
      icon: Package,
    },
    {
      to: "/dealers",
      label: "Dealers",
      icon: Store,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900">

      {/* ================= SIDEBAR ================= */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-[290px] flex-col bg-[#071a33] text-white">

        {/* Brand */}
        <div className="border-b border-white/10 px-6 py-6">

          <div className="flex h-[76px] items-center justify-center rounded-2xl bg-white px-5 shadow-sm">
            <img
              src="/sahirate-logo.png"
              alt="SahiRate"
              className="max-h-[58px] w-auto object-contain"
            />
          </div>

          <div className="mt-4 px-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Admin Console
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Building Material Intelligence
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-8">

          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Workspace
          </p>

          <nav className="space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      "group flex items-center justify-between rounded-xl px-4 py-3.5 transition-all duration-200",
                      isActive
                        ? "bg-[#203754] text-white shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-white",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-4">

                        <div
                          className={[
                            "flex h-10 w-10 items-center justify-center rounded-xl transition",
                            isActive
                              ? "bg-[#f59e0b]/15 text-[#f59e0b]"
                              : "bg-white/5 text-slate-400 group-hover:text-white",
                          ].join(" ")}
                        >
                          <Icon size={19} strokeWidth={1.8} />
                        </div>

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>

                      <ChevronRight
                        size={16}
                        className={
                          isActive
                            ? "text-[#f59e0b]"
                            : "text-slate-600 group-hover:text-slate-300"
                        }
                      />
                    </>
                  )}
                </NavLink>
              );
            })}

          </nav>
        </div>

        {/* Bottom Admin Card */}
        <div className="border-t border-white/10 p-4">

          <div className="mb-3 rounded-xl bg-white/5 px-4 py-4">
            <p className="text-sm font-semibold text-white">
              SahiRate Admin
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Management Console
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-4 rounded-xl border border-white/10 px-4 py-3.5 text-left text-slate-300 transition hover:border-red-400/30 hover:bg-red-500/10 hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 transition group-hover:bg-red-500/10">
              <LogOut size={18} />
            </div>

            <span className="text-sm font-medium">
              Logout
            </span>
          </button>

        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="ml-[290px] min-h-screen">

        {/* Top Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">

          <div className="flex h-[82px] items-center justify-between px-10">

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                SahiRate
              </p>

              <p className="mt-1 text-sm font-medium text-slate-600">
                Building Material Intelligence
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-700">
                  Administrator
                </p>

                <p className="text-xs text-slate-400">
                  Admin Access
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071a33] text-sm font-bold text-white shadow-sm">
                A
              </div>

            </div>

          </div>
        </header>

        {/* Page */}
        <main className="p-8 lg:p-10">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
