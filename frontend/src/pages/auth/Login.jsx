import { use, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

import api from "../../utils/api";
import AuthLayout from "../../components/auth/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

        const { data } = await api.post("/auth/login", formData);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        toast.success(data.message);
        navigate("/dashboard");
        
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your meetings." 
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Email */}

        <div className="relative">

          <FiMail
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-4 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Password */}

        <div className="relative">

          <FiLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white outline-none transition focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPassword ? (
              <FiEyeOff size={20} />
            ) : (
              <FiEye size={20} />
            )}
          </button>

        </div>

        {/* Forgot */}

        <div className="flex justify-end">

          <Link
            to="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300"
          >
            Forgot Password?
          </Link>

        </div>

        {/* Login */}

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Divider */}

        <div className="flex items-center gap-4">

          <div className="h-px flex-1 bg-white/10" />

          <span className="text-sm text-slate-400">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* Google */}

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-4 text-white transition hover:bg-white/10"
        >
          <FcGoogle size={24} />

          Continue with Google

        </button>

        {/* Register */}

        <p className="text-center text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default Login;