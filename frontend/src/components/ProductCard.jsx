import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useCart } from "./context/CartContext";
import { useWishlist } from "./context/WishlistContext";

const badgeStyle = (badge) => {
  if (badge === "Hot") return "bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-[0_6px_16px_-6px_rgb(244_63_94/0.7)]";
  if (badge === "New") return "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_6px_16px_-6px_rgb(16_185_129/0.7)]";
  return "bg-slate-900 text-white shadow-lg";
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const liked = isWishlisted(product.id);
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="group bg-white rounded-[24px] border border-slate-100 overflow-hidden flex flex-col hover:shadow-[0_25px_60px_-20px_rgb(79_70_229/0.35)] hover:-translate-y-1.5 hover:border-indigo-100 transition-all duration-300">
      <div className="relative overflow-hidden bg-slate-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full tracking-wide ${badgeStyle(product.badge)}`}>
              {product.badge === "Hot" ? "🔥 " : ""}{product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-emerald-700 shadow-md">
              -{discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="wishlist"
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            liked ? "bg-rose-500 text-white" : "bg-white/90 text-slate-500 hover:text-rose-500 hover:scale-110"
          }`}
        >
          <Heart size={16} fill={liked ? "currentColor" : "none"} strokeWidth={2.4} />
        </button>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-3 left-3 right-3 py-2.5 rounded-2xl bg-slate-950/90 backdrop-blur text-white text-[13px] font-bold flex items-center justify-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600"
        >
          <ShoppingCart size={15} /> Quick Add
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-bold tracking-widest text-indigo-500 uppercase">{product.category?.replace("-", " ")}</p>
        <Link to={`/product/${product.id}`} className="font-bold text-[14.5px] text-slate-900 mt-1 line-clamp-1 group-hover:text-indigo-700 transition">
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-700 text-[12px] font-extrabold px-2 py-0.5 rounded-full">
            <Star size={12} fill="currentColor" className="text-amber-500" /> {product.rating}
          </span>
          <span className="text-[12px] text-slate-400 font-medium">({product.reviews?.toLocaleString()})</span>
        </div>
        <div className="flex items-end gap-2 mt-2.5">
          <span className="text-[18px] font-extrabold tracking-tight text-slate-900">₹{product.price.toLocaleString("en-IN")}</span>
          {product.oldPrice && (
            <span className="line-through text-[13px] text-slate-400 font-medium mb-0.5">₹{product.oldPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
        <div className="flex gap-2 mt-3.5 pt-3.5 border-t border-slate-50">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-slate-900 text-white py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:shadow-[0_10px_25px_-8px_rgb(99_102_241/0.7)] active:scale-[0.97] transition-all"
          >
            <ShoppingCart size={14} /> Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-[13px] font-bold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50 transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-56 bg-slate-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-3 w-1/3 bg-slate-100 rounded-full" />
        <div className="h-4 w-full bg-slate-100 rounded-full" />
        <div className="h-4 w-2/3 bg-slate-100 rounded-full" />
      </div>
    </div>
  );
}
