import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 px-4">
        <div className="w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-inner"><Heart size={38} className="text-rose-400" /></div>
        <h1 className="text-3xl font-extrabold mt-6 tracking-tight">Wishlist is empty</h1>
        <p className="text-slate-500 mt-2 text-[14px]">Tap the heart on any product to save it here for later.</p>
        <Link to="/products" className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-[14px] hover:bg-gradient-to-r hover:from-rose-500 hover:to-pink-500 transition-all">Browse products <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-rose-500">❤ SAVED FOR LATER</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">My Wishlist <span className="text-lg font-bold text-slate-400">({wishlist.length})</span></h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-7">
          {wishlist.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      </div>
    </div>
  );
}
