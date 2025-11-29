import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-12 flex-col justify-between">
        <div className="max-w-md">
          {/* Branding */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-emerald-800 font-extrabold text-lg">📚</span>
            </div>
            <span className="text-2xl font-bold tracking-wide">
              StudyArchitect
            </span>
          </div>

          {/* Main Text */}
          <div className="space-y-6 mt-16">
            <h1 className="text-4xl font-bold">
              Welcome back to your learning blueprint
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed">
              StudyArchitect helps you learn smarter with AI-generated notes,
              flashcards, quizzes, and revision planning — customized to your
              pace and goals.
            </p>
          </div>

          {/* Features */}
          <div className="mt-12 space-y-4 text-emerald-50 text-sm">
            {[
              "AI-generated topic notes & summaries",
              "Smart spaced revision with flashcards",
              "Track progress, milestones & achievements",
              "Adaptive quizzes based on weak topics",
            ].map((text, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-emerald-200 text-sm">
          © 2025 StudyArchitect — Built for learners worldwide.
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-lg">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                StudyArchitect
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back 👋</h2>
            <p className="mt-1 text-gray-600">
              Continue learning—sign in to your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 mt-8">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="example@email.com"
              />
            </div>

            {/* Password with view toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={onChange}
                  className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 py-3 px-4">
                <p className="text-sm text-red-600 flex items-center">
                  ⚠️ {error}
                </p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full px-4 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center shadow-sm hover:shadow-lg"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              New here?{" "}
              <Link
                className="text-emerald-700 hover:text-emerald-800 font-medium"
                to="/register"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
