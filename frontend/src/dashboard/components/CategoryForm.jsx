import { useState } from "react";
import { saveCategory } from "../../store/shopStore";
import { inputCls } from "./ui";

export default function CategoryForm({ onClose, onSaved }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    saveCategory(name);
    onSaved();
  };

  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <input autoFocus required placeholder="Category name — e.g. Watches" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      <p className="text-xs text-slate-400 font-medium">New categories appear instantly in the store menu & filters.</p>
      <div className="flex gap-2.5 pt-1">
        <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
        <button type="submit" className="flex-[2] rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3.5 text-sm font-extrabold text-white shadow-lg hover:opacity-95 active:scale-[0.98]">Add Category</button>
      </div>
    </form>
  );
}
