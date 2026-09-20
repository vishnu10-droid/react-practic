import React from "react";
import {Route,Routes,BrowserRouter} from 'react-router-dom'
import Form from "./components/pages/login";
import Register from "./components/pages/Register";
import Layout from "./components/layout/Layout";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import NewArrivals from "./components/pages/NewArrivals";
import Offers from "./components/pages/Offers";
import Orders from "./components/pages/Orders";
import ProductDetails from "./components/pages/ProductDetails";
import Products from "./components/pages/Products";
import Profile from "./components/pages/Profile";
import Wishlist from "./components/pages/Wishlist";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
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