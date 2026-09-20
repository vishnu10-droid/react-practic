import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Ticket,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

const menuGroups = [
  {
    title: "Management",
    items: [
      { label: "Dashboard", key: "overview", icon: LayoutGrid },
      { label: "Products", key: "products", icon: Package },
      { label: "Categories", key: "categories", icon: Boxes },
      { label: "Orders", key: "orders", icon: ShoppingCart },
      { label: "Customers", key: "customers", icon: Users },
      { label: "Coupons", key: "coupons", icon: Ticket },
      { label: "Reviews", key: "reviews", icon: Star },
      {
        label: "Reports",
        icon: BarChart3,
        children: [
          { label: "Sales Report", key: "reports" },
          { label: "Customer Report", key: "customers" },
          { label: "Product Report", key: "products" },
        ],
      },
    ],
  },
];

function SidebarBody({ collapsed, active, onNavigate, onToggle, showClose, onClose }) {
  const [openDropdowns, setOpenDropdowns] = useState({ Reports: false });

  const itemCls = (isActive) =>
    `group flex w-full items-center gap-2.5 rounded-lg px-2 py-[7px] text-xs font-medium transition-all duration-200 ${
      isActive ? "bg-indigo-500/15 text-indigo-200" : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
    }`;

  const iconBox = (isActive) =>
    `rounded-md p-1 transition ${
      isActive ? "bg-indigo-500/20 text-indigo-200" : "bg-white/[0.07] text-slate-400 group-hover:text-indigo-200"
    }`;

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="mb-2 flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.07] px-2.5 py-2">
        <Link to="/home" className="flex items-center gap-2 overflow-hidden">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow">
            <ShoppingCart size={15} />
          </span>
          {!collapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">ShopKart</span>
              <span className="block truncate text-[10px] text-slate-400">Admin Panel</span>
            </span>
          )}
        </Link>
        {showClose ? (
          <button onClick={onClose} className="rounded-full border border-white/15 bg-white/[0.07] p-1.5 text-slate-300 hover:bg-white/15 hover:text-white" aria-label="Close menu">
            <X size={14} />
          </button>
        ) : (
          <button onClick={onToggle} className="rounded-full border border-white/15 bg-white/[0.07] p-1 text-slate-300 transition hover:bg-white/15 hover:text-white" aria-label="Collapse sidebar">
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-1">
            {!collapsed && (
              <p className="px-2 pt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">{group.title}</p>
            )}
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = Boolean(item.children?.length);
                const isChildActive = hasChildren && item.children.some((c) => c.key === active);
                const isActive = (item.key && item.key === active) || isChildActive;
                const isOpen = openDropdowns[item.label];

                if (hasChildren) {
                  return (
                    <div key={item.label} className="space-y-0.5">
                      <button
                        type="button"
                        onClick={() => !collapsed && setOpenDropdowns((p) => ({ ...p, [item.label]: !p[item.label] }))}
                        className={itemCls(isActive)}
                      >
                        <span className={iconBox(isActive)}><Icon size={14} /></span>
                        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                        {!collapsed && (
                          <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                            <ChevronDown size={13} />
                          </span>
                        )}
                      </button>
                      {isOpen && !collapsed && (
                        <div className="ml-6 space-y-0.5 border-l border-white/10 py-0.5 pl-2">
                          {item.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => onNavigate(child.key)}
                              className={`block w-full rounded-md px-2 py-1 text-left text-xs transition ${
                                active === child.key
                                  ? "bg-indigo-500/15 font-semibold text-indigo-200"
                                  : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                              }`}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button key={item.label} onClick={() => onNavigate(item.key)} className={itemCls(isActive)}>
                    <span className={iconBox(isActive)}><Icon size={14} /></span>
                    {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-2 space-y-0.5 border-t border-white/15 pt-2">
        {[
          { label: "Back to Store", to: "/home", icon: Home },
          { label: "Settings", key: "settings", icon: Settings },
        ].map((b) =>
          b.to ? (
            <Link key={b.label} to={b.to} className="flex items-center gap-2.5 rounded-lg px-2 py-[7px] text-xs font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
              <span className="rounded-md bg-white/[0.07] p-1 text-slate-400"><b.icon size={14} /></span>
              {!collapsed && <span>{b.label}</span>}
            </Link>
          ) : (
            <button key={b.label} onClick={() => onNavigate(b.key)} className={itemCls(active === b.key)}>
              <span className={iconBox(active === b.key)}><b.icon size={14} /></span>
              {!collapsed && <span className="flex-1 text-left">{b.label}</span>}
            </button>
          )
        )}
        <button
          onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; }}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-[7px] text-xs font-medium text-rose-300/90 transition hover:bg-rose-500/15 hover:text-rose-200"
        >
          <span className="rounded-md bg-white/[0.07] p-1"><LogOut size={14} /></span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default function DashSidebar({ collapsed, onToggle, active, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {/* Desktop */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col bg-slate-950 px-2 py-2 text-white shadow-xl shadow-slate-950/30 lg:flex transition-all duration-300 ${
          collapsed ? "w-20" : "w-[240px]"
        }`}
      >
        <SidebarBody collapsed={collapsed} active={active} onNavigate={onNavigate} onToggle={onToggle} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 h-full w-[270px] bg-slate-950 px-2 py-2 text-white shadow-2xl anim-fade-up">
            <SidebarBody collapsed={false} active={active} onNavigate={(k) => { onNavigate(k); onClose(); }} showClose onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}
