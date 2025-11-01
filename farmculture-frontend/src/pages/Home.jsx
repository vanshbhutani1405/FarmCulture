// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Row, Col, Container, Button, Image } from "react-bootstrap";
import tractor from "../assets/farm.jpg"; // 3D tractor image

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      {/* Top Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            role="button"
            className="fw-bold text-success fs-4 d-flex align-items-center"
          >
            <span className="me-2">🌱</span> FarmCulture
          </Navbar.Brand>

          <Nav className="ms-auto align-items-center">
            <Button
              variant="link"
              className="text-dark me-2 fw-semibold text-decoration-none"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline-success"
              className="fw-semibold px-4 rounded-pill"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Card */}
      <section className="flex-grow-1 py-4 py-md-5">
        <Container className="py-2 py-md-4">
          <div className="bg-white shadow rounded-4 p-4 p-md-5">
            <Row className="align-items-center g-4 g-md-5">
              {/* Left: Text */}
              <Col xs={12} md={6}>
                <div>
                  <h1 className="fw-bold display-5 text-dark mb-3">
                    Get Your Crop <br className="d-none d-lg-block" />
                    Recommendation
                  </h1>
                  <p className="text-secondary fs-5 mb-4">
                    An AI-powered smart crop and cultivation recommender that helps you
                    maximize yield.
                  </p>

                  <div className="d-flex flex-wrap gap-3">
                    <Button
                      variant="success"
                      className="fw-semibold px-4 py-2 rounded-pill"
                      onClick={() => navigate("/form")}
                    >
                      Get Recommendation
                    </Button>

                    <Button
                      variant="outline-success"
                      className="fw-semibold px-4 py-2 rounded-pill"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </Button>
                  </div>
                </div>
              </Col>

              {/* Right: Illustration */}
              <Col xs={12} md={6} className="text-center">
                <div className="d-inline-block bg-white rounded-4 p-3 shadow-sm">
                  <Image
                    src={tractor}
                    alt="Farm tractor illustration"
                    className="img-fluid rounded-4"
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
