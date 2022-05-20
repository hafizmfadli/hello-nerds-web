import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./store";
import MemberOrGuest from "./pages/MemberOrGuest";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="account/Login" element={<Login />} />
        <Route path="account/Register" element={<Register />} />
        <Route path="product/search" element={<SearchResult />} />
        <Route path="p/:bookId/:title" element={<ProductDetail />} />
        <Route path="checkout/cart" element={<Cart />} />
        <Route path="checkout/guest_shipping_address" element={<MemberOrGuest />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
