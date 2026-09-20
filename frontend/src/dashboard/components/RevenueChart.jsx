export default function RevenueChart({ data = [], loading = false }) {
  const total = data.reduce((sum, m) => sum + Number(m.revenue || 0), 0);
  const max = Math.max(1, ...data.map((m) => Number(m.revenue || 0)));
  const W = 600;
  const H = 220;
  const PAD = 8;

  const pts = data.map((m, i) => {
    const x = PAD + (i / Math.max(1, data.length - 1)) * (W - PAD * 2);
    const y = H - 24 - (Number(m.revenue || 0) / max) * (H - 60);
    return { x, y };
  });
  const line = pts.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[13px] text-slate-500">Revenue chart</p>
          <h3 className="text-lg font-bold text-slate-900">Monthly growth</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
          {loading ? "Loading..." : `₹${total.toLocaleString("en-IN")}`}
        </span>
      </div>
      <div className="h-60">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">Loading...</div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">No revenue yet</div>
        ) : (
          <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="none">
            {[40, 90, 140, 190].map((y) => (
              <line key={y} x1={PAD} x2={W - PAD} y1={y} y2={y} stroke="#e8edf5" strokeDasharray="4 4" strokeWidth="1" />
            ))}
            <polyline points={line} fill="none" stroke="#10b981" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {pts.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4.5" fill="#10b981" stroke="#fff" strokeWidth="2" />
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
