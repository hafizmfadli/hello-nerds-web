import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SearchResult from "./pages/SearchResult"
import ProductDetail from "./pages/ProductDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="product/search" element={<SearchResult />} />
      <Route path="p/:bookId/:title" element={<ProductDetail />}/>
    </Routes>
  </BrowserRouter>
);
