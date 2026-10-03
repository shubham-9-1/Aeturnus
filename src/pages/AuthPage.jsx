import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { readDemoStore, writeDemoStore } from "../state/demoStore";
import "../Workspace.css";

function AuthPage({ mode = "signup" }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isLogin = mode === "login";

  function enterDemo(event) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      setError("Check your name and enter a valid email address.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const existing = readDemoStore();
    const profile = {
      ...existing.profile,
      name: String(formData.get("name") || existing.profile.name || "").trim(),
      email: String(formData.get("email") || "").trim(),
      country: String(
        formData.get("country") || existing.profile.country || "India",
      ),
      locale: String(
        formData.get("locale") || existing.profile.locale || "en-IN",
      ),
    };
    if (!profile.name || !profile.email) {
      setError("Enter your name and email to open the local demo.");
      return;
    }
    writeDemoStore({ ...existing, profile });
    navigate("/dashboard");
  }

  return (
    <main className="auth-page">
      <div className="auth-shell">
        <Link to="/" className="workspace-brand auth-brand">
          <span className="brand-emblem">A</span>
          <span>
            Aeturnus<small>CONTINUITY, ON YOUR TERMS</small>
          </span>
        </Link>
        <section className="auth-card">
          <p className="page-eyebrow">PRIVATE BY DESIGN</p>
          <h1>{isLogin ? "Welcome back" : "Start your continuity plan"}</h1>
          <p className="auth-lead">
            {isLogin
              ? "Continue to your local Aeturnus demo workspace."
              : "Set up a personal workspace. Your demo information stays in this browser."}
          </p>
          <form onSubmit={enterDemo} className="auth-form" noValidate>
            {!isLogin && (
              <label className="form-field">
                Your name
                <input
                  name="name"
                  required
                  maxLength="90"
                  autoComplete="name"
                  placeholder="How should we address you?"
                />
              </label>
            )}
            {isLogin && (
              <label className="form-field">
                Your name
                <input
                  name="name"
                  required
                  maxLength="90"
                  autoComplete="name"
                  defaultValue={readDemoStore().profile.name}
                  placeholder="Name on your local profile"
                />
              </label>
            )}
            <label className="form-field">
              Email address
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                defaultValue={isLogin ? readDemoStore().profile.email : ""}
                placeholder="you@example.com"
              />
            </label>
            {!isLogin && (
              <>
                <label className="form-field">
                  Country or region
                  <select name="country" defaultValue="India">
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="form-field">
                  Preferred date format
                  <select name="locale" defaultValue="en-IN">
                    <option value="en-IN">India · DD/MM/YYYY</option>
                    <option value="en-GB">United Kingdom · DD/MM/YYYY</option>
                    <option value="en-US">United States · MM/DD/YYYY</option>
                  </select>
                </label>
              </>
            )}
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button className="button button-primary auth-submit" type="submit">
              {isLogin ? "Continue to demo" : "Create demo workspace"}
              <span>→</span>
            </button>
          </form>
          <div className="auth-note">
            <strong>Frontend prototype</strong>
            <p>
              No password is requested. This demo does not create an account,
              contact anyone, or send information to a server.
            </p>
          </div>
          <p className="auth-switch">
            {isLogin ? "New to Aeturnus?" : "Already explored the demo?"}{" "}
            <Link to={isLogin ? "/signup" : "/login"}>
              {isLogin ? "Set up a profile" : "Use an existing profile"}
            </Link>
          </p>
        </section>
        <Link to="/" className="auth-back">
          ← Back to Aeturnus
        </Link>
      </div>
      <aside className="auth-aside">
        <span className="aside-orbit orbit-large" />
        <span className="aside-orbit orbit-small" />
        <div>
          <p className="eyebrow-light">A CALMER WAY TO PREPARE</p>
          <h2>Keep what matters clear. Keep the choices yours.</h2>
          <p>
            Organize selected information, name people you trust and decide how
            future access should work.
          </p>
        </div>
        <small>DEMO MODE · NO BACKEND CONNECTED</small>
      </aside>
    </main>
  );
}

export default AuthPage;
