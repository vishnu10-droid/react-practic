import { products as seedProducts, categories as seedCategories } from "../data/products.js";

const KEYS = {
  products: "shopkart_admin_products",
  categories: "shopkart_admin_categories",
  coupons: "shopkart_coupons",
};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function write(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export const defaultStock = (id) => ((Number(id) || 1) * 37) % 18 + 2;

export const slugify = (name) =>
  String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `item-${Date.now()}`;

/* ---------------- Products (seeded once from catalog) ---------------- */

export function getProducts() {
  let list = read(KEYS.products, null);
  if (!Array.isArray(list)) {
    list = seedProducts.map((p) => ({ stock: defaultStock(p.id), rating: 4, reviews: 0, badge: "New", description: "", ...p }));
    write(KEYS.products, list);
  }
  return list;
}

export function saveProduct(prod) {
  const list = getProducts();
  const idx = list.findIndex((p) => String(p.id) === String(prod.id));
  if (idx >= 0) list[idx] = { ...list[idx], ...prod };
  else list.unshift({ id: Date.now(), rating: 4, reviews: 0, badge: "New", ...prod });
  write(KEYS.products, list);
  return [...list];
}

export function deleteProduct(id) {
  const list = getProducts().filter((p) => String(p.id) !== String(id));
  write(KEYS.products, list);
  return [...list];
}

/* ---------------- Categories (seeded once from catalog) ---------------- */

export function getCategories() {
  let list = read(KEYS.categories, null);
  if (!Array.isArray(list)) {
    list = seedCategories.map((c) => ({ ...c }));
    write(KEYS.categories, list);
  }
  return list;
}

export function saveCategory(name) {
  const clean = String(name || "").trim();
  if (!clean) return getCategories();
  const list = getCategories();
  const id = slugify(clean);
  if (!list.some((c) => c.id === id)) {
    list.push({ id, name: clean });
    write(KEYS.categories, list);
  }
  return [...list];
}

export function deleteCategory(id) {
  const list = getCategories().filter((c) => c.id !== id);
  write(KEYS.categories, list);
  return [...list];
}

/* ---------------- Coupons (start empty — admin creates them) ---------------- */

export function getCoupons() {
  const list = read(KEYS.coupons, null);
  if (!Array.isArray(list)) {
    write(KEYS.coupons, []);
    return [];
  }
  return list;
}

export function saveCoupon({ code, percent }) {
  const list = getCoupons();
  const clean = String(code || "").trim().toUpperCase();
  const pct = Math.min(90, Math.max(1, Number(percent) || 0));
  if (!clean || !pct) return [...list];
  const idx = list.findIndex((c) => c.code === clean);
  if (idx >= 0) list[idx] = { code: clean, percent: pct };
  else list.push({ code: clean, percent: pct });
  write(KEYS.coupons, list);
  return [...list];
}

export function deleteCoupon(code) {
  const list = getCoupons().filter((c) => c.code !== code);
  write(KEYS.coupons, list);
  return [...list];
}

export function findCoupon(code) {
  const clean = String(code || "").trim().toUpperCase();
  if (!clean) return null;
  return getCoupons().find((c) => c.code === clean) || null;
}
