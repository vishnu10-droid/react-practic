import { SectionHead, EmptyBox } from "../components/ui";

export default function CustomersPage({ customers, revenue }) {
  return (
    <section className="space-y-5">
      <SectionHead title="Customers" text={customers.length ? `${customers.length} customers` : "No customers yet"} />
      {customers.length === 0 ? (
        <EmptyBox title="No customers yet" text="Customers appear here after their first order." noAction />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {customers.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-sm font-extrabold text-white">
                {c.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="mt-3 font-bold text-slate-900">{c.name}</p>
              <p className="mt-1 text-[13px] text-slate-500 font-medium">{c.orders} orders • <b className="text-slate-800">₹{c.spent.toLocaleString("en-IN")}</b> spent</p>
              <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-fuchsia-500" style={{ width: `${Math.min(100, (c.spent / Math.max(1, revenue)) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
