import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { SectionHead, EmptyBox } from "../components/ui";

export default function ProductsPage({ catalog, onAdd, onEdit, onDelete }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHead title="Products" text={`${catalog.length} products • live on store`} />
        <button onClick={() => onAdd()} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
          <Plus size={16} strokeWidth={3} /> Add Product
        </button>
      </div>
      {catalog.length === 0 ? (
        <EmptyBox title="No products yet" text="Add your first product to start selling." action={() => onAdd()} actionLabel="Add Product" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {catalog.map((p) => {
            const low = Number(p.stock ?? 99) <= 9;
            return (
              <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:shadow-lg transition-all">
                <div className="flex gap-3.5">
                  <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover shrink-0 bg-slate-100" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-slate-900">{p.name}</p>
                    <p className="mt-0.5 text-xs font-semibold text-slate-400 capitalize">{String(p.category).replace("-", " ")} • ★ {p.rating}</p>
                    <p className="mt-1 text-[14px] font-extrabold">₹{Number(p.price).toLocaleString("en-IN")} {p.oldPrice ? <span className="font-medium text-slate-400 line-through text-xs">₹{Number(p.oldPrice).toLocaleString("en-IN")}</span> : null}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${low ? "bg-amber-100 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                    {low ? `Only ${p.stock} left` : `${p.stock} in stock`}
                  </span>
                  <div className="flex items-center gap-1">
                    <Link to={`/product/${p.id}`} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50">View</Link>
                    <button onClick={() => onEdit(p)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Edit"><Pencil size={14} /></button>
                    <button onClick={() => onDelete(p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
