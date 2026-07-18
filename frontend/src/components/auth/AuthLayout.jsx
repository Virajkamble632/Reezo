import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] flex items-center justify-center px-6 py-12">

      {/* Background */}

      <div className="absolute inset-0 overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[160px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
          }}
          className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[160px]"
        />

      </div>

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .6,
        }}
        className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10"
      > 
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>

        {/* Logo */}

        <div className="flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-3xl font-bold text-white shadow-[0_0_30px_rgba(37,99,235,.35)]">

            R

          </div>

        </div>

        <h1 className="mt-8 text-center text-4xl font-bold text-white">

          {title}

        </h1>

        <p className="mt-3 text-center text-slate-400">

          {subtitle}

        </p>

        <div className="mt-10">

          {children}

        </div>

      </motion.div>

    </div>
  );
};

export default AuthLayout;