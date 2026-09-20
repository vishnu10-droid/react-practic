import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const styles = {
  electronics: { icon: "⚡", grad: "from-violet-500 to-indigo-600", bg: "bg-violet-50", ring: "group-hover:ring-violet-200" },
  fashion: { icon: "👗", grad: "from-pink-500 to-rose-500", bg: "bg-pink-50", ring: "group-hover:ring-pink-200" },
  mobiles: { icon: "📱", grad: "from-blue-500 to-cyan-500", bg: "bg-blue-50", ring: "group-hover:ring-blue-200" },
  beauty: { icon: "💄", grad: "from-fuchsia-500 to-purple-500", bg: "bg-fuchsia-50", ring: "group-hover:ring-fuchsia-200" },
  shoes: { icon: "👟", grad: "from-orange-500 to-amber-500", bg: "bg-orange-50", ring: "group-hover:ring-orange-200" },
  "home-kitchen": { icon: "🏠", grad: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", ring: "group-hover:ring-emerald-200" },
};

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const s = styles[category.id] || { icon: "🛍️", grad: "from-indigo-500 to-fuchsia-500", bg: "bg-indigo-50", ring: "group-hover:ring-indigo-200" };

  return (
    <button
      onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
      className={`group relative bg-white border border-slate-100 rounded-[22px] p-5 text-center overflow-hidden hover:shadow-[0_20px_45px_-18px_rgb(15_23_42/0.3)] hover:-translate-y-1 hover:border-transparent hover:ring-4 ${s.ring} transition-all duration-300`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.grad} opacity-0 group-hover:opacity-100 transition`} />
      <div className={`w-14 h-14 mx-auto rounded-2xl ${s.bg} flex items-center justify-center text-[28px] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
        <span className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-[22px] shadow-lg`}>{s.icon}</span>
      </div>
      <p className="font-extrabold text-[13.5px] text-slate-800 mt-3 tracking-tight">{category.name}</p>
      <p className="text-[11.5px] text-slate-400 font-semibold mt-0.5 flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition">
        Explore <ArrowUpRight size={12} />
      </p>
    </button>
  );
}
