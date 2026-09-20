import React from "react";
import { Link } from "react-router-dom";
import { Package, Truck, CheckCircle2, ChevronRight } from "lucide-react";

export default function Orders() {
  const orders = JSON.parse(localStorage.getItem("shopkart_orders") || "[]");

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <div className="w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-br from-indigo-100 to-fuchsia-100 flex items-center justify-center text-5xl shadow-inner">📦</div>
        <h1 className="text-3xl font-extrabold mt-6 tracking-tight">No orders yet</h1>
        <p className="text-slate-500 mt-2 text-[14px]">Your orders will appear here once you checkout.</p>
        <Link to="/products" className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-[14px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition-all">Start shopping →</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-[60vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-600">ORDER HISTORY</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">My Orders <span className="text-lg font-bold text-slate-400">({orders.length})</span></h1>

        <div className="space-y-4 mt-7">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-[0_18px_50px_-25px_rgb(15_23_42/0.3)] hover:shadow-[0_25px_60px_-25px_rgb(15_23_42/0.35)] transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50/80 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center"><Package size={17} /></span>
                  <div>
                    <p className="text-[13px] font-extrabold">Order #{String(order.id).slice(-6)}</p>
                    <p className="text-[12px] text-slate-500 font-medium">{new Date(order.date).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full"><CheckCircle2 size={13} /> {order.status}</span>
                  <span className="font-extrabold text-[17px]">₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              {/* progress */}
              <div className="px-6 pt-4 flex items-center gap-1.5 text-[11px] font-bold">
                {["Placed", "Packed", "Shipped"].map((s, i) => (
                  <React.Fragment key={s}>
                    <span className={`flex items-center gap-1 ${i === 0 ? "text-indigo-600" : "text-slate-300"}`}>{i === 0 ? <CheckCircle2 size={13} /> : <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />} {s}</span>
                    {i < 2 && <span className={`flex-1 h-0.5 rounded-full ${i === 0 ? "bg-indigo-200" : "bg-slate-100"}`} />}
                  </React.Fragment>
                ))}
                <span className="flex items-center gap-1 text-slate-300"><Truck size={13} /> Out for delivery</span>
              </div>
              <div className="p-6 pt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3.5 items-center bg-slate-50/60 border border-slate-100 rounded-2xl p-3">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[13.5px] truncate">{item.name}</p>
                      <p className="text-[12px] text-slate-500 font-medium">Qty: {item.quantity || 1} • ₹{item.price.toLocaleString("en-IN")}</p>
                    </div>
                    <Link to={`/product/${item.id}`} className="text-[12px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-0.5 shrink-0">Buy again <ChevronRight size={13} /></Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
