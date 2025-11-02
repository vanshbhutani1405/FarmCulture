import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getCropRecommendation } from "../services/api";

function FormPage() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const formattedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, Number(value)])
    );

    // ✅ Call backend
    const res = await getCropRecommendation(formattedData);

    // ✅ Store in Firestore (optional)
    const userId = sessionStorage.getItem("uid") || "guest";
    await addDoc(collection(db, "cropRecommendations"), {
      userId,
      input: formattedData,
      recommendedCrop: res.recommended_crop,
      createdAt: serverTimestamp(),
    });

    // ✅ Navigate with backend data
    navigate("/result", { state: res });

  } catch (err) {
    console.error("🔥 Error:", err);
    setError("Server error. Please try again.");
  }

  setLoading(false);
};


  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to bottom right, #e9f8ef, #f9fff9)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container p-4">
        <div
          className="card shadow-lg border-0 rounded-4 p-4 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <h2 className="text-center fw-bold text-success mb-3">
            🌿 Soil & Weather Details
          </h2>
          <p className="text-center text-muted mb-4">
            Enter your field data — it will be saved to your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {[
                { name: "nitrogen", label: "Nitrogen (N)" },
                { name: "phosphorus", label: "Phosphorus (P)" },
                { name: "potassium", label: "Potassium (K)" },
                { name: "temperature", label: "Temperature (°C)" },
                { name: "humidity", label: "Humidity (%)" },
                { name: "ph", label: "Soil pH" },
                { name: "rainfall", label: "Rainfall (mm)" },
              ].map((field) => (
                <div className="col-md-6" key={field.name}>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control border-success shadow-sm"
                      name={field.name}
                      placeholder={field.label}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                    <label className="text-success">{field.label}</label>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn btn-success px-5 py-2 fw-semibold shadow-sm"
                style={{ borderRadius: "10px" }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" animation="border" className="me-2" /> Saving...
                  </>
                ) : (
                  "Get Report"
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-danger text-center mt-4 shadow-sm rounded-3">
              ⚠ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FormPage;
