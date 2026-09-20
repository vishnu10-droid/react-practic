import { Package, Plus, X } from "lucide-react";

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400 placeholder:font-normal";

export function SectionHead({ title, text }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Admin • {title}</p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-0.5 text-[13px] font-medium text-slate-500">{text}</p>
    </div>
  );
}

export function EmptyBox({ title, text, action, actionLabel, noAction }) {
  return (
    <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Package size={24} />
      </div>
      <p className="mt-4 font-extrabold text-lg">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
      {!noAction && action && (
        <button onClick={action} className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-6 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition">
          <Plus size={15} strokeWidth={3} /> {actionLabel}
        </button>
      )}
    </div>
  );
}

export function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-[26px] bg-white p-6 sm:p-7 shadow-2xl anim-fade-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
          <button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
