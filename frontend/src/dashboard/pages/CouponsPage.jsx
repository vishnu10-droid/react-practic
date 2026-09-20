import { Plus, Copy, Check, Trash2 } from "lucide-react";
import { SectionHead, EmptyBox } from "../components/ui";

export default function CouponsPage({ coupons, onAdd, onDelete, copied, onCopy }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHead title="Coupons" text={coupons.length ? `${coupons.length} active coupon${coupons.length !== 1 ? "s" : ""}` : "No coupons yet"} />
        <button onClick={onAdd} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
          <Plus size={16} strokeWidth={3} /> Add Coupon
        </button>
      </div>
      {coupons.length === 0 ? (
        <EmptyBox title="No coupons yet" text="Create your first coupon — it works instantly at checkout." action={onAdd} actionLabel="Add Coupon" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {coupons.map((c) => (
            <div key={c.code} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 text-white shadow-lg">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-xl" />
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-white/70">COUPON • {c.percent}% OFF</p>
              <p className="mt-1 text-2xl font-extrabold tracking-[0.12em]">{c.code}</p>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => onCopy(c.code)} className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[12.5px] font-extrabold text-slate-900 hover:bg-slate-100 transition">
                  {copied === c.code ? <><Check size={14} strokeWidth={3} /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
                <button onClick={() => onDelete(c.code)} className="rounded-xl border border-white/30 px-3.5 py-2.5 text-[12.5px] font-bold text-white hover:bg-white/15 transition" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
