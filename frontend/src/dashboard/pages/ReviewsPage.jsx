import { Star } from "lucide-react";
import { SectionHead } from "../components/ui";

export default function ReviewsPage({ catalog }) {
  return (
    <section className="space-y-5">
      <SectionHead title="Reviews" text="Catalog ratings (written by customers on the store)" />
      <div className="grid gap-4 md:grid-cols-2">
        {[...catalog].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6).map((p) => (
          <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
            <div className="flex items-center gap-3">
              <img src={p.image} alt="" className="h-11 w-11 rounded-xl object-cover bg-slate-100" />
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-bold">{p.name}</p>
                <p className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star size={12} fill="currentColor" /> {p.rating} • {(p.reviews || 0).toLocaleString("en-IN")} reviews</p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-amber-400" style={{ width: `${((p.rating || 0) / 5) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
