import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartItem from "../CartItem";
import OrderSummary from "../OrderSummary";

export default function Cart() {
  const { cartItems, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <div className="w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-br from-indigo-100 to-fuchsia-100 flex items-center justify-center text-5xl shadow-inner">🛒</div>
        <h1 className="text-3xl font-extrabold mt-6 tracking-tight">Your cart is empty</h1>
        <p className="text-slate-500 mt-2 text-[14px]">Looks like you haven't added anything yet. Let's fix that!</p>
        <div className="flex justify-center gap-2.5 mt-7">
          <Link to="/products" className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-extrabold text-[14px] shadow-lg flex items-center gap-2 hover:-translate-y-0.5 transition-all">Start shopping <ArrowRight size={16} /></Link>
          <Link to="/offers" className="px-7 py-3.5 rounded-2xl border border-slate-200 font-bold text-[14px] hover:border-indigo-300 hover:text-indigo-600">View deals</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-7">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-600 flex items-center gap-1.5"><ShoppingBag size={13} /> YOUR BAG</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Shopping Cart <span className="text-lg font-bold text-slate-400">({cartItems.length})</span></h1>
          </div>
          <button onClick={clearCart} className="flex items-center gap-1.5 text-[12.5px] font-bold text-slate-400 hover:text-rose-600 border border-slate-200 hover:border-rose-200 hover:bg-rose-50 px-4 py-2.5 rounded-xl transition"><Trash2 size={14} /> Clear cart</button>
        </div>
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          <div className="space-y-3.5">
            {cartItems.map((item) => (<CartItem key={item.id} item={item} />))}
            <Link to="/products" className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-indigo-600 hover:text-indigo-800 mt-2">← Continue shopping</Link>
          </div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
