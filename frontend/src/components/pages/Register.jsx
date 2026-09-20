import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Truck, ShieldCheck, BadgeCheck, User, Mail, Lock, Eye, EyeOff, ArrowRight, Gift } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/register", { name: form.name, email: form.email, password: form.password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("shopkart_user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-white text-[14px] font-medium outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400 placeholder:font-normal";

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f8fafc]">
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white flex-col justify-between p-12">
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-emerald-500/25 blur-[110px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-600/30 blur-[110px] rounded-full" />
        <div className="relative flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-xl"><ShoppingCart size={20} /></div>
          <div><p className="text-xl font-extrabold tracking-tight">ShopKart</p><p className="text-[10px] font-bold tracking-[0.24em] text-slate-400">SHOP • SAVE • SMILE</p></div>
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 bg-emerald-400/15 border border-emerald-300/25 rounded-full px-3.5 py-1.5 text-[12px] font-bold text-emerald-200"><Gift size={13} /> Get ₹200 off your first order</span>
          <h2 className="text-[44px] font-extrabold tracking-tight leading-[1.02] mt-5">Create your<br /><span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">account today.</span></h2>
          <div className="grid gap-3 mt-8 max-w-sm">
            {[["Truck", "Free delivery over ₹499"], ["ShieldCheck", "Secure UPI, cards & COD"], ["BadgeCheck", "7-day easy returns"]].map(([icon, t]) => (
              <p key={t} className="flex items-center gap-3 text-[13.5px] font-semibold text-slate-300">
                <span className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-300">
                  {icon === "Truck" ? <Truck size={15} /> : icon === "ShieldCheck" ? <ShieldCheck size={15} /> : <BadgeCheck size={15} />}
                </span>{t}
              </p>
            ))}
          </div>
        </div>
        <p className="relative text-[12px] text-slate-500">© 2026 ShopKart • Privacy • Terms</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-200/40 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-200/40 blur-[80px] rounded-full" />
        <div className="relative w-full max-w-[440px] anim-fade-up">
          <h1 className="text-[30px] font-extrabold tracking-tight">Join ShopKart 🎉</h1>
          <p className="text-slate-500 text-[14px] mt-1.5">One account for faster checkout, order tracking & deals.</p>
          <form onSubmit={handleSubmit} className="space-y-3.5 mt-7">
            <div className="relative group"><User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" /><input type="text" name="name" required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={input} /></div>
            <div className="relative group"><Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" /><input type="email" name="email" required placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={input} /></div>
            <div className="relative group">
              <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
              <input type={show ? "text" : "password"} name="password" required minLength={6} placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`${input} pr-12`} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-slate-950 text-white font-extrabold text-[14.5px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 hover:shadow-[0_15px_35px_-10px_rgb(99_102_241/0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? "Creating account..." : <>Create account <ArrowRight size={16} strokeWidth={2.6} /></>}
            </button>
            <p className="text-center text-[13.5px] text-slate-500 pt-1">Already have an account? <Link to="/" className="font-extrabold text-indigo-600 hover:text-indigo-800">Log in</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}
