import { PackagePlus, PlusCircle, Tag, BarChart3 } from "lucide-react";

export default function QuickActions({ onAction }) {
  const actions = [
    { label: "Add Product", icon: PackagePlus, key: "products" },
    { label: "Add Category", icon: PlusCircle, key: "categories" },
    { label: "Create Coupon", icon: Tag, key: "coupons" },
    { label: "View Reports", icon: BarChart3, key: "reports" },
  ];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="mb-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-indigo-600">Quick actions</p>
        <h3 className="mt-1 text-lg font-bold text-slate-900">Keep things moving</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map(({ label, icon: Icon, key }) => (
          <button
            key={label}
            onClick={() => onAction && onAction(key)}
            className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50"
          >
            <span className="rounded-xl bg-white p-2 text-indigo-700 shadow-sm transition group-hover:bg-indigo-600 group-hover:text-white">
              <Icon size={16} />
            </span>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
