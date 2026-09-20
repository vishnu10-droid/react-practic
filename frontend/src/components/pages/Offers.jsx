import React from "react";
import { Link } from "react-router-dom";
import { Zap, Copy, Check, ArrowRight } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../ProductCard";

export default function Offers() {
  const [copied, setCopied] = React.useState(false);
  const offers = products.filter((p) => p.oldPrice > p.price).sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice);

  const copy = () => {
    navigator.clipboard?.writeText("FESTIVE10").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-[30px] bg-slate-950 text-white p-8 sm:p-12">
          <div className="absolute -top-24 right-0 w-[420px] h-[420px] bg-gradient-to-br from-rose-600/50 to-orange-500/40 blur-[90px] rounded-full" />
          <div className="absolute -bottom-24 left-1/4 w-[380px] h-[280px] bg-fuchsia-600/30 blur-[90px] rounded-full" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-orange-500 px-3.5 py-1.5 rounded-full text-[12px] font-extrabold shadow-lg"><Zap size={13} fill="currentColor" /> LIMITED TIME • ENDS SOON</span>
              <h1 className="text-4xl sm:text-[54px] font-extrabold tracking-tight leading-[0.98] mt-4">Hot Deals <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300 bg-clip-text text-transparent">🔥</span><br />up to 60% off</h1>
              <p className="text-slate-300 mt-3 text-[14.5px] max-w-md leading-6">Top-rated products at their lowest prices ever. Stack an extra 10% with the code below.</p>
              <button onClick={copy} className="mt-6 flex items-center gap-3 bg-white/10 border-2 border-dashed border-white/30 backdrop-blur rounded-2xl px-5 py-3.5 hover:border-amber-300/70 hover:bg-white/15 transition group">
                <span className="text-left"><span className="block text-[10.5px] font-extrabold tracking-widest text-slate-400">USE CODE</span><span className="block text-xl font-extrabold tracking-[0.14em] text-amber-300">FESTIVE10</span></span>
                <span className="ml-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 text-[12.5px] font-extrabold flex items-center gap-1.5 group-hover:bg-amber-300 transition">{copied ? <><Check size={14} strokeWidth={3} /> Copied!</> : <><Copy size={14} /> Copy</>}</span>
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["02", "Days"], ["14", "Hours"], ["55", "Mins"]].map(([v, l]) => (
                <div key={l} className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl py-6">
                  <p className="text-3xl sm:text-4xl font-extrabold tabular-nums">{v}</p>
                  <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mt-1">{l.toUpperCase()}</p>
                </div>
              ))}
              <div className="col-span-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl py-3 text-slate-950 text-[13px] font-extrabold">⚡ Extra 10% off prepaid orders — auto-applied</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-9 mb-5">
          <h2 className="text-2xl font-extrabold tracking-tight">All deals <span className="text-sm font-bold text-slate-400">({offers.length})</span></h2>
          <Link to="/products" className="text-[13px] font-bold text-indigo-600 flex items-center gap-1">All products <ArrowRight size={14} /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offers.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>
      </div>
    </div>
  );
}
