import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jsPDF } from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Data passed from FormPage → navigate("/result", { state: res })
  const cropData = location.state || {};

  // ✅ If no data found, ask user to go back
  if (!cropData.recommended_crop) {
    return (
      <div className="text-center mt-5">
        <h4>No crop data found. Please submit the form first.</h4>
        <button
          onClick={() => navigate("/form")}
          className="btn btn-success mt-3 px-4 py-2 fw-semibold shadow-sm"
        >
          Go to Form
        </button>
      </div>
    );
  }

  // ✅ Generate downloadable PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("FarmCulture - Crop Recommendation Report", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`Recommended Crop: ${cropData.recommended_crop}`, 20, 40);
    doc.text(`Suitability Score: ${cropData.suitability_score || "N/A"}%`, 20, 50);
    doc.text(`Confidence Level: ${cropData.confidence || "N/A"}`, 20, 60);

    doc.text("AI Farming Summary:", 20, 80);
    doc.text(cropData.ai_summary || "No summary available", 20, 90, {
      maxWidth: 170,
    });

    doc.save("FarmCulture_Report.pdf");
  };

  return (
    <>
      <Navbar />
      <div
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
        style={{
          background: "linear-gradient(to bottom right, #e9f8ef, #f9fff9)",
          fontFamily: "Poppins, sans-serif",
          paddingTop: "40px",
        }}
      >
        {/* 🌾 Cards Section */}
        <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
          {/* Left Card - Recommended Crop */}
          <div
            className="card border-0 shadow-lg p-4 text-center"
            style={{
              width: "340px",
              height: "320px",
              borderRadius: "20px",
              background: "#ffffff",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 className="text-success fw-bold">
              🌾 Recommended Crop: {cropData.recommended_crop}
            </h5>
            <p className="text-muted mt-2">
              Suitability: {cropData.suitability_score || "N/A"}% | Confidence:{" "}
              {cropData.confidence || "N/A"}
            </p>

            {/* Icons */}
            <div className="d-flex justify-content-center gap-4 mt-4">
              <div>
                <i className="bi bi-cloud-sun text-success fs-3"></i>
                <p className="text-muted small">Weather</p>
              </div>
              <div>
                <i className="bi bi-droplet-half text-success fs-3"></i>
                <p className="text-muted small">Nutrients</p>
              </div>
              <div>
                <i className="bi bi-bar-chart text-success fs-3"></i>
                <p className="text-muted small">Levels</p>
              </div>
            </div>

            {/* Crop Score */}
            <div
              className="mt-4 mx-auto border border-3 border-success rounded-circle d-flex flex-column justify-content-center align-items-center"
              style={{
                width: "100px",
                height: "100px",
                background: "#f5fff8",
              }}
            >
              <h4 className="text-success fw-bold mb-0">
                {cropData.suitability_score || 0}%
              </h4>
              <p className="text-muted small mb-0">Crop Fit Score</p>
            </div>
          </div>

          {/* Right Card - AI Summary */}
          <div
            className="card border-0 shadow-lg p-4"
            style={{
              width: "380px",
              height: "320px",
              borderRadius: "20px",
              background: "#ffffff",
              boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h5 className="text-success fw-bold mb-3">
              🤖 AI-Generated Farming Summary
            </h5>
            <p
              className="text-muted"
              style={{
                fontSize: "0.9rem",
                maxHeight: "180px",
                overflowY: "auto",
              }}
            >
              {cropData.ai_summary ||
                "No AI summary available for this crop recommendation."}
            </p>
          </div>
        </div>

        {/* 🌾 Action Buttons */}
        <div className="text-center mt-4 mb-5">
          <button
            onClick={generatePDF}
            className="btn btn-success px-4 py-2 fw-semibold shadow-sm rounded-pill me-3"
            style={{
              boxShadow: "0px 4px 15px rgba(22, 163, 74, 0.4)",
              transition: "0.3s",
            }}
          >
            <i className="bi bi-file-earmark-arrow-down me-2"></i> Download Report
          </button>

          <button
            onClick={() => navigate("/form")}
            className="btn btn-outline-success px-4 py-2 fw-semibold rounded-pill"
          >
            <i className="bi bi-arrow-left-circle me-2"></i> Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ResultPage;
