import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const isLoggedIn = sessionStorage.getItem("isLogin") === "true";
  const userName = sessionStorage.getItem("name") || "Farmer";

  const handleLogout = () => {
    window.Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#198754",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        window.Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/home");
      }
    });
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(180deg,#edf7ef 0%, #fafdf9 100%)",
        fontFamily: "Poppins, sans-serif",
        paddingBottom: "60px",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 fixed-top">
        <div className="container d-flex justify-content-between">
          <div
            className="fw-bold text-success fs-4"
            role="button"
            onClick={() => navigate("/home")}
          >
            <span className="me-2">🌱</span> FarmCulture
          </div>

          <div>
            {!isLoggedIn ? (
              <>
                <button
                  className="btn btn-link text-dark fw-semibold me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-success fw-semibold px-4 rounded-pill"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-danger fw-semibold px-4 rounded-pill"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="container mt-5 pt-5">
        {/* Welcome Header */}
        <div className="text-center text-md-start mb-5 mt-4">
          <h2 className="fw-bold text-success">
            Welcome, {userName} <span className="ms-1">👋</span>
          </h2>
          <p className="text-muted fs-6">Your smart farming insights at a glance.</p>
        </div>

        {/* Main Info Section */}
        <div className="row justify-content-center align-items-start g-4">
          {/* Farmer Info Card */}
          <div className="col-lg-7">
            <div
              className="card shadow-sm border-0"
              style={{
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-semibold text-dark mb-0">Farmer Information</h5>
                  <button
                    className="btn btn-success fw-semibold rounded-pill px-4 py-1"
                    style={{
                      boxShadow: "0px 4px 10px rgba(22,163,74,0.4)",
                    }}
                  >
                    Edit Info
                  </button>
                </div>

                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <i className="bi bi-person-fill text-success me-2"></i>
                    <strong>Name:</strong> {userName}
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-envelope-fill text-success me-2"></i>
                    <strong>Email:</strong> {sessionStorage.getItem("email")}
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-telephone-fill text-success me-2"></i>
                    <strong>Contact:</strong> +91 9876543210
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-geo-alt-fill text-success me-2"></i>
                    <strong>Farm Location:</strong> Ludhiana, Punjab, 12 Acres
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-tree-fill text-success me-2"></i>
                    <strong>Farming Type:</strong> Organic
                  </li>
                  <li className="mb-2">
                    <i className="bi bi-calendar-check-fill text-success me-2"></i>
                    <strong>Joined On:</strong> June 10, 2025
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI Farming Tip Card */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-sm"
              style={{
                borderRadius: "20px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="card-body p-4">
                <h6 className="text-success fw-bold mb-3">🌿 AI Farming Tip</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.95rem" }}>
                  Based on your region and soil type, you should consider crop rotation with
                  pulses to improve nitrogen balance naturally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-success rounded-circle d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          fontSize: "28px",
          boxShadow: "0px 6px 15px rgba(22,163,74,0.5)",
        }}
      >
        <i className="bi bi-plus-lg text-white"></i>
      </button>
    </div>
  );
};

export default FarmerDashboard;