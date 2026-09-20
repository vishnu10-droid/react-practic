export default function TopProducts({ products = [], loading = false }) {
  const max = Math.max(1, ...products.map((p) => Number(p.sold || 0)));

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <p className="text-[13px] text-slate-500">Top selling products</p>
      <h3 className="mb-4 text-lg font-bold text-slate-900">Best performers</h3>
      {loading ? (
        <p className="py-6 text-center text-sm text-slate-400">Loading...</p>
      ) : products.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-400">No sales yet</p>
      ) : (
        <div className="space-y-3.5">
          {products.map((product) => (
            <div key={product.name} className="rounded-xl bg-slate-50/80 border border-slate-100 p-3">
              <div className="mb-2 flex items-center justify-between gap-2 text-[13px]">
                <span className="font-bold text-slate-800 truncate">{product.name}</span>
                <span className="text-slate-500 font-semibold whitespace-nowrap">{Number(product.sold).toLocaleString("en-IN")} sold</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200/70 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500 transition-all duration-700"
                  style={{ width: `${Math.max(6, (Number(product.sold) / max) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
