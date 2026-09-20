export default function SalesChart({ data = [], loading = false }) {
  const total = data.reduce((sum, m) => sum + Number(m.sales || 0), 0);
  const max = Math.max(1, ...data.map((m) => Number(m.sales || 0)));
  const W = 600;
  const H = 220;
  const PAD = 8;

  const pts = data.map((m, i) => {
    const x = PAD + (i / Math.max(1, data.length - 1)) * (W - PAD * 2);
    const y = H - 24 - (Number(m.sales || 0) / max) * (H - 60);
    return { x, y, ...m };
  });
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${PAD},${H - 24} ${line} ${W - PAD},${H - 24}`;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] text-slate-500">Sales overview</p>
          <h3 className="text-lg font-bold text-slate-900">Orders per month</h3>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
          {loading ? "Loading..." : `${total} orders`}
        </span>
      </div>
      <div className="h-64">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Loading...</div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">No orders yet</div>
        ) : (
          <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="salesFillSk" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            {[40, 90, 140, 190].map((y) => (
              <line key={y} x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="#e8edf5" strokeDasharray="4 4" strokeWidth="1" />
            ))}
            <polygon points={area} fill="url(#salesFillSk)" />
            <polyline points={line} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#6366f1" strokeWidth="2.5" />
            ))}
          </svg>
        )}
      </div>
      {!loading && data.length > 0 && (
        <div className="mt-1 flex justify-between text-[11px] font-bold text-slate-400">
          {data.map((m) => (
            <span key={m.month}>{m.month}</span>
          ))}
        </div>
      )}
    </div>
  );
}
