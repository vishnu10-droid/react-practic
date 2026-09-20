import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Truck, ShieldCheck, RotateCcw, Zap, ChevronRight, BadgeCheck, Minus, Plus } from "lucide-react";
import { getProducts } from "../store/shopStore";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const products = useMemo(getProducts, []);
  const product = products.find((item) => String(item.id) === String(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 px-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-3xl font-extrabold mt-5 tracking-tight">Product not found</h1>
        <p className="text-slate-500 mt-2 text-[14px]">This item may have been removed or sold out.</p>
        <Link to="/products" className="inline-block mt-6 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-[14px]">Back to products</Link>
      </div>
    );
  }

  const liked = isWishlisted(product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12.5px] font-semibold text-slate-400 mb-6">
          <Link to="/home" className="hover:text-indigo-600">Home</Link><ChevronRight size={13} />
          <Link to="/products" className="hover:text-indigo-600">Products</Link><ChevronRight size={13} />
          <span className="text-slate-700 truncate max-w-[220px]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* gallery */}
          <div className="lg:sticky lg:top-32">
            <div className="relative rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-[0_25px_70px_-25px_rgb(15_23_42/0.35)] group">
              <img src={product.image} alt={product.name} className="w-full h-[440px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badge && <span className="px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur text-white text-[11.5px] font-extrabold">{product.badge}</span>}
                {discount > 0 && <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[11.5px] font-extrabold shadow-lg">−{discount}%</span>}
              </div>
              <button onClick={() => toggleWishlist(product)} className={`absolute top-4 right-4 w-11 h-11 rounded-2xl backdrop-blur flex items-center justify-center shadow-xl transition active:scale-90 ${liked ? "bg-rose-500 text-white" : "bg-white/90 text-slate-500 hover:text-rose-500"}`}>
                <Heart size={19} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[Truck, ShieldCheck, RotateCcw].map((Icon, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-3 text-center">
                  <Icon size={17} className="mx-auto text-indigo-600" />
                  <p className="text-[11px] font-extrabold mt-1.5">{["Free delivery", "Secure payment", "7-day returns"][i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* info */}
          <div className="bg-white border border-slate-100 rounded-[28px] p-6 sm:p-8 shadow-[0_25px_70px_-30px_rgb(15_23_42/0.3)]">
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-indigo-600 uppercase">{product.category?.replace("-", " & ")}</p>
            <h1 className="text-[28px] sm:text-4xl font-extrabold tracking-tight leading-[1.05] mt-2">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-2.5 mt-4">
              <span className="flex items-center gap-1.5 bg-emerald-500 text-white text-[13px] font-extrabold px-3 py-1.5 rounded-full shadow-md">
                {product.rating} <Star size={13} fill="currentColor" />
              </span>
              <span className="text-[13px] font-semibold text-slate-500">{product.reviews?.toLocaleString()} verified ratings</span>
              <span className="flex items-center gap-1 text-[12px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full"><BadgeCheck size={13} /> Assured quality</span>
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/60 border border-indigo-100/60">
              <div className="flex items-end gap-3">
                <span className="text-[38px] leading-none font-extrabold tracking-tight">₹{product.price.toLocaleString("en-IN")}</span>
                {product.oldPrice && <span className="line-through text-slate-400 font-semibold mb-1">₹{product.oldPrice.toLocaleString("en-IN")}</span>}
              </div>
              <p className="text-[12.5px] font-bold text-emerald-700 mt-1.5">You save ₹{(product.oldPrice - product.price).toLocaleString("en-IN")} ({discount}% off) • Inclusive of all taxes</p>
              <p className="flex items-center gap-1.5 text-[12.5px] font-bold text-orange-700 mt-2"><Zap size={13} fill="currentColor" /> Hurry — only a few left in stock!</p>
            </div>

            <p className="mt-5 text-[14.5px] text-slate-600 leading-7">{product.description}</p>

            <ul className="mt-4 space-y-2 text-[13.5px] font-medium text-slate-600">
              {["✓ 100% genuine product with brand warranty", "✓ Free delivery over ₹499 • COD available", "✓ 7-day no-question returns"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-extrabold">✓</span>{t.slice(2)}</li>
              ))}
            </ul>

            {/* qty + cta */}
            <div className="flex items-center gap-3 mt-7">
              <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-2xl p-1.5">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition"><Minus size={15} strokeWidth={3} /></button>
                <span className="w-9 text-center font-extrabold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition"><Plus size={15} strokeWidth={3} /></button>
              </div>
              <button onClick={() => toggleWishlist(product)} className={`w-[52px] h-[52px] rounded-2xl border flex items-center justify-center transition active:scale-95 ${liked ? "border-rose-200 bg-rose-50 text-rose-500" : "border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50"}`}>
                <Heart size={20} fill={liked ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <button onClick={() => addToCart(product, qty)} className="py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-[14.5px] flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:shadow-[0_15px_35px_-10px_rgb(99_102_241/0.7)] active:scale-[0.98] transition-all">
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <Link to="/checkout" onClick={() => addToCart(product, qty)} className="py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-extrabold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_15px_35px_-10px_rgb(168_85_247/0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                Buy Now →
              </Link>
            </div>
            <p className="text-center text-[12px] font-semibold text-slate-400 mt-3">🚚 Delivering to 560001 • Get it in 2–4 days</p>
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between mb-5">
              <h2 className="text-2xl font-extrabold tracking-tight">You may also like</h2>
              <Link to="/products" className="text-[13px] font-bold text-indigo-600 hover:text-indigo-800">View all →</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
