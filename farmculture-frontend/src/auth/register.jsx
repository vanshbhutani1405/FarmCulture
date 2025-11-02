import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    farmingType: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createUserDoc = async (uid, payload) => {
    try {
      await setDoc(doc(db, "users", uid), {
        name: payload.name || "",
        email: payload.email || "",
        contact: payload.contact || "",
        location: payload.location || "",
        farmingType: payload.farmingType || "",
        createdAt: serverTimestamp(),
      });
      console.log("✅ User saved in Firestore");
    } catch (error) {
      console.error("🔥 Firestore Error:", error.message);
      toast.error("Failed to save user to database: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error("Passwords do not match");
    }
    if (form.contact.length !== 10 || isNaN(form.contact)) {
      return toast.error("Contact number must be a valid 10-digit number");
    }

    try {
      setBusy(true);
      const { name, email, password, contact, location, farmingType } = form;

      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });

      await createUserDoc(cred.user.uid, {
        name,
        email,
        contact,
        location,
        farmingType,
      });

      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("uid", cred.user.uid);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("name", name);

      toast.success("Registration Successful!");
      nav("/home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setBusy(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);

      await createUserDoc(cred.user.uid, {
        name: cred.user.displayName,
        email: cred.user.email,
        contact: "",
        location: "",
        farmingType: "",
      });

      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("uid", cred.user.uid);
      sessionStorage.setItem("email", cred.user.email);
      sessionStorage.setItem("name", cred.user.displayName);

      toast.success("Signed up with Google!");
      nav("/home");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(180deg,#edf7ef 0%, #fafdf9 100%)" }}
    >
      <div className="container">
        <div
          className="card border-0 shadow rounded-4 mx-auto"
          style={{ maxWidth: 520 }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: 22 }}>🌿</span>
                <span className="fw-semibold" style={{ color: "#166534" }}>
                  FarmCulture
                </span>
              </div>
              <Link to="/login" className="btn btn-outline-success btn-sm px-3">
                Login
              </Link>
            </div>

            <h3 className="text-center fw-bold mb-3">Create your account</h3>

            <form onSubmit={handleRegister} className="mt-3">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Number (10 digits)"
                  name="contact"
                  value={form.contact}
                  onChange={onChange}
                  required
                  maxLength="10"
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location (City / District)"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Farming Type (Organic, Traditional, etc.)"
                  name="farmingType"
                  value={form.farmingType}
                  onChange={onChange}
                  required
                />
              </div>

              {/* Password fields */}
              <div className="mb-3">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Confirm Password"
                  name="confirm"
                  value={form.confirm}
                  onChange={onChange}
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
                disabled={busy}
              >
                {busy ? "Creating account..." : "Sign up"}
              </button>

              <div className="text-center my-3">or</div>

              <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={handleGoogle}
                disabled={busy}
              >
                Continue with Google
              </button>
            </form>

            <div className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="fw-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;