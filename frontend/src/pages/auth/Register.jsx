import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import api from "../../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success(data.message);

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account "
      subtitle="Join Reezo and start collaborating."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Name */}

        <div className="relative">

          <FiUser
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-4 text-white outline-none transition focus:border-blue-500"
          />

        </div>

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
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>

        {/* Confirm Password */}

        <div className="relative">

          <FiLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white outline-none transition focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>

        </div>

        {/* Register Button */}

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Login */}

        <p className="text-center text-slate-400">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </form>
    </AuthLayout>
  );
};

export default Register;