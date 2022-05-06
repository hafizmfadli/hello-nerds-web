import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SearchResult from "./pages/SearchResult"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Routes>
        <Route path="/product/search" element={<SearchResult />} />
    </Routes>
  </BrowserRouter>
);
