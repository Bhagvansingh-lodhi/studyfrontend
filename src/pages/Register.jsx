import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await apiRequest("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-12 flex-col justify-between">
        <div className="max-w-md">

          {/* Branding */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
              <span className="text-emerald-800 font-extrabold text-lg">📚</span>
            </div>
            <span className="text-2xl font-bold tracking-wide">StudyArchitect</span>
          </div>

          {/* Title */}
          <div className="space-y-6 mt-16">
            <h1 className="text-4xl font-bold leading-tight">
              Start your learning journey with AI
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Create an account and turn any topic into structured learning—notes,
              flashcards, quizzes, and revision plans personalized for you.
            </p>
          </div>

          {/* Points */}
          <div className="mt-12 space-y-4 text-emerald-50 text-sm">
            {[
              "Custom AI-powered topic breakdown",
              "Smart revision with spaced repetition",
              "Progress tracking and achievements",
              "Practice quizzes based on weaknesses",
            ].map((text, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
          © 2025 StudyArchitect — Your learning, organized.
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-emerald-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-extrabold">📚</span>
              </div>
              <span className="text-xl font-bold text-gray-900">StudyArchitect</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Create your account</h2>
            <p className="mt-2 text-gray-600">
              Join thousands of learners improving smarter with AI.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6 mt-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                required
                className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                value={form.email}
                type="email"
                onChange={onChange}
                required
                className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={onChange}
                className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="Create a strong password"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 py-3 px-4">
                <p className="text-sm text-red-600">⚠️ {error}</p>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium disabled:opacity-60 shadow-sm hover:shadow-lg transition"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link className="text-emerald-700 hover:text-emerald-800 font-medium" to="/login">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
