import { AlertTriangle } from "lucide-react";

export default function LowStock({ items = [], loading = false }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <p className="text-[13px] text-slate-500">Low stock products</p>
      <h3 className="mb-4 text-lg font-bold text-slate-900">Action needed</h3>
      {loading ? (
        <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
      ) : items.length === 0 ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
          <p className="text-sm font-bold text-emerald-700">All stocked up ✓</p>
          <p className="text-xs text-emerald-600/80 mt-1">Every product is above safety stock.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id || item.name} className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 p-3">
              <div className="rounded-lg bg-white p-2 text-amber-600 shadow-sm shrink-0">
                <AlertTriangle size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-bold text-slate-800 truncate">{item.name}</p>
                <p className="text-xs text-slate-500">Only <b className="text-amber-700">{item.stock} left</b> • reorder soon</p>
              </div>
              <span className="text-[10.5px] font-extrabold px-2 py-1 rounded-full bg-amber-500 text-white shrink-0">LOW</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
