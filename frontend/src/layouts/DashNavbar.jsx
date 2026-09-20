import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CalendarRange,
  CheckCheck,
  RefreshCw,
  ShoppingCart,
  AlertTriangle,
} from "lucide-react";

export default function DashNavbar({ user, query, onQuery, onMenu, notifications = [], onOpenOrders }) {
  const [openPanel, setOpenPanel] = useState(null);
  const [seen, setSeen] = useState([]);
  const unread = notifications.filter((n) => !seen.includes(n.id));

  const initials = (user?.name || "Admin").slice(0, 2).toUpperCase();
  const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-xl">
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenu} className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-2 md:flex">
          <Search size={16} className="text-indigo-500 shrink-0" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search orders, products, customers"
            className="w-56 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 xl:w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setOpenPanel((p) => (p === "bell" ? null : "bell"))}
            className={`relative rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50 ${openPanel === "bell" ? "bg-slate-50 ring-2 ring-indigo-100" : ""}`}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unread.length > 9 ? "9+" : unread.length}
              </span>
            )}
          </button>
          {openPanel === "bell" && (
            <>
              <button aria-label="Close" onClick={() => setOpenPanel(null)} className="fixed inset-0 z-30 cursor-default bg-transparent" />
              <div className="absolute right-0 top-12 z-40 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl anim-fade-up">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-sm font-bold text-slate-900">Notifications {unread.length > 0 && `(${unread.length})`}</p>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setSeen(notifications.map((n) => n.id))} title="Mark all read" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600">
                      <CheckCheck size={15} />
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.length === 0 && (
                    <p className="px-3 py-6 text-center text-xs text-slate-400">No new notifications. All caught up!</p>
                  )}
                  {notifications.slice(0, 7).map((n) => {
                    const Icon = n.tone === "stock" ? AlertTriangle : ShoppingCart;
                    const box = n.tone === "stock" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600";
                    const isNew = !seen.includes(n.id);
                    return (
                      <button
                        key={n.id}
                        onClick={() => { setOpenPanel(null); onOpenOrders && onOpenOrders(); }}
                        className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50 ${isNew ? "bg-indigo-50/50" : ""}`}
                      >
                        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${box}`}>
                          <Icon size={15} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-xs font-bold text-slate-800">{n.title}</span>
                            {isNew && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] text-slate-500">{n.subtitle}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => { setOpenPanel(null); onOpenOrders && onOpenOrders(); }}
                  className="block w-full border-t border-slate-100 px-4 py-2.5 text-center text-xs font-bold text-indigo-700 transition hover:bg-slate-50"
                >
                  View all orders
                </button>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="group relative hidden md:block">
          <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-indigo-300">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-[12px] font-extrabold text-white">{initials}</div>
            <div className="hidden xl:block">
              <p className="max-w-[140px] truncate text-sm font-bold text-slate-900">{user?.name || "Admin"}</p>
              <p className="max-w-[140px] truncate text-xs text-slate-500">{user?.email || ""}</p>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </button>
          <div className="absolute right-0 top-12 hidden w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl group-hover:block">
            <Link to="/profile" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
              <User size={15} /> Profile
            </Link>
            <button onClick={() => onOpenOrders && onOpenOrders("settings")} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
              <Settings size={15} /> Settings
            </button>
            <button
              onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; }}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-rose-500 transition hover:bg-rose-50"
            >
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-slate-950 px-3 py-2.5 xl:flex">
          <CalendarRange size={15} className="text-indigo-300" />
          <span className="text-[13px] font-semibold text-slate-200">Till {today}</span>
        </div>
      </div>
    </header>
  );
}
