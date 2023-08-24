import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from '../components/views/common/NavBar'
import Home from "../components/Home";
import Categories from "../components/Categories";
import Category from "../components/Category";
import CategoryNew from "../components/CategoryNew";

export default (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/new" element={<CategoryNew />} />
      <Route path="/categories/:id" element={<Category />} />
    </Routes>
  </Router>
);
