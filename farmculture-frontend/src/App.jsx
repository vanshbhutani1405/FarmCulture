import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import ResultPage from "./pages/ResultPage";
import Login from "./auth/login";
import Register from "./auth/register";
import Layout from "./components/layout";
import FarmerDashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      {/* Protected pages with layout (Navbar visible) */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/dashboard" element={<FarmerDashboard />} />
      </Route>

      {/* Public routes (Navbar hidden) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Default route */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;