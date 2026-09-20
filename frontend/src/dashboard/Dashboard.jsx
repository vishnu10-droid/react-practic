import { useMemo, useState } from "react";
import {
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import DashSidebar from "../layouts/DashSidebar";
import DashNavbar from "../layouts/DashNavbar";
import { Modal } from "./components/ui";
import ProductForm from "./components/ProductForm";
import CategoryForm from "./components/CategoryForm";
import CouponForm from "./components/CouponForm";
import OverviewPage from "./pages/OverviewPage";
import OrdersPage from "./pages/OrdersPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CustomersPage from "./pages/CustomersPage";
import CouponsPage from "./pages/CouponsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import {
  getProducts,
  deleteProduct,
  getCategories,
  deleteCategory,
  getCoupons,
  deleteCoupon,
} from "../store/shopStore";

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

  const closeModal = () => {
    setModal(null);
    setEditingProduct(null);
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
            {active === "overview" && (
              <OverviewPage
                user={user}
                cards={cards}
                monthly={monthly}
                categoryShare={categoryShare}
                hasCatalog={catalog.length > 0}
                orderRows={orderRows}
                topProducts={topProducts}
                lowStock={lowStock}
                onAction={setActive}
              />
            )}
            {active === "orders" && <OrdersPage orders={filteredOrders} query={query} />}
            {active === "products" && (
              <ProductsPage
                catalog={catalog}
                onAdd={() => openAdd("product")}
                onEdit={(p) => openAdd("product", p)}
                onDelete={handleDeleteProduct}
              />
            )}
            {active === "categories" && (
              <CategoriesPage cats={cats} catalog={catalog} onAdd={() => openAdd("category")} onDelete={handleDeleteCategory} />
            )}
            {active === "customers" && <CustomersPage customers={customers} revenue={revenue} />}
            {active === "coupons" && (
              <CouponsPage
                coupons={coupons}
                onAdd={() => openAdd("coupon")}
                onDelete={(code) => { deleteCoupon(code); refresh(); }}
                copied={copied}
                onCopy={copyCode}
              />
            )}
            {active === "reviews" && <ReviewsPage catalog={catalog} />}
            {active === "reports" && (
              <ReportsPage monthly={monthly} categoryShare={categoryShare} hasCatalog={catalog.length > 0} />
            )}
            {active === "settings" && <SettingsPage />}
          </main>
        </div>
      </div>

      {/* ---------- MODALS ---------- */}
      {modal && (
        <Modal
          title={modal === "product" ? (editingProduct ? "Edit Product" : "Add Product") : modal === "category" ? "Add Category" : "Add Coupon"}
          onClose={closeModal}
        >
          {modal === "product" && (
            <ProductForm
              key={editingProduct?.id || "new"}
              initial={editingProduct}
              categories={cats}
              onClose={closeModal}
              onSaved={() => { closeModal(); refresh(); }}
            />
          )}
          {modal === "category" && <CategoryForm onClose={closeModal} onSaved={() => { closeModal(); refresh(); }} />}
          {modal === "coupon" && <CouponForm onClose={closeModal} onSaved={() => { closeModal(); refresh(); }} />}
        </Modal>
      )}
    </div>
  );
}
