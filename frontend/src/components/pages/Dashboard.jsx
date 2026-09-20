import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Wallet,
  Leaf,
  Star,
  Copy,
  Check,
  Store,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import DashSidebar from "../layout/DashSidebar";
import DashNavbar from "../layout/DashNavbar";
import StatsCard from "../dashboard/StatsCard";
import SalesChart from "../dashboard/SalesChart";
import RevenueChart from "../dashboard/RevenueChart";
import PieAnalytics from "../dashboard/PieAnalytics";
import OrdersTable from "../dashboard/OrdersTable";
import TopProducts from "../dashboard/TopProducts";
import LowStock from "../dashboard/LowStock";
import QuickActions from "../dashboard/QuickActions";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  getCategories,
  saveCategory,
  deleteCategory,
  getCoupons,
  saveCoupon,
  deleteCoupon,
  slugify,
} from "../../store/shopStore";

/* ---------------- helpers ---------------- */

function getUser() {
  try {
    return (
      JSON.parse(localStorage.getItem("user") || localStorage.getItem("shopkart_user") || "null") || {
        name: "Admin",
        email: "admin@shopkart.in",
      }
    );
  } catch {
    return { name: "Admin", email: "admin@shopkart.in" };
  }
}

function getStoredOrders() {
  try {
    const o = JSON.parse(localStorage.getItem("shopkart_orders") || "[]");
    return Array.isArray(o) ? o : [];
  } catch {
    return [];
  }
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function lastMonths(n = 8) {
  const now = new Date();
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS[d.getMonth()] });
  }
  return out;
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400 placeholder:font-normal";

export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState("");
  const [version, setVersion] = useState(0);
  const [modal, setModal] = useState(null); // 'product' | 'category' | 'coupon' | null
  const [editingProduct, setEditingProduct] = useState(null);

  const refresh = () => setVersion((v) => v + 1);

  const user = useMemo(getUser, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const catalog = useMemo(getProducts, [version]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cats = useMemo(getCategories, [version]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const coupons = useMemo(getCoupons, [version]);
  const storedOrders = useMemo(getStoredOrders, [version]);

  /* real order rows only — no demo data */
  const orderRows = useMemo(
    () =>
      storedOrders.map((o) => ({
        id: o.id,
        customer: o.customer?.name || "Guest",
        product: (o.items || []).map((i) => i.name).join(", ") || "—",
        amount: o.total || 0,
        status: o.status || "Placed",
        date: o.date,
      })),
    [storedOrders]
  );

  const revenue = useMemo(() => storedOrders.reduce((s, o) => s + Number(o.total || 0), 0), [storedOrders]);

  const monthly = useMemo(() => {
    const slots = lastMonths(8);
    const byKey = {};
    storedOrders.forEach((o) => {
      const d = new Date(o.date);
      if (isNaN(d)) return;
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      if (!byKey[k]) byKey[k] = { sales: 0, revenue: 0 };
      byKey[k].sales += 1;
      byKey[k].revenue += Number(o.total || 0);
    });
    return slots.map((s) => ({ month: s.label, sales: byKey[s.key]?.sales || 0, revenue: byKey[s.key]?.revenue || 0 }));
  }, [storedOrders]);

  const categoryShare = useMemo(() => {
    const byCat = {};
    catalog.forEach((p) => {
      const c = cats.find((x) => x.id === p.category);
      const name = c ? c.name : p.category;
      byCat[name] = (byCat[name] || 0) + (p.reviews || 0) + 1;
    });
    return Object.entries(byCat).map(([name, value]) => ({ name, value }));
  }, [catalog, cats]);

  /* top products from REAL sales only */
  const topProducts = useMemo(() => {
    const sold = {};
    storedOrders.forEach((o) =>
      (o.items || []).forEach((i) => {
        sold[i.name] = (sold[i.name] || 0) + (i.quantity || 1);
      })
    );
    return Object.entries(sold)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, sold: count }));
  }, [storedOrders]);

  const lowStock = useMemo(
    () => catalog.filter((p) => Number(p.stock ?? 99) <= 9).slice(0, 6).map((p) => ({ id: p.id, name: p.name, stock: p.stock })),
    [catalog]
  );

  const customers = useMemo(() => {
    const map = {};
    storedOrders.forEach((o) => {
      const n = o.customer?.name || "Guest";
      if (!map[n]) map[n] = { name: n, orders: 0, spent: 0 };
      map[n].orders += 1;
      map[n].spent += Number(o.total || 0);
    });
    return Object.values(map).sort((a, b) => b.spent - a.spent);
  }, [storedOrders]);

  const notifications = useMemo(
    () => [
      ...orderRows
        .filter((o) => ["Placed", "Pending", "Processing"].includes(o.status))
        .slice(0, 4)
        .map((o) => ({
          id: `order-${o.id}`,
          title: `New order #${String(o.id).slice(-6).toUpperCase()}`,
          subtitle: `${o.customer} · ₹${Number(o.amount).toLocaleString("en-IN")} · ${o.status}`,
          tone: "order",
        })),
      ...lowStock.slice(0, 3).map((p) => ({
        id: `stock-${p.id}`,
        title: `Low stock: ${p.name}`,
        subtitle: `Only ${p.stock} left in inventory`,
        tone: "stock",
      })),
    ],
    [orderRows, lowStock]
  );

  const filteredOrders = orderRows.filter(
    (o) =>
      !query ||
      [o.id, o.customer, o.product, o.status].map((v) => String(v ?? "").toLowerCase()).some((v) => v.includes(query.toLowerCase()))
  );

  const copyCode = (code) => {
    try { navigator.clipboard?.writeText(code); } catch { /* noop */ }
    setCopied(code);
    setTimeout(() => setCopied(""), 1500);
  };

  const openAdd = (kind, product = null) => {
    setEditingProduct(product);
    setModal(kind);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Delete this product? It will disappear from the store.")) {
      deleteProduct(id);
      refresh();
    }
  };

  const handleDeleteCategory = (id, name) => {
    const used = catalog.filter((p) => p.category === id).length;
    if (!window.confirm(`Delete category “${name}”?${used ? ` ${used} product(s) use it.` : ""}`)) return;
    deleteCategory(id);
    refresh();
  };

  const firstName = (user.name || "Admin").split(" ")[0];

  const cards = [
    { title: "Total Products", value: catalog.length, subtitle: "live count", tone: "emerald", icon: Package },
    { title: "Total Categories", value: cats.length, subtitle: "live count", tone: "blue", icon: Boxes },
    { title: "Total Orders", value: storedOrders.length, subtitle: "all time", tone: "amber", icon: ShoppingCart },
    { title: "Total Customers", value: customers.length, subtitle: "ordered at least once", tone: "rose", icon: Users },
    { title: "Revenue", value: revenue, prefix: "₹", subtitle: "excl. cancelled", tone: "violet", icon: Wallet },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-slate-900">
      <div className="flex min-h-screen">
        <DashSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((c) => !c)}
          active={active}
          onNavigate={setActive}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex-1 min-w-0">
          <DashNavbar
            user={user}
            query={query}
            onQuery={setQuery}
            onMenu={() => setMobileOpen(true)}
            notifications={notifications}
            onOpenOrders={(key) => setActive(key === "settings" ? "settings" : "orders")}
          />

          <main className="relative space-y-6 overflow-hidden p-4 md:p-6 lg:p-8">
            {/* ---------- OVERVIEW ---------- */}
            {active === "overview" && (
              <>
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

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {cards.map((c) => (
                    <StatsCard key={c.title} {...c} />
                  ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.45fr_0.95fr]">
                  <SalesChart data={monthly} />
                  <PieAnalytics data={catalog.length ? categoryShare : []} />
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
                  <RevenueChart data={monthly} />
                  <QuickActions onAction={setActive} />
                </div>

                <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
                  <OrdersTable orders={orderRows} />
                  <div className="space-y-5">
                    <TopProducts products={topProducts} />
                    <LowStock items={lowStock} />
                  </div>
                </div>
              </>
            )}

            {/* ---------- ORDERS ---------- */}
            {active === "orders" && (
              <section className="space-y-5">
                <SectionHead title="Orders" text={`${filteredOrders.length} orders ${query ? `matching “${query}”` : "in total"}`} />
                <OrdersTable orders={filteredOrders} />
              </section>
            )}

            {/* ---------- PRODUCTS ---------- */}
            {active === "products" && (
              <section className="space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHead title="Products" text={`${catalog.length} products • live on store`} />
                  <button onClick={() => openAdd("product")} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
                    <Plus size={16} strokeWidth={3} /> Add Product
                  </button>
                </div>
                {catalog.length === 0 ? (
                  <EmptyBox title="No products yet" text="Add your first product to start selling." action={() => openAdd("product")} actionLabel="Add Product" />
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {catalog.map((p) => {
                      const low = Number(p.stock ?? 99) <= 9;
                      return (
                        <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 hover:shadow-lg transition-all">
                          <div className="flex gap-3.5">
                            <img src={p.image} alt={p.name} className="h-16 w-16 rounded-xl object-cover shrink-0 bg-slate-100" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[13.5px] font-bold text-slate-900">{p.name}</p>
                              <p className="mt-0.5 text-xs font-semibold text-slate-400 capitalize">{String(p.category).replace("-", " ")} • ★ {p.rating}</p>
                              <p className="mt-1 text-[14px] font-extrabold">₹{Number(p.price).toLocaleString("en-IN")} {p.oldPrice ? <span className="font-medium text-slate-400 line-through text-xs">₹{Number(p.oldPrice).toLocaleString("en-IN")}</span> : null}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center justify-between border-t border-slate-50 pt-3">
                            <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${low ? "bg-amber-100 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                              {low ? `Only ${p.stock} left` : `${p.stock} in stock`}
                            </span>
                            <div className="flex items-center gap-1">
                              <Link to={`/product/${p.id}`} className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50">View</Link>
                              <button onClick={() => openAdd("product", p)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Edit"><Pencil size={14} /></button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete"><Trash2 size={14} /></button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* ---------- CATEGORIES ---------- */}
            {active === "categories" && (
              <section className="space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHead title="Categories" text={`${cats.length} categories`} />
                  <button onClick={() => openAdd("category")} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
                    <Plus size={16} strokeWidth={3} /> Add Category
                  </button>
                </div>
                {cats.length === 0 ? (
                  <EmptyBox title="No categories yet" text="Create your first category to organise products." action={() => openAdd("category")} actionLabel="Add Category" />
                ) : (
                  <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
                    {cats.map((c) => {
                      const count = catalog.filter((p) => p.category === c.id).length;
                      return (
                        <div key={c.id} className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-lg shrink-0">🛍️</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-bold text-slate-900 text-[14px]">{c.name}</p>
                            <p className="text-xs font-semibold text-slate-400">{count} product{count !== 1 ? "s" : ""}</p>
                          </div>
                          <button onClick={() => handleDeleteCategory(c.id, c.name)} className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete"><Trash2 size={15} /></button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {/* ---------- CUSTOMERS ---------- */}
            {active === "customers" && (
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
            )}

            {/* ---------- COUPONS ---------- */}
            {active === "coupons" && (
              <section className="space-y-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <SectionHead title="Coupons" text={coupons.length ? `${coupons.length} active coupon${coupons.length !== 1 ? "s" : ""}` : "No coupons yet"} />
                  <button onClick={() => openAdd("coupon")} className="flex items-center gap-1.5 rounded-xl bg-slate-950 px-5 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition-all active:scale-95">
                    <Plus size={16} strokeWidth={3} /> Add Coupon
                  </button>
                </div>
                {coupons.length === 0 ? (
                  <EmptyBox title="No coupons yet" text="Create your first coupon — it works instantly at checkout." action={() => openAdd("coupon")} actionLabel="Add Coupon" />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {coupons.map((c) => (
                      <div key={c.code} className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 p-6 text-white shadow-lg">
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/15 blur-xl" />
                        <p className="text-[11px] font-extrabold tracking-[0.2em] text-white/70">COUPON • {c.percent}% OFF</p>
                        <p className="mt-1 text-2xl font-extrabold tracking-[0.12em]">{c.code}</p>
                        <div className="mt-4 flex items-center gap-2">
                          <button onClick={() => copyCode(c.code)} className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[12.5px] font-extrabold text-slate-900 hover:bg-slate-100 transition">
                            {copied === c.code ? <><Check size={14} strokeWidth={3} /> Copied!</> : <><Copy size={14} /> Copy</>}
                          </button>
                          <button onClick={() => { deleteCoupon(c.code); refresh(); }} className="rounded-xl border border-white/30 px-3.5 py-2.5 text-[12.5px] font-bold text-white hover:bg-white/15 transition" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ---------- REVIEWS ---------- */}
            {active === "reviews" && (
              <section className="space-y-5">
                <SectionHead title="Reviews" text="Catalog ratings (written by customers on the store)" />
                <div className="grid gap-4 md:grid-cols-2">
                  {[...catalog].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6).map((p) => (
                    <div key={p.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt="" className="h-11 w-11 rounded-xl object-cover bg-slate-100" />
                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-bold">{p.name}</p>
                          <p className="flex items-center gap-1 text-xs font-bold text-amber-600"><Star size={12} fill="currentColor" /> {p.rating} • {(p.reviews || 0).toLocaleString("en-IN")} reviews</p>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-amber-400" style={{ width: `${((p.rating || 0) / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ---------- REPORTS ---------- */}
            {active === "reports" && (
              <section className="space-y-5">
                <SectionHead title="Reports" text="Sales & revenue analytics" />
                <SalesChart data={monthly} />
                <div className="grid gap-5 xl:grid-cols-2">
                  <RevenueChart data={monthly} />
                  <PieAnalytics data={catalog.length ? categoryShare : []} />
                </div>
              </section>
            )}

            {/* ---------- SETTINGS ---------- */}
            {active === "settings" && (
              <section className="space-y-5">
                <SectionHead title="Settings" text="Store preferences" />
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white shadow-lg">
                      <Store size={22} />
                    </span>
                    <div>
                      <p className="font-extrabold text-lg">ShopKart Store</p>
                      <p className="text-sm text-slate-500">Bengaluru, India • INR (₹)</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                    {[
                      ["STORE NAME", "ShopKart"],
                      ["SUPPORT EMAIL", "care@shopkart.in"],
                      ["FREE SHIPPING ABOVE", "₹499"],
                      ["RETURN WINDOW", "7 days"],
                    ].map(([label, val]) => (
                      <label key={label} className="block">
                        <span className="text-xs font-bold text-slate-500">{label}</span>
                        <input defaultValue={val} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-400 focus:bg-white" />
                      </label>
                    ))}
                  </div>
                  <button className="mt-5 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-indigo-600 transition">Save changes</button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* ---------- MODALS ---------- */}
      {modal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setModal(null)} />
          <div className="relative w-full max-w-lg rounded-[26px] bg-white p-6 sm:p-7 shadow-2xl anim-fade-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-extrabold tracking-tight">
                {modal === "product" ? (editingProduct ? "Edit Product" : "Add Product") : modal === "category" ? "Add Category" : "Add Coupon"}
              </h3>
              <button onClick={() => setModal(null)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
            </div>

            {modal === "product" && (
              <ProductForm
                key={editingProduct?.id || "new"}
                initial={editingProduct}
                categories={cats}
                onClose={() => { setModal(null); setEditingProduct(null); }}
                onSaved={() => { setModal(null); setEditingProduct(null); refresh(); }}
              />
            )}
            {modal === "category" && (
              <CategoryForm
                onClose={() => setModal(null)}
                onSaved={() => { setModal(null); refresh(); }}
              />
            )}
            {modal === "coupon" && (
              <CouponForm
                onClose={() => setModal(null)}
                onSaved={() => { setModal(null); refresh(); }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- small pieces ---------------- */

function SectionHead({ title, text }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">Admin • {title}</p>
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{title}</h2>
      <p className="mt-0.5 text-[13px] font-medium text-slate-500">{text}</p>
    </div>
  );
}

function EmptyBox({ title, text, action, actionLabel, noAction }) {
  return (
    <div className="rounded-[24px] border-2 border-dashed border-slate-200 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Package size={24} />
      </div>
      <p className="mt-4 font-extrabold text-lg">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
      {!noAction && action && (
        <button onClick={action} className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-slate-950 px-6 py-3 text-[13px] font-extrabold text-white hover:bg-indigo-600 transition">
          <Plus size={15} strokeWidth={3} /> {actionLabel}
        </button>
      )}
    </div>
  );
}

function ProductForm({ initial, categories, onClose, onSaved }) {
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

function CategoryForm({ onClose, onSaved }) {
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

function CouponForm({ onClose, onSaved }) {
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState(10);
  const submit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    saveCoupon({ code, percent });
    onSaved();
  };
  return (
    <form onSubmit={submit} className="grid gap-3.5">
      <input autoFocus required placeholder="Code — e.g. DIWALI20" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className={`${inputCls} uppercase font-extrabold tracking-[0.12em]`} />
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-extrabold tracking-widest text-slate-400">DISCOUNT • {percent}%</span>
        <input type="range" min={1} max={90} value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full accent-indigo-600" />
      </label>
      <p className="text-xs text-slate-400 font-medium">Works instantly at checkout once created.</p>
      <div className="flex gap-2.5 pt-1">
        <button type="button" onClick={onClose} className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
        <button type="submit" className="flex-[2] rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 py-3.5 text-sm font-extrabold text-white shadow-lg hover:opacity-95 active:scale-[0.98]">Add Coupon</button>
      </div>
    </form>
  );
}
