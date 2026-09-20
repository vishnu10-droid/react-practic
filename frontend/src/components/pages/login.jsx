import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Truck, BadgeCheck } from "lucide-react";

function AuthShell({ children, title, subtitle }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f8fafc]">
      {/* brand panel */}
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white flex-col justify-between p-12">
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-indigo-600/35 blur-[110px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-fuchsia-600/25 blur-[110px] rounded-full" />
        <div className="relative flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-xl"><ShoppingCart size={20} /></div>
          <div><p className="text-xl font-extrabold tracking-tight">ShopKart</p><p className="text-[10px] font-bold tracking-[0.24em] text-slate-400">SHOP • SAVE • SMILE</p></div>
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 text-[12px] font-bold text-indigo-200">✨ Join 50,000+ happy shoppers</span>
          <h2 className="text-[44px] font-extrabold tracking-tight leading-[1.02] mt-5">Great deals<br /><span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">start here.</span></h2>
          <div className="grid gap-3 mt-8 max-w-sm">
            {[["Truck", "Free delivery over ₹499"], ["ShieldCheck", "Secure UPI, cards & COD"], ["BadgeCheck", "7-day easy returns"]].map(([icon, t]) => (
              <p key={t} className="flex items-center gap-3 text-[13.5px] font-semibold text-slate-300">
                <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-indigo-300">
                  {icon === "Truck" ? <Truck size={15} /> : icon === "ShieldCheck" ? <ShieldCheck size={15} /> : <BadgeCheck size={15} />}
                </span>{t}
              </p>
            ))}
          </div>
        </div>
        <p className="relative text-[12px] text-slate-500">© 2026 ShopKart • Privacy • Terms</p>
      </div>

      {/* form panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200/40 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-fuchsia-200/40 blur-[80px] rounded-full" />
        <div className="relative w-full max-w-[440px] anim-fade-up">
          <Link to="/home" className="lg:hidden flex items-center gap-2 mb-8">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white flex items-center justify-center"><ShoppingCart size={17} /></span>
            <span className="font-extrabold text-lg">ShopKart</span>
          </Link>
          <h1 className="text-[30px] font-extrabold tracking-tight">{title}</h1>
          <p className="text-slate-500 text-[14px] mt-1.5">{subtitle}</p>
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function AuthInput({ icon: Icon, ...props }) {
  return (
    <div className="relative group">
      <Icon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition" />
      <input {...props} className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[14px] font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400 placeholder:font-normal" />
    </div>
  );
}

export default function Form() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", { email: form.email, password: form.password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("shopkart_user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Welcome back 👋" subtitle="Log in to track orders, wishlist & checkout faster.">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <AuthInput icon={Mail} type="email" name="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <div className="relative group">
          <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
          <input type={show ? "text" : "password"} name="password" required placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-11 pr-12 py-3.5 rounded-2xl border border-slate-200 bg-white text-[14px] font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
        </div>
        <div className="flex items-center justify-between text-[12.5px] font-semibold">
          <label className="flex items-center gap-2 text-slate-500"><input type="checkbox" className="accent-indigo-600 w-4 h-4" defaultChecked /> Remember me</label>
          <a href="#" className="text-indigo-600 hover:text-indigo-800">Forgot password?</a>
        </div>
        <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-extrabold text-[14.5px] shadow-[0_15px_35px_-10px_rgb(99_102_241/0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
          {loading ? "Logging in..." : <>Log in <ArrowRight size={16} strokeWidth={2.6} /></>}
        </button>
        <p className="text-center text-[13.5px] text-slate-500 pt-1">New to ShopKart? <Link to="/register" className="font-extrabold text-indigo-600 hover:text-indigo-800">Create an account</Link></p>
      </form>
    </AuthShell>
  );
}
