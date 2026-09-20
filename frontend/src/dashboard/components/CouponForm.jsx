import { useState } from "react";
import { saveCoupon } from "../../store/shopStore";
import { inputCls } from "./ui";

export default function CouponForm({ onClose, onSaved }) {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(10);

  const submit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    saveCoupon({ code, percent });
    onSaved();
  };

  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <input autoFocus required placeholder="Code — e.g. DIWALI20" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className={`${inputCls} uppercase font-extrabold tracking-[0.12em]`} />
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">DISCOUNT • {percent}%</span>
        <input type="range" min={1} max={90} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full accent-indigo-600" />
      </label>
      <p className="text-xs text-slate-400 font-medium">Works instantly at checkout once created.</p>
      <div className="flex gap-2.5 pt-1">
        <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
        <button type="submit" className="flex-[2] rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3.5 text-sm font-extrabold text-white shadow-lg hover:opacity-95 active:scale-[0.98]">Add Coupon</button>
      </div>
    </form>
  );
}
