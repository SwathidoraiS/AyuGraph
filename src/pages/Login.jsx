import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // ✅ import firebase auth

export default function LoginPage({ onLoginSuccess }) { // ✅ receive callback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in..."); // 💡 Provide immediate feedback
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", email);
      setMessage("✅ Login successful!");
      // 💡 Call the onLoginSuccess callback immediately after a successful login.
      // The setTimeout from the previous version is not needed and can cause issues.
      onLoginSuccess();
    } catch (err) {
      setMessage("❌ " + err.message);
      // 💡 Add a console log to see the error in dev tools
      console.error("Login Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-yellow-50 to-white font-sans">
      <div className="bg-[#FFF5E0] rounded-2xl shadow-xl p-10 w-full max-w-md">
        {/* App Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">AyuGraph</h1>
          <p className="text-sm text-yellow-800 mt-1">
            Your Personal Ayurvedic Health Companion
          </p>
        </div>

        {/* Card Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your AyuGraph account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* ✅ Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-yellow-400 text-white font-medium py-3 rounded-lg shadow-md hover:opacity-90 transition flex items-center justify-center"
          >
            Sign In
          </button>
        </form>

        {/* ✅ Popup */}
        {message && (
          <div className="mt-4 p-3 text-center rounded-lg shadow bg-white text-gray-800">
            {message}
          </div>
        )}

        {/* Links */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-green-700 font-semibold hover:text-green-800"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}