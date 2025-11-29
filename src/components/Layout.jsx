import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center shadow-sm">
              <span className="text-white font-extrabold text-sm">📚</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-base">StudyArchitect</span>
              <span className="text-[11px] text-gray-500">
                Your learning blueprint
              </span>
            </div>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3 text-sm">
            {user && (
              <>
                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-medium">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium shadow-sm hover:shadow-md transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
