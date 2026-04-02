// LoginPage.jsx
import { useState } from "react";
import "../Css/auth.css";
import "../Css/Login.css";

export default function LoginPage({ onSwitch }) {
  const [form, setForm]           = useState({ email: "", password: "", remember: false });
  const [showPw, setShowPw]       = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="auth-card text-center">
        <div className="login-success-icon">
          <i className="bi bi-house-check-fill"></i>
        </div>
        <h3>Welcome back!</h3>
        <p className="sub">
          You're signed in to PropManage. Redirecting to your dashboard...
        </p>
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border login-spinner"></div>
        </div>
      </div>
    );
  }

  /* ── Login Form ── */
  return (
    <div className="auth-card">
      <h3>Welcome back</h3>
      <p className="sub">Sign in to manage your properties.</p>

      {error && (
        <div className="alert-custom">
          <i className="bi bi-exclamation-circle me-2"></i>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <div className="input-group input-icon">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="john@company.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label mb-0">Password</label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>
          <div className="input-group input-icon mt-1">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              name="password"
              type={showPw ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPw(!showPw)}
            >
              <i className={`bi ${showPw ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="mb-4 mt-2">
          <div className="form-check">
            <input
              name="remember"
              className="form-check-input"
              type="checkbox"
              id="remember"
              checked={form.remember}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="remember">
              Keep me signed in for 30 days
            </label>
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary-main mb-3" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Signing in...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </>
          )}
        </button>

        {/* Divider */}
        {/* <div className="divider">
          <hr /><span>or continue with</span><hr />
        </div> */}

        {/* Social buttons */}
        {/* <div className="social-row">
          {[
            { icon: "bi-google",    label: "Google",    color: "#c0392b" },
            { icon: "bi-microsoft", label: "Microsoft", color: "#1a6b9a" },
          ].map((btn) => (
            <button type="button" className="social-btn" key={btn.label}>
              <i className={btn.icon} style={{ color: btn.color, fontSize: "1rem" }}></i>
              {btn.label}
            </button>
          ))}
        </div> */}

      </form>

      <div className="switch-text">
        Don't have an account?{" "}
        <button onClick={onSwitch}>Create one free</button>
      </div>
    </div>
  );
}
