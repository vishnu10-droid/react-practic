import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Mail, Package, Heart, ShoppingCart, Settings, LogOut, BadgeCheck, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Profile() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || localStorage.getItem("shopkart_user") || "null") || { name: "Guest User", email: "guest@example.com" };
    } catch {
      return { name: "Guest User", email: "guest@example.com" };
    }
  })();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const orders = JSON.parse(localStorage.getItem("shopkart_orders") || "[]");

  const stats = [
    { label: "Orders", value: orders.length, icon: Package, to: "/orders", grad: "from-indigo-500 to-violet-500" },
    { label: "Wishlist", value: wishlist.length, icon: Heart, to: "/wishlist", grad: "from-rose-500 to-pink-500" },
    { label: "In Cart", value: cartItems.reduce((s, i) => s + (i.quantity || 1), 0), icon: ShoppingCart, to: "/cart", grad: "from-emerald-500 to-teal-500" },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-[70vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* cover */}
        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 text-white p-8 sm:p-10">
          <div className="absolute -top-20 right-10 w-80 h-52 bg-indigo-600/40 blur-[70px] rounded-full" />
          <div className="absolute -bottom-20 left-10 w-80 h-52 bg-fuchsia-600/30 blur-[70px] rounded-full" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl font-extrabold shadow-2xl ring-4 ring-white/15">
                {user.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full border-[3px] border-slate-950" />
            </div>
            <div className="flex-1">
              <p className="flex items-center gap-1.5 text-[12px] font-bold text-emerald-300"><BadgeCheck size={14} /> VERIFIED MEMBER</p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">{user.name}</h1>
              <p className="text-slate-400 text-[13.5px] mt-1 flex items-center gap-1.5"><Mail size={13} /> {user.email}</p>
            </div>
            <button className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur text-[13px] font-bold hover:bg-white/20 transition flex items-center gap-1.5"><Settings size={14} /> Edit</button>
          </div>
          <div className="relative grid grid-cols-3 gap-3 mt-7">
            {stats.map((s) => (
              <Link key={s.label} to={s.to} className="bg-white/[0.07] border border-white/12 backdrop-blur rounded-2xl p-4 hover:bg-white/[0.12] transition group">
                <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition`}><s.icon size={16} /></span>
                <p className="text-2xl font-extrabold mt-2.5">{s.value}</p>
                <p className="text-[12px] font-semibold text-slate-400">{s.label} →</p>
              </Link>
            ))}
          </div>
        </div>

        {/* rows */}
        <div className="grid sm:grid-cols-2 gap-3.5 mt-5">
          {[
            { to: "/orders", icon: Package, title: "My Orders", text: "Track, return & buy again" },
            { to: "/wishlist", icon: Heart, title: "My Wishlist", text: `${wishlist.length} saved items` },
            { to: "/cart", icon: ShoppingCart, title: "My Cart", text: `${cartItems.length} items waiting` },
            { to: "#", icon: MapPin, title: "Addresses", text: "Manage delivery addresses" },
          ].map((r) => (
            <Link key={r.title} to={r.to} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-0.5 transition-all group">
              <span className="w-11 h-11 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-fuchsia-600 group-hover:text-white transition-all"><r.icon size={18} /></span>
              <span className="flex-1"><span className="block font-extrabold text-[14px]">{r.title}</span><span className="block text-[12.5px] text-slate-500">{r.text}</span></span>
              <ChevronRight size={17} className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>

        <button onClick={() => { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"; }} className="mt-4 w-full py-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 text-rose-600 font-extrabold text-[14px] hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all flex items-center justify-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
