import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Mail, Lock, ArrowRight, Truck, ShieldCheck, BadgeCheck } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("shopkart_user", JSON.stringify({ name: "ShopKart User", email }));
    localStorage.setItem("user", JSON.stringify({ name: "ShopKart User", email }));
    navigate("/home");
  };

  return (
    <div className="min-h-[85vh] grid lg:grid-cols-2 bg-[#f8fafc]">
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white flex-col justify-center p-12">
        <div className="absolute -top-24 -left-24 w-[440px] h-[440px] bg-indigo-600/35 blur-[110px] rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-2.5"><span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center"><ShoppingCart size={20} /></span><span className="text-xl font-extrabold">ShopKart</span></div>
          <h2 className="text-[42px] font-extrabold tracking-tight leading-[1.02] mt-8">Welcome back.<br /><span className="bg-gradient-to-r from-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">Deals missed you.</span></h2>
          <p className="text-slate-400 text-[14px] mt-4 flex items-center gap-2"><Truck size={15} /> Free delivery over ₹499 <span>•</span> <ShieldCheck size={15} /> Secure checkout</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleLogin} className="w-full max-w-[420px] bg-white border border-slate-100 p-8 rounded-[28px] shadow-[0_25px_70px_-30px_rgb(15_23_42/0.35)] anim-fade-up">
          <h1 className="text-[28px] font-extrabold tracking-tight text-center">Log in</h1>
          <p className="text-center text-slate-500 text-[13.5px] mt-1.5">Welcome back to ShopKart</p>
          <div className="relative mt-7 group"><Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" /><input type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-[14px] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" /></div>
          <div className="relative mt-3.5 group"><Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" /><input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 text-[14px] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition" /></div>
          <button className="w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-extrabold text-[14.5px] shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">Log in <ArrowRight size={16} /></button>
          <p className="text-center text-[13px] text-slate-500 mt-5">Don't have an account? <Link to="/register" className="font-extrabold text-indigo-600">Register</Link></p>
        </form>
      </div>
    </div>
  );
}

export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("shopkart_user", JSON.stringify(form));
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/home");
  };

  const input = "w-full border border-slate-200 bg-slate-50/60 px-4 py-3.5 rounded-2xl text-[14px] outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400";

  return (
    <div className="min-h-[85vh] grid lg:grid-cols-2 bg-[#f8fafc]">
      <div className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white flex-col justify-center p-12">
        <div className="absolute -top-24 -left-24 w-[440px] h-[440px] bg-fuchsia-600/30 blur-[110px] rounded-full" />
        <div className="relative">
          <div className="flex items-center gap-2.5"><span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center"><ShoppingCart size={20} /></span><span className="text-xl font-extrabold">ShopKart</span></div>
          <h2 className="text-[42px] font-extrabold tracking-tight leading-[1.02] mt-8">Join 50,000+<br /><span className="bg-gradient-to-r from-amber-200 to-fuchsia-300 bg-clip-text text-transparent">happy shoppers.</span></h2>
          <p className="text-slate-400 text-[14px] mt-4 flex items-center gap-2"><BadgeCheck size={15} /> ₹200 off first order <span>•</span> Easy returns</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <form onSubmit={handleRegister} className="w-full max-w-[420px] bg-white border border-slate-100 p-8 rounded-[28px] shadow-[0_25px_70px_-30px_rgb(15_23_42/0.35)] anim-fade-up">
          <h1 className="text-[28px] font-extrabold tracking-tight text-center">Create account</h1>
          <p className="text-center text-slate-500 text-[13.5px] mt-1.5">Start shopping in seconds</p>
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${input} mt-7`} />
          <input required type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={`${input} mt-3.5`} />
          <input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={`${input} mt-3.5`} />
          <button className="w-full mt-5 py-4 rounded-2xl bg-slate-950 text-white font-extrabold text-[14.5px] hover:bg-gradient-to-r hover:from-indigo-600 hover:to-fuchsia-600 transition-all">Create account</button>
          <p className="text-center text-[13px] text-slate-500 mt-5">Already have an account? <Link to="/" className="font-extrabold text-indigo-600">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}
