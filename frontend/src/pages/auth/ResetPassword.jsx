import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast } from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import api from "../../utils/api";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

    // Validation
    if (!formData.password || !formData.confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters.");
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await api.post(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );

      toast.success(data.message);

      setFormData({
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {

      console.log(error.response?.data);

      toast.dismiss();

      toast.error(error.response?.data?.message, {
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new secure password for your Reezo account."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* New Password */}

        <div className="relative">
          <FiLock
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            {showPassword ? (
              <FiEyeOff size={20} />
            ) : (
              <FiEye size={20} />
            )}
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
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-14 text-white placeholder:text-slate-400 outline-none transition focus:border-blue-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
          >
            {showConfirmPassword ? (
              <FiEyeOff size={20} />
            ) : (
              <FiEye size={20} />
            )}
          </button>
        </div>

        {/* Update Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>

        {/* Back to Login */}

        <p className="text-center text-slate-400">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;