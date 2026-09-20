import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Globe, AtSign, Share2, Play, MapPin, Mail, Phone, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10">
      {/* trust strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-4 -mb-8 relative z-10">
          {[
            { Icon: Truck, title: "Fast, Free Delivery", text: "Free shipping on orders over ₹499" },
            { Icon: ShieldCheck, title: "100% Secure Payments", text: "UPI, cards & cash on delivery" },
            { Icon: RotateCcw, title: "7-Day Easy Returns", text: "No-question-asked returns" },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-3xl border border-slate-100 shadow-[0_18px_50px_-20px_rgb(15_23_42/0.25)] p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white flex items-center justify-center shrink-0 shadow-lg">
                <f.Icon size={20} />
              </div>
              <div>
                <p className="font-extrabold text-slate-900 text-[14px]">{f.title}</p>
                <p className="text-[12.5px] text-slate-500 mt-0.5">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-950 text-slate-300 pt-16 pb-8 rounded-t-[32px] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-[500px] h-[300px] bg-indigo-600/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[300px] bg-fuchsia-600/15 blur-[100px] rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white">
                  <ShoppingCart size={19} />
                </div>
                <span className="text-xl font-extrabold text-white tracking-tight">ShopKart</span>
              </div>
              <p className="text-[13.5px] leading-6 text-slate-400 mt-4 max-w-xs">
                Premium shopping for electronics, fashion, beauty & more. Quality checked, fast delivery, honest prices.
              </p>
              <div className="flex gap-2 mt-5">
                {[Globe, AtSign, Share2, Play].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-600 hover:to-fuchsia-600 hover:text-white hover:border-transparent transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-white font-extrabold text-[13px] tracking-widest mb-4">SHOP</p>
              <ul className="space-y-2.5 text-[13.5px]">
                {[["All Products", "/products"], ["Hot Deals", "/offers"], ["New Arrivals", "/new-arrivals"], ["Wishlist", "/wishlist"], ["Cart", "/cart"]].map(([l, to]) => (
                  <li key={l}><Link to={to} className="hover:text-white transition">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-extrabold text-[13px] tracking-widest mb-4">ACCOUNT</p>
              <ul className="space-y-2.5 text-[13.5px]">
                {[["My Profile", "/profile"], ["My Orders", "/orders"], ["Checkout", "/checkout"], ["Login", "/"], ["Register", "/register"]].map(([l, to]) => (
                  <li key={l}><Link to={to} className="hover:text-white transition">{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-extrabold text-[13px] tracking-widest mb-4">STAY IN TOUCH</p>
              <ul className="space-y-2.5 text-[13.5px]">
                <li className="flex items-center gap-2"><MapPin size={15} className="text-indigo-400" /> Bengaluru, India</li>
                <li className="flex items-center gap-2"><Mail size={15} className="text-indigo-400" /> care@shopkart.in</li>
                <li className="flex items-center gap-2"><Phone size={15} className="text-indigo-400" /> 1800-123-4567</li>
              </ul>
              <div className="mt-4 flex rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-1">
                <input placeholder="Email for offers" className="flex-1 bg-transparent px-3 text-[13px] outline-none placeholder:text-slate-500 text-white" />
                <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-[12.5px] font-bold hover:opacity-90">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-slate-500">
            <p>© 2026 ShopKart. Crafted with care in India.</p>
            <p className="flex gap-4"><a href="#" className="hover:text-slate-300">Privacy</a><a href="#" className="hover:text-slate-300">Terms</a><a href="#" className="hover:text-slate-300">Returns</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
