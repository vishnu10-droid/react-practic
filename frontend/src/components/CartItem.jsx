import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  const qty = item.quantity || 1;

  return (
    <div className="group bg-white border border-slate-100 rounded-[22px] p-4 flex gap-4 items-center hover:shadow-[0_18px_45px_-20px_rgb(15_23_42/0.3)] hover:border-indigo-100 transition-all">
      <Link to={`/product/${item.id}`} className="shrink-0 relative overflow-hidden rounded-2xl">
        <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500" />
      </Link>
      <div className="flex-1 min-w-0">
        <p className="text-[10.5px] font-bold tracking-widest text-indigo-500 uppercase">{item.category?.replace("-", " ")}</p>
        <Link to={`/product/${item.id}`} className="font-bold text-[14.5px] text-slate-900 line-clamp-1 hover:text-indigo-700">{item.name}</Link>
        <p className="font-extrabold text-[16px] mt-1 tracking-tight">₹{(item.price * qty).toLocaleString("en-IN")} <span className="text-[12px] font-semibold text-slate-400">₹{item.price.toLocaleString("en-IN")} each</span></p>
        <div className="flex items-center gap-2 mt-2.5">
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-1">
            <button onClick={() => updateQty(item.id, qty - 1)} className="w-7 h-7 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition active:scale-90" aria-label="decrease">
              <Minus size={13} strokeWidth={3} />
            </button>
            <span className="w-7 text-center text-[13.5px] font-extrabold">{qty}</span>
            <button onClick={() => updateQty(item.id, qty + 1)} className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition active:scale-90" aria-label="increase">
              <Plus size={13} strokeWidth={3} />
            </button>
          </div>
          <span className="text-[11.5px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">In stock ✓</span>
        </div>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="self-start p-2.5 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition" title="Remove">
        <Trash2 size={17} />
      </button>
    </div>
  );
}
