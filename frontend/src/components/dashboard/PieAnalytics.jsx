const COLORS = ["#6366f1", "#10b981", "#38bdf8", "#f59e0b", "#f43f5e", "#a855f7"];

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export default function PieAnalytics({ data = [], loading = false }) {
  const total = data.reduce((s, d) => s + Number(d.value || 0), 0);
  let acc = 0;
  const slices = data.map((d, i) => {
    const start = acc;
    acc += total ? (Number(d.value || 0) / total) * 360 : 0;
    return { ...d, start, end: acc, color: COLORS[i % COLORS.length] };
  });

  const donutBg =
    slices.length > 0
      ? `conic-gradient(${slices
          .map((s) => {
            const from = total ? (s.start / 360) * 100 : 0;
            const to = total ? (s.end / 360) * 100 : 0;
            return `${s.color} ${from}% ${to}%`;
          })
          .join(", ")})`
      : "#f1f5f9";

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="mb-4">
        <p className="text-[13px] text-slate-500">Category analytics</p>
        <h3 className="text-lg font-bold text-slate-900">Revenue by category</h3>
      </div>
      {loading ? (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">Loading...</div>
      ) : data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">No sales yet</div>
      ) : (
        <>
          <div className="flex items-center justify-center py-2">
            <div className="relative h-48 w-48 rounded-full" style={{ background: donutBg }}>
              <div className="absolute inset-[26px] flex flex-col items-center justify-center rounded-full bg-white shadow-inner">
                <p className="text-2xl font-extrabold text-slate-900">{total.toLocaleString("en-IN")}</p>
                <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400">ORDERS</p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {slices.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 text-[13px]">
                <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="font-semibold text-slate-600 truncate">{s.name}</span>
                <span className="ml-auto font-extrabold text-slate-900">
                  {total ? Math.round((Number(s.value) / total) * 100) : 0}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
