import { useEffect, useState } from "react";

const palettes = {
  emerald: { icon: "bg-emerald-100 text-emerald-700", line: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
  blue: { icon: "bg-blue-100 text-blue-700", line: "bg-blue-500", badge: "bg-blue-50 text-blue-700" },
  amber: { icon: "bg-amber-100 text-amber-700", line: "bg-amber-500", badge: "bg-amber-50 text-amber-700" },
  rose: { icon: "bg-rose-100 text-rose-700", line: "bg-rose-500", badge: "bg-rose-50 text-rose-700" },
  violet: { icon: "bg-violet-100 text-violet-700", line: "bg-violet-500", badge: "bg-violet-50 text-violet-700" },
};

export default function StatsCard({ icon: Icon, title, value, growth, subtitle, tone = "emerald", prefix = "", loading = false }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 900, 1);
      setDisplayValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  const palette = palettes[tone] || palettes.emerald;

  if (loading) {
    return <div className="h-36 animate-pulse rounded-3xl bg-white border border-slate-100" />;
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.07)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]">
      <div className={`absolute inset-x-0 top-0 h-1 ${palette.line}`} />
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500">{title}</p>
          <p className="mt-2.5 text-[28px] leading-none font-bold tracking-tight text-slate-900">
            {prefix}{displayValue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className={`rounded-2xl p-3 transition group-hover:scale-110 ${palette.icon}`}>
          <Icon size={21} />
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs">
        {growth !== null && growth !== undefined ? (
          <span className={`rounded-full px-2.5 py-1 font-bold ${palette.badge}`}>+{growth}%</span>
        ) : (
          <span className={`rounded-full px-2.5 py-1 font-bold ${palette.badge}`}>Live</span>
        )}
        <span className="text-slate-400 font-medium">{subtitle}</span>
      </div>
    </div>
  );
}
