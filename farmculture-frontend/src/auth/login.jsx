// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";

// // Firebase
// import { auth, db } from "../firebase"; // adjust path if your file is elsewhere
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import {
//   doc,
//   getDoc,
//   setDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// // Assets (optional logo icon). If you have a logo image, import it; else keep emoji.
//  // import logo from "../assets/logo.png";

// const Login = () => {
//   const nav = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [remember, setRemember] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [busy, setBusy] = useState(false);

//   // Ensure a users doc exists (for Google or first-time email login)
//   const ensureUserDoc = async (uid, data) => {
//     const ref = doc(db, "users", uid);
//     const snap = await getDoc(ref);
//     if (!snap.exists()) {
//       await setDoc(ref, {
//         name: data?.name || data?.displayName || "",
//         email: data?.email || "",
//         createdAt: serverTimestamp(),
//       });
//     }
//     return (await getDoc(ref)).data();
//   };

//   // Email/password login
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       setBusy(true);
//       const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
//       const { uid } = cred.user;

//       // fetch/create user profile
//       const profile = await ensureUserDoc(uid, { email });

//       // session
//       sessionStorage.setItem("isLogin", "true");
//       sessionStorage.setItem("uid", uid);
//       sessionStorage.setItem("email", email.trim());
//       if (profile?.name) sessionStorage.setItem("name", profile.name);

//       toast.success("Logged in successfully!");
//       nav("/home");
//     } catch (err) {
//       toast.error(err.message || "Login failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   // Google login
//   const handleGoogle = async () => {
//     try {
//       setBusy(true);
//       const provider = new GoogleAuthProvider();
//       const cred = await signInWithPopup(auth, provider);
//       const { uid, email, displayName } = cred.user;

//       const profile = await ensureUserDoc(uid, {
//         email,
//         name: displayName,
//         displayName,
//       });

//       sessionStorage.setItem("isLogin", "true");
//       sessionStorage.setItem("uid", uid);
//       sessionStorage.setItem("email", email || "");
//       if (profile?.name || displayName) {
//         sessionStorage.setItem("name", profile?.name || displayName || "");
//       }

//       toast.success("Logged in with Google!");
//       nav("/home");
//     } catch (err) {
//       toast.error(err.message || "Google sign-in failed");
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div
//       className="min-vh-100 d-flex align-items-center justify-content-center"
//       style={{ background: "linear-gradient(180deg,#edf7ef 0%, #fafdf9 100%)" }}
//     >
//       <div className="container">
//         <div
//           className="card border-0 shadow rounded-4 mx-auto"
//           style={{ maxWidth: 520 }}
//         >
//           <div className="card-body p-4 p-md-5">
//             {/* Header with logo + Register */}
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="d-flex align-items-center gap-2">
//                 <span style={{ fontSize: 22 }}>🌿</span>
//                 {/* If you have an image: <img src={logo} alt="logo" height={22} /> */}
//                 <span className="fw-semibold" style={{ color: "#166534" }}>
//                   FarmCulture
//                 </span>
//               </div>
//               <Link to="/register" className="btn btn-success btn-sm px-3">
//                 Register
//               </Link>
//             </div>

//             <h3 className="text-center fw-bold mb-3">Login to your account</h3>

//             <form onSubmit={handleLogin} className="mt-3">
//               <div className="mb-3">
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   autoFocus
//                 />
//               </div>

//               <div className="mb-3">
//                 <div className="input-group">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     className="form-control"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowPassword((s) => !s)}
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>

//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="remember"
//                     checked={remember}
//                     onChange={(e) => setRemember(e.target.checked)}
//                   />
//                   <label className="form-check-label" htmlFor="remember">
//                     Remember me
//                   </label>
//                 </div>
//                 {/* Forgot password is disabled as requested */}
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-success w-100"
//                 disabled={busy}
//               >
//                 {busy ? "Logging in..." : "Login"}
//               </button>

//               <div className="text-center my-3">or</div>

//               <button
//                 type="button"
//                 className="btn btn-outline-danger w-100"
//                 onClick={handleGoogle}
//                 disabled={busy}
//               >
//                 Continue with Google
//               </button>
//             </form>

//             <div className="text-center mt-3">
//               Don&apos;t have an account?{" "}
//               <Link to="/register" className="fw-semibold">
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
