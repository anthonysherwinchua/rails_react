import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Categories from "../components/Categories";
import Category from "../components/Category";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:id" element={<Category />} />
    </Routes>
  </Router>
);
