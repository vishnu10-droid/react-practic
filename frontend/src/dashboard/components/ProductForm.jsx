import { useState } from "react";
import { saveProduct, slugify } from "../../store/shopStore";
import { inputCls } from "./ui";

export default function ProductForm({ initial, categories, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    category: initial?.category || categories[0]?.id || "",
    price: initial?.price ?? "",
    oldPrice: initial?.oldPrice ?? "",
    stock: initial?.stock ?? 20,
    image: initial?.image || "",
    badge: initial?.badge || "New",
    description: initial?.description || "",
  });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    const price = Number(form.price);
    const oldPrice = Number(form.oldPrice) || price;
    saveProduct({
      ...(initial?.id ? { id: initial.id } : {}),
      name: form.name.trim(),
      category: form.category,
      price,
      oldPrice: Math.max(oldPrice, price),
      stock: Math.max(0, Number(form.stock) || 0),
      image: form.image.trim() || `https://picsum.photos/seed/${slugify(form.name)}/600/600`,
      badge: form.badge,
      description: form.description.trim(),
      rating: initial?.rating ?? 4,
      reviews: initial?.reviews ?? 0,
    });
    onSaved();
  };

  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <input required placeholder="Product name" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} />
      <div className="grid grid-cols-2 gap-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">CATEGORY</span>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={`${inputCls} cursor-pointer`}>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">BADGE</span>
          <select value={form.badge} onChange={(e) => set("badge", e.target.value)} className={`${inputCls} cursor-pointer`}>
            {["New", "Hot", "Sale"].map((b) => (<option key={b}>{b}</option>))}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">PRICE ₹</span>
          <input required type="number" min="1" placeholder="999" value={form.price} onChange={(e) => set("price", e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">MRP ₹</span>
          <input type="number" min="0" placeholder="1999" value={form.oldPrice} onChange={(e) => set("oldPrice", e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">STOCK</span>
          <input type="number" min="0" value={form.stock} onChange={(e) => set("stock", e.target.value)} className={inputCls} />
        </label>
      </div>
      <input placeholder="Image URL (optional — auto if blank)" value={form.image} onChange={(e) => set("image", e.target.value)} className={inputCls} />
      <textarea placeholder="Short description" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className={`${inputCls} resize-none`} />
      <div className="flex gap-2.5 pt-1">
        <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
        <button type="submit" className="flex-[2] rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3.5 text-sm font-extrabold text-white shadow-lg hover:opacity-95 active:scale-[0.98]">
          {initial ? "Save changes" : "Add Product"}
        </button>
      </div>
    </form>
  );
}
