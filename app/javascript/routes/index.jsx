import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from '../components/views/common/NavBar'
import Home from "../components/Home";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Categories from "../components/Categories";
import Category from "../components/Category";
import CategoryNew from "../components/CategoryNew";
import CategoryEdit from "../components/CategoryEdit";

export default (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/me" element={<Profile />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/new" element={<CategoryNew />} />
      <Route path="/categories/:id/edit" element={<CategoryEdit />} />
      <Route path="/categories/:id" element={<Category />} />
    </Routes>
  </Router>
);
