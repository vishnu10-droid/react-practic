import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { findCoupon, getCoupons } from "../store/shopStore";
import { ShieldCheck, Ticket, ArrowRight, Lock } from "lucide-react";

export default function OrderSummary({ checkout = false }) {
  const { cartItems, total } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null);
  const available = useMemo(getCoupons, []);
  const count = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);
  const delivery = total === 0 || total > 499 ? 0 : 49;
  const discount = applied ? Math.round((total * applied.percent) / 100) : 0;
  const grand = total + delivery - discount;

  const apply = () => {
    const found = findCoupon(coupon);
    if (found) {
      setApplied(found);
      setCoupon("");
    } else {
      alert(available.length ? "Invalid coupon code." : "No active coupons right now.");
    }
  };

  return (
    <div className="lg:sticky lg:top-32 h-fit">
      <div className="bg-white border border-slate-100 rounded-[26px] overflow-hidden shadow-[0_20px_60px_-25px_rgb(15_23_42/0.3)]">
        <div className="bg-slate-950 px-6 py-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/40 blur-2xl rounded-full" />
          <h2 className="text-white font-extrabold text-[16px] tracking-tight relative">Order Summary</h2>
          <p className="text-slate-400 text-[12.5px] relative">{count} item{count !== 1 ? "s" : ""} in your bag</p>
        </div>

        <div className="p-6">
          {!checkout && (
            <div className="mb-5">
              <label className="text-[11px] font-extrabold tracking-widest text-slate-400 flex items-center gap-1.5 mb-2"><Ticket size={13} /> HAVE A COUPON?</label>
              {applied ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-dashed border-emerald-300 rounded-2xl px-4 py-3">
                  <span className="text-[13px] font-extrabold text-emerald-700">{applied.code} applied (−₹{discount.toLocaleString("en-IN")})</span>
                  <button onClick={() => setApplied(null)} className="text-[12px] font-bold text-slate-400 hover:text-rose-500">Remove</button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder={available.length ? `Try ${available[0].code}` : "No coupons live"} className="flex-1 min-w-0 border border-slate-200 bg-slate-50 rounded-xl px-3.5 py-2.5 text-[13px] font-bold uppercase outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 placeholder:normal-case placeholder:font-medium placeholder:text-slate-400" />
                  <button onClick={apply} className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-[12.5px] font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition active:scale-95">Apply</button>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2.5 text-[13.5px]">
            <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-bold text-slate-900">₹{total.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-slate-600"><span>Delivery</span>{delivery === 0 ? <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[12px]">FREE ✓</span> : <span className="font-bold text-slate-900">₹49</span>}</div>
            {discount > 0 && <div className="flex justify-between text-emerald-700 font-bold"><span>Coupon saving</span><span>−₹{discount.toLocaleString("en-IN")}</span></div>}
            {delivery !== 0 && (
              <p className="text-[12px] text-slate-500 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">Add <b>₹{(499 - total).toLocaleString("en-IN")}</b> more for FREE delivery 🚚</p>
            )}
          </div>

          <div className="border-t border-dashed border-slate-200 mt-4 pt-4 flex justify-between items-end">
            <span className="font-bold text-slate-600 text-[14px]">Total</span>
            <span className="text-[24px] font-extrabold tracking-tight">₹{grand.toLocaleString("en-IN")}</span>
          </div>

          {!checkout && (
            <Link to="/checkout" className="mt-5 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-extrabold text-[14px] shadow-[0_15px_35px_-10px_rgb(99_102_241/0.7)] hover:shadow-[0_18px_40px_-10px_rgb(168_85_247/0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
              Proceed to Checkout <ArrowRight size={16} strokeWidth={2.6} />
            </Link>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-slate-400"><Lock size={12} /> 256-bit encrypted checkout <span className="mx-0.5">•</span> <ShieldCheck size={12} className="text-emerald-500" /> Buyer protection</p>
        </div>
      </div>
    </div>
  );
}
