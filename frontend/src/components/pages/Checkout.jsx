import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import OrderSummary from "../OrderSummary";
import { MapPin, Phone, User, CreditCard, Banknote, Wallet, Lock, CheckCircle2, ChevronRight } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "", payment: "cod" });
  const [step] = useState(2);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem("shopkart_orders") || "[]");
    orders.unshift({ id: Date.now(), date: new Date().toISOString(), total, items: cartItems, customer: form, status: "Placed" });
    localStorage.setItem("shopkart_orders", JSON.stringify(orders));
    clearCart();
    navigate("/orders");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 px-4">
        <div className="text-6xl">🧾</div>
        <h1 className="text-3xl font-extrabold mt-5 tracking-tight">Nothing to checkout</h1>
        <p className="text-slate-500 mt-2">Your cart is empty.</p>
      </div>
    );
  }

  const payments = [
    { id: "cod", icon: Banknote, title: "Cash on Delivery", text: "Pay when it arrives", tag: "Most popular" },
    { id: "upi", icon: Wallet, title: "UPI", text: "GPay, PhonePe, Paytm & more", tag: "Instant" },
    { id: "card", icon: CreditCard, title: "Credit / Debit Card", text: "Visa, Mastercard, RuPay", tag: "Secure" },
  ];

  const input = "w-full border border-slate-200 bg-slate-50/60 px-4 py-3.5 rounded-2xl text-[14px] font-medium outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition placeholder:text-slate-400";

  return (
    <div className="bg-[#f8fafc] min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-[11px] font-extrabold tracking-[0.22em] text-indigo-600">SECURE CHECKOUT</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1">Checkout</h1>

        {/* steps */}
        <div className="flex items-center gap-2 mt-6 mb-8 max-w-lg">
          {[["Cart", true], ["Details", true], ["Done", false]].map(([label, done], i) => (
            <React.Fragment key={label}>
              <div className="flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-extrabold ${done ? "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white shadow-md" : "bg-white border border-slate-200 text-slate-400"}`}>
                  {done ? "✓" : i + 1}
                </span>
                <span className={`text-[13px] font-bold ${done ? "text-slate-900" : "text-slate-400"}`}>{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 rounded-full mx-1 ${i < step - 1 ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500" : "bg-slate-200"}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
          <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-[26px] p-6 sm:p-8 shadow-[0_20px_60px_-30px_rgb(15_23_42/0.3)] space-y-5">
            <div>
              <h2 className="text-[17px] font-extrabold flex items-center gap-2"><span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><MapPin size={16} /></span> Delivery details</h2>
              <div className="grid sm:grid-cols-2 gap-3.5 mt-4">
                <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input required placeholder="Full name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={`${input} pl-11`} /></div>
                <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input required placeholder="Phone number" pattern="[0-9+ ]{10,15}" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={`${input} pl-11`} /></div>
                <input required placeholder="Flat / street address" value={form.address} onChange={(e) => handleChange("address", e.target.value)} className={`${input} sm:col-span-2`} />
                <input required placeholder="City" value={form.city} onChange={(e) => handleChange("city", e.target.value)} className={input} />
                <input required placeholder="Pincode" pattern="[0-9]{6}" value={form.pincode} onChange={(e) => handleChange("pincode", e.target.value)} className={input} />
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100">
              <h3 className="text-[17px] font-extrabold flex items-center gap-2"><span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><CreditCard size={16} /></span> Payment method</h3>
              <div className="grid gap-2.5 mt-4">
                {payments.map((p) => (
                  <label key={p.id} className={`flex items-center gap-3.5 border-2 p-4 rounded-2xl cursor-pointer transition-all ${form.payment === p.id ? "border-indigo-500 bg-indigo-50/50 shadow-[0_10px_30px_-15px_rgb(99_102_241/0.5)]" : "border-slate-100 hover:border-slate-200 bg-white"}`}>
                    <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={(e) => handleChange("payment", e.target.value)} className="accent-indigo-600 w-4.5 h-4.5" />
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${form.payment === p.id ? "bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-white" : "bg-slate-100 text-slate-500"}`}><p.icon size={18} /></span>
                    <span className="flex-1"><span className="block text-[14px] font-extrabold">{p.title}</span><span className="block text-[12px] text-slate-500 font-medium">{p.text}</span></span>
                    <span className="text-[10.5px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">{p.tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-extrabold text-[15px] shadow-[0_15px_35px_-10px_rgb(99_102_241/0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2">
              <Lock size={15} /> Place order • ₹{(total + (total > 499 || total === 0 ? 0 : 49)).toLocaleString("en-IN")}
            </button>
            <p className="flex items-center justify-center gap-1.5 text-[12px] font-semibold text-slate-400"><CheckCircle2 size={13} className="text-emerald-500" /> 7-day returns • Secure payments • Fast delivery</p>
          </form>

          <OrderSummary checkout />
        </div>
      </div>
    </div>
  );
}
