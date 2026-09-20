import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Copy, Check, ArrowRight, Ticket } from "lucide-react";
import { getProducts, getCoupons } from "../store/shopStore";
import ProductCard from "../components/ProductCard";

export default function Offers() {
  const products = useMemo(getProducts, []);
  const coupons = useMemo(getCoupons, []);
  const [copied, setCopied] = useState("");

  const offers = products
    .filter((p) => Number(p.oldPrice) > Number(p.price))
    .sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice);

  const copy = (code) => {
    try { navigator.clipboard?.writeText(code); } catch { /* noop */ }
    setCopied(code);
    setTimeout(() => setCopied(""), 1600);
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
              <p className="text-slate-300 mt-3 text-[14.5px] max-w-md leading-6">Top-rated products at their lowest prices ever.{coupons.length > 0 ? " Stack an extra discount with a code below." : ""}</p>
              {coupons.length > 0 ? (
                <div className="mt-6 grid gap-2.5 max-w-md">
                  {coupons.map((c) => (
                    <button key={c.code} onClick={() => copy(c.code)} className="flex items-center gap-3 bg-white/10 border-2 border-dashed border-white/30 backdrop-blur rounded-2xl px-5 py-3 hover:border-amber-300/70 hover:bg-white/15 transition group text-left">
                      <Ticket size={20} className="text-amber-300 shrink-0" />
                      <span className="flex-1">
                        <span className="block text-[10.5px] font-extrabold tracking-widest text-slate-400">USE CODE • {c.percent}% OFF</span>
                        <span className="block text-xl font-extrabold tracking-[0.14em] text-amber-300">{c.code}</span>
                      </span>
                      <span className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-[12.5px] font-extrabold flex items-center gap-1.5 group-hover:bg-amber-300 transition shrink-0">{copied === c.code ? <><Check size={14} strokeWidth={3} /> Copied!</> : <><Copy size={14} /> Copy</>}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-3 text-[13px] font-semibold text-slate-300">🎟️ No coupon codes right now — deals below already include discounts.</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[["02", "Days"], ["14", "Hours"], ["55", "Mins"]].map(([v, l]) => (
                <div key={l} className="bg-white/10 border border-white/15 backdrop-blur rounded-3xl py-6">
                  <p className="text-3xl sm:text-4xl font-extrabold tabular-nums">{v}</p>
                  <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mt-1">{l.toUpperCase()}</p>
                </div>
              ))}
              <div className="col-span-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl py-3 text-slate-950 text-[13px] font-extrabold">⚡ Lowest prices of the season — while stocks last</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-9 mb-5">
          <h2 className="text-2xl font-extrabold tracking-tight">All deals <span className="text-sm font-bold text-slate-400">({offers.length})</span></h2>
          <Link to="/products" className="text-[13px] font-bold text-indigo-600 flex items-center gap-1">All products <ArrowRight size={14} /></Link>
        </div>
        {offers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offers.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        ) : (
          <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
            <p className="font-extrabold text-lg">No deals right now</p>
            <p className="mt-1 text-sm text-slate-500">Discounted products will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
