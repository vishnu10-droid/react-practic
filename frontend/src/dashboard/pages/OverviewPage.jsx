import { ArrowUpRight, Sparkles, Leaf } from "lucide-react";
import StatsCard from "../components/StatsCard";
import SalesChart from "../components/SalesChart";
import RevenueChart from "../components/RevenueChart";
import PieAnalytics from "../components/PieAnalytics";
import OrdersTable from "../components/OrdersTable";
import TopProducts from "../components/TopProducts";
import LowStock from "../components/LowStock";
import QuickActions from "../components/QuickActions";

export default function OverviewPage({ user, cards, monthly, categoryShare, hasCatalog, orderRows, topProducts, lowStock, onAction }) {
  const firstName = (user.name || "Admin").split(" ")[0];

  return (
    <>
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-[0_22px_55px_rgba(2,6,23,0.35)] md:p-8">
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-44 w-44 rounded-full border border-white/10" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
              <Sparkles size={14} /> Your ShopKart business, at a glance
            </div>
            <p className="mt-5 text-sm font-medium text-slate-300">Good morning, {firstName}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Grow with clarity.
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300/90">
              Monitor inventory, fulfil orders, and keep every customer moment moving smoothly.
            </p>
          </div>
          <div className="flex min-w-[190px] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
            <span className="rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-2.5 text-white">
              <Leaf size={20} />
            </span>
            <div>
              <p className="text-xs text-slate-300">Store health</p>
              <p className="mt-0.5 font-semibold">All systems ready</p>
            </div>
            <ArrowUpRight className="ml-auto text-slate-300" size={18} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((c) => (
          <StatsCard key={c.title} {...c} />
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
        <SalesChart data={monthly} />
        <PieAnalytics data={hasCatalog ? categoryShare : []} />
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <RevenueChart data={monthly} />
        <QuickActions onAction={onAction} />
      </div>

      {/* Tables row */}
      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <OrdersTable orders={orderRows} />
        <div className="space-y-5">
          <TopProducts products={topProducts} />
          <LowStock items={lowStock} />
        </div>
      </div>
    </>
  );
}
