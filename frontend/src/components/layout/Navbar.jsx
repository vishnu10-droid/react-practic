import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Home,
  LayoutGrid,
  LayoutDashboard,
  Sparkles,
  Zap,
  Truck,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const CATEGORIES = [
  { name: "Electronics", icon: "⚡", gradient: "from-violet-500 to-indigo-500" },
  { name: "Fashion", icon: "👗", gradient: "from-pink-500 to-rose-500" },
  { name: "Mobiles", icon: "📱", gradient: "from-blue-500 to-cyan-500" },
  { name: "Beauty", icon: "💄", gradient: "from-fuchsia-500 to-pink-500" },
  { name: "Shoes", icon: "👟", gradient: "from-orange-500 to-amber-500" },
  { name: "Home & Kitchen", icon: "🏠", gradient: "from-emerald-500 to-teal-500" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || localStorage.getItem("shopkart_user") || "null");
    } catch {
      return null;
    }
  })();
  const userName = user?.name || "My Account";

  const [search, setSearch] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
    setCategoryOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = search.trim();
    if (!value) return;
    navigate(`/products?search=${encodeURIComponent(value)}`);
    setMobileOpen(false);
  };

  const handleCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setCategoryOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("shopkart_user");
    setProfileOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navLink = (path) =>
    `flex items-center gap-2 text-[13.5px] font-semibold tracking-tight transition-all px-1 py-1 relative group ${
      isActive(path) ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement */}
      <div className="bg-slate-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between text-[12px] font-medium">
          <p className="flex items-center gap-2 truncate">
            <Zap size={13} className="text-amber-400 shrink-0" fill="currentColor" />
            <span className="truncate">Festive Sale is LIVE — up to 60% off + extra 10% on prepaid</span>
          </p>
          <div className="hidden sm:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1.5"><Truck size={13} /> Free delivery over ₹499</span>
            <Link to="/offers" className="text-amber-300 hover:text-amber-200 font-semibold">Grab deals →</Link>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <nav
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "glass border-slate-200/70 shadow-[0_12px_40px_-16px_rgb(15_23_42/0.25)]"
            : "bg-white/90 backdrop-blur-md border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[72px] flex items-center justify-between gap-3">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 flex items-center justify-center text-white shadow-[0_10px_25px_-8px_rgb(99_102_241/0.7)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <ShoppingCart size={20} strokeWidth={2.4} />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div className="leading-none">
                <h1 className="text-[22px] font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-700 to-fuchsia-600 bg-clip-text text-transparent">
                  ShopKart
                </h1>
                <p className="text-[10px] font-bold tracking-[0.22em] text-slate-400 mt-1">
                  SHOP • SAVE • SMILE
                </p>
              </div>
            </Link>

            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search headphones, sneakers, watches & more..."
                  className="w-full pl-11 pr-[104px] py-3 rounded-2xl border border-slate-200 bg-slate-50/80 text-[14px] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition-all active:scale-95"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-1.5">
              <Link
                to="/wishlist"
                className={`relative p-3 rounded-2xl transition-all active:scale-95 ${
                  isActive("/wishlist") ? "bg-rose-50 text-rose-600" : "text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                }`}
                title="Wishlist"
              >
                <Heart size={21} fill={isActive("/wishlist") ? "currentColor" : "none"} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className={`relative p-3 rounded-2xl transition-all active:scale-95 ${
                  isActive("/cart") ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
                title="Cart"
              >
                <ShoppingCart size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 bg-slate-900 text-white text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="w-px h-8 bg-slate-200 mx-1" />

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-2.5 pl-1.5 pr-2.5 py-1.5 rounded-2xl border transition-all ${
                    profileOpen ? "border-indigo-200 bg-indigo-50/60 shadow-sm" : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    {userName?.charAt(0)?.toUpperCase() || <User size={17} />}
                  </div>
                  <div className="text-left hidden xl:block leading-tight">
                    <p className="text-[11px] text-slate-400 font-medium">Welcome,</p>
                    <p className="text-[13px] font-bold text-slate-800 max-w-[110px] truncate">{userName}</p>
                  </div>
                  <ChevronDown size={15} className={`text-slate-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-[0_25px_60px_-15px_rgb(15_23_42/0.3)] border border-slate-100 p-2 z-20 anim-fade-up overflow-hidden">
                      <div className="px-4 py-3 bg-gradient-to-br from-indigo-50 to-fuchsia-50 rounded-xl mb-1">
                        <p className="text-[13px] font-extrabold text-slate-900 truncate">{userName}</p>
                        <p className="text-[12px] text-slate-500 truncate">{user?.email || "Shop smarter everyday"}</p>
                      </div>
                      <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-[13.5px] font-semibold text-slate-700">
                        <User size={17} className="text-indigo-500" /> My Profile
                      </Link>
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-[13.5px] font-semibold text-slate-700">
                        <LayoutDashboard size={17} className="text-indigo-500" /> Dashboard
                      </Link>
                      <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-[13.5px] font-semibold text-slate-700">
                        <Package size={17} className="text-indigo-500" /> My Orders
                      </Link>
                      <div className="my-1 border-t border-slate-100" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-50 text-[13.5px] font-semibold text-rose-600">
                        <LogOut size={17} /> Logout
                      </button>
                    </div>
                  </>
                )}
              </div>

              <Link
                to="/products"
                className="ml-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white text-[13px] font-bold shadow-[0_10px_25px_-8px_rgb(99_102_241/0.8)] hover:shadow-[0_15px_35px_-8px_rgb(168_85_247/0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                Shop Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-1">
              <Link to="/wishlist" className="relative p-2.5 rounded-xl text-slate-600 hover:bg-rose-50 hover:text-rose-600">
                <Heart size={21} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>
                )}
              </Link>
              <Link to="/cart" className="relative p-2.5 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600">
                <ShoppingCart size={21} />
                {cartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </Link>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-800 transition active:scale-95">
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Desktop second nav */}
          <div className="hidden lg:flex items-center h-[52px] gap-7 border-t border-slate-100">
            <Link to="/home" className={navLink("/home")}><Home size={15} /> Home</Link>
            <Link to="/dashboard" className={navLink("/dashboard")}><LayoutDashboard size={15} /> Dashboard</Link>
            <Link to="/products" className={navLink("/products")}><LayoutGrid size={15} /> All Products</Link>
            <div className="relative">
              <button onClick={() => setCategoryOpen(!categoryOpen)} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 hover:text-indigo-600 transition px-1 py-1">
                Categories <ChevronDown size={14} className={`transition-transform duration-300 ${categoryOpen ? "rotate-180" : ""}`} />
              </button>
              {categoryOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setCategoryOpen(false)} />
                  <div className="absolute left-0 top-9 w-[420px] bg-white rounded-3xl shadow-[0_30px_70px_-15px_rgb(15_23_42/0.35)] border border-slate-100 p-3 z-20 anim-fade-up">
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((c) => (
                        <button key={c.name} onClick={() => handleCategory(c.name)} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition text-left group">
                          <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-lg shadow-md group-hover:scale-110 transition`}>{c.icon}</span>
                          <span className="text-[13px] font-bold text-slate-700">{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link to="/offers" className="flex items-center gap-1.5 text-[13.5px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600">
              <Zap size={14} className="text-orange-500" fill="currentColor" /> Hot Deals
            </Link>
            <Link to="/new-arrivals" className="flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 hover:text-indigo-600">
              <Sparkles size={14} className="text-fuchsia-500" /> New Arrivals
            </Link>
            <div className="flex-1" />
            <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> In stock — ships in 24h
            </span>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-[14px] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl anim-fade-up">
            <div className="max-w-7xl mx-auto px-4 py-4 grid gap-1.5">
              {[
                { to: "/home", icon: Home, label: "Home" },
                { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                { to: "/products", icon: LayoutGrid, label: "All Products" },
                { to: "/offers", icon: Zap, label: "Hot Deals 🔥" },
                { to: "/new-arrivals", icon: Sparkles, label: "New Arrivals" },
                { to: "/profile", icon: User, label: "My Profile" },
                { to: "/orders", icon: Package, label: "My Orders" },
              ].map((l) => (
                <Link key={l.to + l.label} to={l.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition ${isActive(l.to) ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"}`}>
                  <l.icon size={18} className={isActive(l.to) ? "text-indigo-600" : "text-slate-400"} /> {l.label}
                </Link>
              ))}
              <div className="px-4 py-2">
                <p className="text-[11px] font-extrabold tracking-widest text-slate-400 mb-2">CATEGORIES</p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c.name} onClick={() => handleCategory(c.name)} className="px-3.5 py-2 rounded-full bg-slate-100 text-[12.5px] font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition">
                      {c.icon} {c.name}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-600 font-bold hover:bg-rose-50">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
