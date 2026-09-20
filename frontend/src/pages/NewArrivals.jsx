import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { getProducts } from "../store/shopStore";
import ProductCard from "../components/ProductCard";

export default function NewArrivals() {
  const products = useMemo(getProducts, []);
  const newProducts = products.filter((p) => p.badge === "New");

  return (
    <div className="bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 text-white p-8 sm:p-12">
          <div className="absolute inset-0 dot-grid opacity-30" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.25) 1px, transparent 0)" }} />
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/15 blur-2xl rounded-full" />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 backdrop-blur px-3.5 py-1.5 rounded-full text-[12px] font-extrabold"><Sparkles size={13} /> FRESH DROP • {newProducts.length} NEW PRODUCTS</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">New Arrivals ✨</h1>
              <p className="text-indigo-100 mt-2.5 text-[14.5px] max-w-md">The latest launches everyone's talking about — be the first to own them.</p>
            </div>
            <div className="flex -space-x-4 shrink-0">
              {newProducts.slice(0, 4).map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="w-20 h-20 rounded-3xl overflow-hidden border-[3px] border-white/80 shadow-2xl hover:-translate-y-2 hover:rotate-3 transition-transform">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {newProducts.map((p) => (<ProductCard key={p.id} product={p} />))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-[14px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition-all">Explore everything <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  );
}
