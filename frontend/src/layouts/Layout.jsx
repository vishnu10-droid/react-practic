import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register", "/dashboard"];
  const hideChrome = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {!hideChrome && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}
