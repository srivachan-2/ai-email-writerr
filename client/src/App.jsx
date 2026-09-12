import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [loading, setLoading] = useState(false);

  // LOGIN / REGISTER
  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isLogin
        ? `${API_URL}/api/auth/login`
        : `${API_URL}/api/auth/register`;

      const body = isLogin
        ? {
          email,
          password,
        }
        : {
          name,
          email,
          password,
        };

      const response = await axios.post(url, body);

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setIsLoggedIn(true);
      setMessage("");
    } catch (error) {
      console.error("Authentication error:", error);

      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Unable to connect to server"
      );
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    setEmail("");
    setPassword("");
    setMessage("");
  };

  // GENERATE EMAIL
  const handleGenerate = async () => {
    if (!purpose || !tone || !keyPoints) {
      setEmailDraft(
        "Please fill in purpose, tone and key points."
      );
      return;
    }

    try {
      setLoading(true);
      setEmailDraft("");

      const response = await axios.post(
        `${API_URL}/api/email/generate`,
        {
          purpose,
          tone,
          keyPoints,
        }
      );

      setEmailDraft(response.data.email);
    } catch (error) {
      console.error("Email generation error:", error);

      setEmailDraft(
        error.response?.data?.message ||
        error.message ||
        "Failed to generate email"
      );
    } finally {
      setLoading(false);
    }
  };

  // DASHBOARD
  if (isLoggedIn) {
    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    return (
      <div className="dashboard">

        <div className="ambient ambient-one"></div>
        <div className="ambient ambient-two"></div>

        <nav className="navbar glass">
          <div className="brand">
            <div className="brand-icon">
              ✦
            </div>

            <span>
              AI Email Writer
            </span>
          </div>

          <div className="nav-right">
            <span>
              Hi, {user.name || "User"}
            </span>

            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </nav>

        <main className="dashboard-content">

          <section className="hero">

            <div className="hero-badge">
              <span>✦</span>
              AI-powered writing
            </div>

            <h1>
              Write better emails.
              <br />
              <span>In seconds.</span>
            </h1>

            <p>
              Turn your thoughts into polished,
              professional emails with AI.
            </p>

          </section>

          <div className="writer-grid">

            {/* INPUT CARD */}
            <section className="input-card glass">

              <div className="card-heading">
                <div>
                  <span className="small-label">
                    COMPOSE
                  </span>

                  <h2>
                    Create your email
                  </h2>
                </div>

                <div className="card-icon">
                  ✦
                </div>
              </div>

              <label>
                Purpose
              </label>

              <input
                type="text"
                placeholder="e.g. Request a meeting"
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
              />

              <label>
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value)
                }
              >
                <option>
                  Professional
                </option>

                <option>
                  Friendly
                </option>

                <option>
                  Formal
                </option>

                <option>
                  Casual
                </option>

                <option>
                  Apologetic
                </option>

                <option>
                  Persuasive
                </option>

                <option>
                  Romantic
                </option>
              </select>

              <label>
                Key points
              </label>

              <textarea
                className="keypoints"
                placeholder="What should the email say?"
                value={keyPoints}
                onChange={(e) =>
                  setKeyPoints(e.target.value)
                }
                rows="7"
              />

              <button
                className="generate-btn"
                onClick={handleGenerate}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Email
                    <span>↗</span>
                  </>
                )}
              </button>

            </section>

            {/* OUTPUT CARD */}
            <section className="output-card glass">

              <div className="card-heading">

                <div>
                  <span className="small-label">
                    AI OUTPUT
                  </span>

                  <h2>
                    Email draft
                  </h2>
                </div>

                {emailDraft && !loading && (
                  <button
                    className="copy-btn"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        emailDraft
                      )
                    }
                  >
                    Copy
                  </button>
                )}

              </div>

              <textarea
                className="email-output"
                placeholder={
                  loading
                    ? "AI is writing your email..."
                    : "Your generated email will appear here..."
                }
                value={emailDraft}
                onChange={(e) =>
                  setEmailDraft(e.target.value)
                }
              />

              {!emailDraft && !loading && (
                <div className="empty-state">

                  <div className="empty-icon">
                    ✦
                  </div>

                  <p>
                    Your AI-generated email
                    will appear here
                  </p>

                  <span>
                    Fill in the details and
                    click Generate Email
                  </span>

                </div>
              )}

            </section>

          </div>

        </main>

      </div>
    );
  }

  // LOGIN / REGISTER
  return (
    <div className="auth-page">

      <div className="auth-glow glow-one"></div>
      <div className="auth-glow glow-two"></div>

      <div className="auth-wrapper">

        {/* LEFT SIDE */}
        <div className="auth-intro">

          <div className="brand">
            <div className="brand-icon">
              ✦
            </div>

            <span>
              AI Email Writer
            </span>
          </div>

          <div className="intro-content">

            <div className="hero-badge">
              <span>✦</span>
              Intelligent writing assistant
            </div>

            <h1>
              Your words.
              <br />
              <span>Made better.</span>
            </h1>

            <p>
              Write clear, confident and polished
              emails without staring at a blank page.
            </p>

            <div className="feature-list">

              <div className="feature">

                <div className="feature-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    AI-powered writing
                  </strong>

                  <span>
                    Generate polished emails instantly
                  </span>
                </div>

              </div>

              <div className="feature">

                <div className="feature-icon">
                  ✓
                </div>

                <div>
                  <strong>
                    Choose your tone
                  </strong>

                  <span>
                    Professional, friendly, formal and more
                  </span>
                </div>

              </div>

              <div className="feature">

                <div className="feature-icon">
                  ↗
                </div>

                <div>
                  <strong>
                    Edit & copy
                  </strong>

                  <span>
                    Refine your draft before sending
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* LOGIN CARD */}
        <div className="auth-card glass">

          <div className="auth-card-header">

            <div className="mobile-brand brand">

              <div className="brand-icon">
                ✦
              </div>

              <span>
                AI Email Writer
              </span>

            </div>

            <h2>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h2>

            <p>
              {isLogin
                ? "Sign in to continue writing smarter."
                : "Start writing better emails today."}
            </p>

          </div>

          <form onSubmit={handleAuth}>

            {!isLogin && (
              <div className="field">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>
            )}

            <div className="field">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="field">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="auth-submit"
            >
              {isLogin
                ? "Sign in"
                : "Create account"}

              <span>
                →
              </span>
            </button>

          </form>

          {message && (
            <p className="message">
              {message}
            </p>
          )}

          <div className="auth-switch">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage("");
              }}
            >
              {isLogin
                ? "Create one"
                : "Sign in"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;