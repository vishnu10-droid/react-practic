import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Truck, ShieldCheck, Headphones, ArrowRight, Star, Zap, Sparkles, BadgeCheck, Quote } from "lucide-react";
import { getProducts, getCategories, getCoupons } from "../store/shopStore";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
  const products = useMemo(getProducts, []);
  const categories = useMemo(getCategories, []);
  const coupons = useMemo(getCoupons, []);
  const featured = products[0];
  const floating = products[6] || products[1];
  const popular = products.slice(0, 4);
  const deals = [...products].sort((a, b) => (b.oldPrice - b.price) - (a.oldPrice - a.price)).slice(0, 4);

  return (
    <div className="bg-[#f8fafc] overflow-x-clip">
      {/* HERO */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] bg-indigo-600/35 blur-[120px] rounded-full" />
          <div className="absolute top-10 right-0 w-[480px] h-[480px] bg-fuchsia-600/25 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-[420px] h-[280px] bg-cyan-500/15 blur-[100px] rounded-full" />
          <div className="absolute inset-0 dot-grid opacity-40" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.12) 1px, transparent 0)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <div className="anim-fade-up">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur rounded-full pl-1.5 pr-4 py-1.5 text-[12.5px] font-bold">
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 px-2.5 py-1 rounded-full flex items-center gap-1"><Zap size={12} fill="currentColor" /> LIVE</span>
              <span className="text-slate-200">Big Festive Deals — up to 60% off</span>
            </div>
            <h1 className="text-[42px] sm:text-6xl lg:text-[68px] font-extrabold tracking-[-0.03em] leading-[0.95] mt-6">
              Shop Smarter.
              <br />
              <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">Live Better.</span>
            </h1>
            <p className="mt-5 text-slate-300/90 text-[16px] leading-7 max-w-md">
              Discover hand-picked electronics, fashion & home essentials — quality checked, honestly priced, delivered fast.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/products" className="group px-7 py-3.5 rounded-2xl bg-white text-slate-950 font-extrabold text-[14.5px] flex items-center gap-2 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-fuchsia-500 hover:text-white hover:shadow-[0_18px_45px_-12px_rgb(168_85_247/0.8)] transition-all active:scale-95">
                Shop Now <ArrowRight size={17} strokeWidth={2.6} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/offers" className="px-7 py-3.5 rounded-2xl border border-white/20 bg-white/5 backdrop-blur font-bold text-[14.5px] hover:bg-white/12 hover:border-white/35 transition active:scale-95">
                🔥 View Offers
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-9">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} src={`https://i.pravatar.cc/72?img=${10 + i}`} alt="buyer" className="w-10 h-10 rounded-full border-[3px] border-slate-950 object-cover" />
                ))}
                <span className="w-10 h-10 rounded-full border-[3px] border-slate-950 bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-[11px] font-extrabold">50k+</span>
              </div>
              <div>
                <p className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={14} fill="currentColor" />))}
                  <span className="text-white font-extrabold text-[13.5px] ml-1">4.8</span>
                </p>
                <p className="text-[12px] text-slate-400 font-medium mt-0.5">Loved by 50,000+ happy shoppers</p>
              </div>
            </div>
          </div>

          {featured && (
          <div className="relative hidden md:block">
            <div className="relative rounded-[32px] overflow-hidden border border-white/15 shadow-[0_40px_100px_-25px_rgb(99_102_241/0.6)] rotate-1 hover:rotate-0 transition-transform duration-700">
              <img src={featured.image} alt="Featured" className="w-full h-[460px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-extrabold tracking-widest text-amber-300">FEATURED • {featured.badge?.toUpperCase()}</p>
                  <p className="text-white font-extrabold text-[18px] mt-1 leading-tight">{featured.name}</p>
                  <p className="text-white/80 text-[14px] font-bold mt-1">₹{Number(featured.price).toLocaleString("en-IN")} <span className="line-through font-medium text-white/50 text-[13px]">₹{Number(featured.oldPrice).toLocaleString("en-IN")}</span></p>
                </div>
                <Link to={`/product/${featured.id}`} className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-[13px] font-extrabold hover:bg-slate-900 hover:text-white transition shrink-0">Shop →</Link>
              </div>
            </div>
            {/* floating cards */}
            {floating && (
            <div className="absolute -left-8 top-8 glass border border-white/40 rounded-2xl p-3 pr-4 flex items-center gap-3 shadow-2xl animate-[float_7s_ease-in-out_infinite]">
              <img src={floating.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
              <div><p className="text-slate-900 text-[12px] font-extrabold leading-tight max-w-[130px] truncate">{floating.name}</p><p className="text-emerald-600 text-[12px] font-extrabold">₹{Number(floating.price).toLocaleString("en-IN")}</p></div>
            </div>
            )}
            <div className="absolute -right-4 bottom-24 bg-white rounded-2xl px-4 py-3 shadow-2xl flex items-center gap-2.5 animate-[float_10s_ease-in-out_infinite]">
              <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><BadgeCheck size={18} /></span>
              <div><p className="text-[12.5px] font-extrabold text-slate-900">Order delivered</p><p className="text-[11px] text-slate-500">Just now • Bengaluru</p></div>
            </div>
          </div>
          )}
        </div>

        {/* brand marquee */}
        <div className="relative border-t border-white/10 bg-white/[0.03] backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center gap-6 overflow-hidden">
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-slate-400 shrink-0">TRUSTED BRANDS</span>
            <div className="flex gap-8 text-[13px] font-extrabold tracking-widest text-slate-500 whitespace-nowrap animate-[marquee_28s_linear_infinite]">
              {["SONY •", "NIKE •", "APPLE •", "SAMSUNG •", "ADIDAS •", "LAKMÉ •", "PHILIPS •", "PUMA •", "SONY •", "NIKE •", "APPLE •", "SAMSUNG •", "ADIDAS •", "LAKMÉ •", "PHILIPS •", "PUMA •"].map((b, i) => (
                <span key={i}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-0 pt-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { Icon: Truck, title: "Fast Delivery", text: "Same-day dispatch, 2–4 day delivery across India", grad: "from-blue-500 to-cyan-500" },
            { Icon: ShieldCheck, title: "Secure Payment", text: "UPI, cards & COD with 256-bit encryption", grad: "from-emerald-500 to-teal-500" },
            { Icon: Headphones, title: "24/7 Support", text: "Real humans, fast replies, easy returns", grad: "from-violet-500 to-fuchsia-500" },
          ].map((f) => (
            <div key={f.title} className="group bg-white border border-slate-100 rounded-[22px] p-5 flex gap-4 hover:shadow-[0_20px_50px_-20px_rgb(15_23_42/0.3)] hover:-translate-y-1 transition-all">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.grad} text-white flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
                <f.Icon size={20} />
              </div>
              <div><h3 className="font-extrabold text-[14.5px] tracking-tight">{f.title}</h3><p className="text-[13px] text-slate-500 mt-1 leading-5">{f.text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-600 flex items-center gap-1.5"><Sparkles size={13} /> CURATED FOR YOU</p>
            <h2 className="text-[28px] sm:text-3xl font-extrabold tracking-tight mt-1.5">Shop by Category</h2>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-[13.5px] font-bold text-slate-500 hover:text-indigo-600 transition">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {categories.map((c) => (<CategoryCard key={c.id} category={c} />))}
        </div>
      </section>

      {/* POPULAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="rounded-[28px] bg-white border border-slate-100 p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgb(15_23_42/0.25)]">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-fuchsia-600">⭐ CUSTOMER FAVOURITES</p>
              <h2 className="text-[28px] sm:text-3xl font-extrabold tracking-tight mt-1.5">Popular Products</h2>
            </div>
            <Link to="/products" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[13px] font-bold hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition flex items-center gap-1.5">See all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popular.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </div>
      </section>

      {/* DEAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-rose-600 via-orange-500 to-amber-500 text-white p-8 sm:p-12">
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/15 blur-2xl rounded-full" />
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-slate-950/20 blur-2xl rounded-full" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-slate-950/25 border border-white/25 backdrop-blur px-3.5 py-1.5 rounded-full text-[12px] font-extrabold tracking-wide">⏳ ENDS IN 02 : 14 : 55</span>
              <h2 className="text-3xl sm:text-[42px] font-extrabold tracking-tight leading-[1.02] mt-4">Hot Deals.<br />Crazy Prices. 🔥</h2>
              <p className="text-white/85 mt-3 text-[14.5px] leading-6 max-w-sm">Up to 60% off top-rated products.{coupons.length > 0 ? <> Extra {coupons[0].percent}% off with code <b className="bg-slate-950/30 px-2 py-0.5 rounded-lg border border-white/25">{coupons[0].code}</b></> : " Apply a coupon code at checkout for extra savings."}</p>
              <Link to="/offers" className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-2xl bg-slate-950 text-white font-extrabold text-[14px] hover:bg-white hover:text-slate-950 transition-all active:scale-95">Grab the deals <ArrowRight size={16} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {deals.slice(0, 2).map((d) => (
                <Link key={d.id} to={`/product/${d.id}`} className="group bg-white/12 border border-white/20 backdrop-blur rounded-3xl overflow-hidden hover:bg-white/20 transition">
                  <img src={d.image} alt={d.name} className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3.5"><p className="text-[13px] font-bold line-clamp-1">{d.name}</p><p className="font-extrabold mt-1">₹{d.price.toLocaleString("en-IN")} <span className="line-through text-white/60 text-[12px] font-medium">₹{d.oldPrice.toLocaleString("en-IN")}</span></p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-600 text-center">💬 WALL OF LOVE</p>
        <h2 className="text-[28px] sm:text-3xl font-extrabold tracking-tight text-center mt-1.5">Shoppers love ShopKart</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-7">
          {[
            { name: "Priya Sharma", city: "Mumbai", text: "Ordered sneakers at 9pm, delivered in 2 days. Quality is genuinely premium for the price!", img: 47 },
            { name: "Rahul Verma", city: "Delhi", text: "The smartwatch deal saved me ₹3000. Checkout took 30 seconds with UPI. Superb experience.", img: 12 },
            { name: "Ananya Iyer", city: "Bengaluru", text: "Returns were effortless — pickup next day, refund in hours. This is now my default store.", img: 32 },
          ].map((t) => (
            <figure key={t.name} className="bg-white border border-slate-100 rounded-[22px] p-6 hover:shadow-[0_20px_50px_-20px_rgb(15_23_42/0.3)] hover:-translate-y-1 transition-all">
              <Quote size={22} className="text-indigo-200" fill="currentColor" />
              <blockquote className="text-[14px] leading-6 text-slate-600 mt-3">“{t.text}”</blockquote>
              <figcaption className="flex items-center gap-3 mt-5 pt-5 border-t border-slate-100">
                <img src={`https://i.pravatar.cc/80?img=${t.img}`} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div><p className="text-[13.5px] font-extrabold">{t.name}</p><p className="text-[12px] text-slate-400">{t.city} • Verified buyer ✓</p></div>
                <span className="ml-auto flex text-amber-400">{[1, 2, 3, 4, 5].map((s) => (<Star key={s} size={11} fill="currentColor" />))}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* newsletter */}
        <div className="mt-8 relative overflow-hidden rounded-[28px] bg-slate-950 text-white p-8 sm:p-12 text-center">
          <div className="absolute -top-20 left-1/4 w-96 h-56 bg-indigo-600/30 blur-[80px] rounded-full" />
          <div className="absolute -bottom-20 right-1/4 w-96 h-56 bg-fuchsia-600/25 blur-[80px] rounded-full" />
          <div className="relative max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Get ₹200 off your first order 🎁</h3>
            <p className="text-slate-400 text-[14px] mt-2">Join 50,000+ subscribers. One useful email a week, no spam.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex flex-col sm:flex-row gap-2.5 bg-white/8 border border-white/12 backdrop-blur rounded-2xl p-2">
              <input placeholder="Enter your email" type="email" className="flex-1 bg-transparent px-4 py-3 text-[14px] outline-none placeholder:text-slate-500" />
              <button className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 font-extrabold text-[14px] hover:opacity-90 active:scale-95 transition">Claim ₹200</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
