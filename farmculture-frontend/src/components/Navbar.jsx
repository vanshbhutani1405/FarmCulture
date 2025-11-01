import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = sessionStorage.getItem("isLogin");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  // Helper to highlight active page
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-5 py-3"
      style={{
        borderRadius: "12px",
        margin: "20px auto",
        width: "90%",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <h4
          className="text-success fw-bold mb-0"
          role="button"
          onClick={() => navigate("/home")}
        >
          🌿 FarmCulture
        </h4>

        {/* Navigation Links */}
        <div className="d-flex align-items-center">
          <button
            onClick={() => navigate("/home")}
            className={`btn btn-link fw-semibold me-3 ${
              isActive("/home") ? "text-success" : "text-dark"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigate("/form")}
            className={`btn btn-link fw-semibold me-3 ${
              isActive("/form") ? "text-success" : "text-dark"
            }`}
          >
            Form
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className={`btn btn-link fw-semibold me-3 ${
              isActive("/dashboard") ? "text-success" : "text-dark"
            }`}
          >
            Dashboard
          </button>

          {/* Show Login / Logout depending on session */}
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger fw-semibold px-3 py-1 rounded-pill"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="btn btn-outline-success fw-semibold px-3 py-1 rounded-pill"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;