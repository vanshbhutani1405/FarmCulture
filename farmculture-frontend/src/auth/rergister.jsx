import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

// Firebase
import { auth, db } from "../firebase"; // adjust path if needed
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

// import logo from "../assets/logo.png";

const Register = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const createUserDoc = async (uid, payload) => {
    await setDoc(doc(db, "users", uid), {
      name: payload.name || "",
      email: payload.email || "",
      createdAt: serverTimestamp(),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Please enter your name");
    if (form.password !== form.confirm) {
      return toast.error("Passwords do not match");
    }
    try {
      setBusy(true);
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );

      // set displayName
      await updateProfile(cred.user, { displayName: form.name.trim() });

      // save to Firestore
      await createUserDoc(cred.user.uid, {
        name: form.name.trim(),
        email: form.email.trim(),
      });

      // session
      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("uid", cred.user.uid);
      sessionStorage.setItem("email", form.email.trim());
      sessionStorage.setItem("name", form.name.trim());

      toast.success("Registered successfully!");
      nav("/home");
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setBusy(true);
      const provider = new GoogleAuthProvider();
      const cred = await signInWithPopup(auth, provider);
      const { uid, email, displayName } = cred.user;

      // if user doc missing, create it
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          name: displayName || "",
          email: email || "",
          createdAt: serverTimestamp(),
        });
      }

      sessionStorage.setItem("isLogin", "true");
      sessionStorage.setItem("uid", uid);
      sessionStorage.setItem("email", email || "");
      if (displayName) sessionStorage.setItem("name", displayName);

      toast.success("Signed up with Google!");
      nav("/home");
    } catch (err) {
      toast.error(err.message || "Google sign-up failed");
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
            {/* Header with logo + Login */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: 22 }}>🌿</span>
                {/* <img src={logo} alt="logo" height={22} /> */}
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
                  placeholder="Name"
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
