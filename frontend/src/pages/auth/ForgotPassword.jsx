import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import { toast } from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import api from "../../utils/api";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email.");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/forgot-password", {
        email,
      });

      console.log(data);

      toast.success(data.message);

      setEmail("");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your registered email to receive a password reset link."
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-4 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Button */}

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 py-4 font-semibold text-white transition hover:scale-[1.02]"
        >

          {loading
            ? "Sending..."
            : "Send Reset Link"}

        </button>

        <p className="text-center text-slate-400">

          Remember your password?{" "}

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

export default ForgotPassword;