import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Form from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./layouts/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NewArrivals from "./pages/NewArrivals";
import Offers from "./pages/Offers";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Dashboard from "./dashboard/Dashboard";
import Home from "./pages/Home";
export default function App(){
  return(

    <BrowserRouter>
    <Routes>
      <Route element ={<Layout/>}>
      <Route path= "/" element ={<Form/>}/>
      <Route path ="/register" element ={<Register/>}/>
      <Route path ="/home" element ={<Home/>}/>
      <Route path ="/cart" element ={<Cart/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/new-arrivals" element={<NewArrivals/>}/>
      <Route path="/offers" element={<Offers/>}/>
      <Route path="/orders" element ={<Orders/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/wishlist" element={<Wishlist/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
