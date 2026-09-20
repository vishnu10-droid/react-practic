import { useMemo, useState } from "react";

const statusStyle = {
  Placed: "bg-amber-100 text-amber-700",
  Pending: "bg-amber-100 text-amber-700",
  Processing: "bg-orange-100 text-orange-700",
  Shipped: "bg-blue-100 text-blue-700",
  Delivered: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

export default function OrdersTable({ orders = [], loading = false }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      orders.filter((o) =>
        [o.id, o.customer, o.product, o.status, o.amount]
          .map((v) => String(v ?? "").toLowerCase())
          .some((v) => v.includes(search.toLowerCase()))
      ),
    [orders, search]
  );

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[13px] text-slate-500">Recent orders</p>
          <h3 className="text-lg font-bold text-slate-900">Order management</h3>
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order..."
          className="rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition"
        />
      </div>
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-indigo-50/70 text-[11px] uppercase tracking-wider text-indigo-700">
              {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="px-3 py-3 font-bold first:rounded-l-xl last:rounded-r-xl whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-400">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-3 py-8 text-center text-sm text-slate-400">No orders yet</td></tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id} className="border-t border-slate-50 text-slate-700 hover:bg-slate-50/60 transition">
                  <td className="px-3 py-3 font-bold text-indigo-600 whitespace-nowrap">#{String(order.id).slice(-6).toUpperCase()}</td>
                  <td className="px-3 py-3 font-medium whitespace-nowrap">{order.customer}</td>
                  <td className="max-w-[220px] truncate px-3 py-3">{order.product}</td>
                  <td className="px-3 py-3 font-bold whitespace-nowrap">₹{Number(order.amount || 0).toLocaleString("en-IN")}</td>
                  <td className="px-3 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap ${statusStyle[order.status] || "bg-slate-100 text-slate-600"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-slate-500">{order.date ? new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
