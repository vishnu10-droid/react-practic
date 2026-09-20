import React, { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SearchX, SlidersHorizontal, X, ChevronDown, Star } from "lucide-react";
import { getProducts, getCategories } from "../store/shopStore";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const products = useMemo(getProducts, []);
  const categories = useMemo(getCategories, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(20000);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const filteredProducts = useMemo(() => {
    let list = products.filter((product) => {
      const matchesSearch = !search || product.name.toLowerCase().includes(search.toLowerCase());
      const categoryData = categories.find((item) => item.name.toLowerCase() === category.toLowerCase());
      const matchesCategory =
        !category || product.category === category.toLowerCase() || product.category === categoryData?.id;
      const matchesPrice = product.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "discount") list = [...list].sort((a, b) => (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice);
    return list;
  }, [products, categories, search, category, sort, maxPrice]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (!value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  return (
    <div className="bg-[#f8fafc] min-h-[70vh]">
      {/* header */}
      <div className="bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute -top-20 right-20 w-96 h-56 bg-indigo-600/30 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 left-20 w-96 h-56 bg-fuchsia-600/20 blur-[80px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-300">CATALOG • {filteredProducts.length} PRODUCTS</p>
          <h1 className="text-3xl sm:text-[40px] font-extrabold tracking-tight mt-1.5">
            {category || (search ? `Results for “${search}”` : "All Products")}
          </h1>
          <p className="text-slate-400 text-[14px] mt-2">Hand-picked quality • Free delivery over ₹499 • Easy returns</p>
          {(search || category) && (
            <div className="flex flex-wrap gap-2 mt-5">
              {search && (
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 rounded-full text-[12.5px] font-bold">
                  Search: {search}
                  <button onClick={() => setParam("search", "")} className="hover:text-rose-300"><X size={13} strokeWidth={3} /></button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 rounded-full text-[12.5px] font-bold">
                  Category: {category}
                  <button onClick={() => setParam("category", "")} className="hover:text-rose-300"><X size={13} strokeWidth={3} /></button>
                </span>
              )}
              <button onClick={() => { setSearchParams({}); setMaxPrice(20000); }} className="px-3.5 py-1.5 rounded-full bg-rose-500/90 hover:bg-rose-500 text-[12.5px] font-bold transition">Clear all</button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-[250px_1fr] gap-6 items-start">
        {/* filters */}
        <aside className="bg-white border border-slate-100 rounded-[22px] p-5 lg:sticky lg:top-32 shadow-[0_15px_45px_-25px_rgb(15_23_42/0.3)]">
          <p className="flex items-center gap-2 font-extrabold text-[14px]"><SlidersHorizontal size={16} className="text-indigo-600" /> Filters</p>

          <div className="mt-5">
            <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mb-2.5">CATEGORY</p>
            <div className="space-y-1">
              <button onClick={() => setParam("category", "")} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition ${!category ? "bg-slate-900 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"}`}>All categories</button>
              {categories.map((c) => (
                <button key={c.id} onClick={() => setParam("category", c.name)} className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-bold transition ${category === c.name ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-50"}`}>{c.name}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mb-2.5">MAX PRICE • <span className="text-slate-900">₹{maxPrice.toLocaleString("en-IN")}</span></p>
            <input type="range" min={400} max={20000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-indigo-600" />
            <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-1"><span>₹400</span><span>₹20,000</span></div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mb-2.5">TOP RATED</p>
            <p className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600"><Star size={14} className="text-amber-500" fill="currentColor" /> 4.0 & above — {products.filter((p) => p.rating >= 4).length} items</p>
          </div>
        </aside>

        {/* grid */}
        <div>
          <div className="flex items-center justify-between gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-3 mb-5">
            <p className="text-[13px] font-bold text-slate-500">{filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found</p>
            <label className="flex items-center gap-2 text-[13px] font-bold text-slate-600">
              <ChevronDown size={14} className="text-slate-400" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] font-bold outline-none focus:border-indigo-400 cursor-pointer">
                <option value="popular">Most popular</option>
                <option value="rating">Highest rated</option>
                <option value="discount">Biggest discount</option>
                <option value="low">Price: low → high</option>
                <option value="high">Price: high → low</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-[26px]">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center"><SearchX size={28} /></div>
              <h2 className="text-xl font-extrabold mt-5">No products found</h2>
              <p className="text-slate-500 text-[13.5px] mt-2">Try a different search or clear the filters.</p>
              <div className="flex justify-center gap-2.5 mt-6">
                <button onClick={() => { setSearchParams({}); setMaxPrice(20000); }} className="px-6 py-3 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-slate-800">Clear filters</button>
                <Link to="/offers" className="px-6 py-3 rounded-xl border border-slate-200 text-[13px] font-bold hover:border-indigo-300 hover:text-indigo-600">View deals</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
