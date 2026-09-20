import { Plus, Trash2 } from "lucide-react";
import { SectionHead, EmptyBox } from "../components/ui";

export default function CategoriesPage({ cats, catalog, onAdd, onDelete }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHead title="Categories" text={`${cats.length} categories`} />
        <button onClick={onAdd} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
          <Plus size={16} strokeWidth={3} /> Add Category
        </button>
      </div>
      {cats.length === 0 ? (
        <EmptyBox title="No categories yet" text="Create your first category to organise products." action={onAdd} actionLabel="Add Category" />
      ) : (
        <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
          {cats.map((c) => {
            const count = catalog.filter((p) => p.category === c.id).length;
            return (
              <div key={c.id} className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-lg shrink-0">🛍️</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900 text-[14px]">{c.name}</p>
                  <p className="text-xs font-semibold text-slate-400">{count} product{count !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={() => onDelete(c.id, c.name)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete"><Trash2 size={15} /></button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
