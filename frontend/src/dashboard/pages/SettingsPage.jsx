import { Store } from "lucide-react";
import { SectionHead } from "../components/ui";

const FIELDS = [
  ["STORE NAME", "ShopKart"],
  ["SUPPORT EMAIL", "care@shopkart.in"],
  ["FREE SHIPPING ABOVE", "₹499"],
  ["RETURN WINDOW", "7 days"],
];

export default function SettingsPage() {
  return (
    <section className="space-y-5">
      <SectionHead title="Settings" text="Store preferences" />
      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] max-w-2xl">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg">
            <Store size={22} />
          </span>
          <div>
            <p className="font-extrabold text-lg">ShopKart Store</p>
            <p className="text-sm text-slate-500">Bengaluru, India • INR (₹)</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {FIELDS.map(([label, val]) => (
            <label key={label} className="block">
              <span className="text-xs font-bold text-slate-500">{label}</span>
              <input defaultValue={val} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
            </label>
          ))}
        </div>
        <button className="mt-5 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-600 transition">Save changes</button>
      </div>
    </section>
  );
}
