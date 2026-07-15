import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = ({
  label,
  type = "text",
  icon,
  error,
  value,
  onChange,
  placeholder = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-2xl border bg-white/5 backdrop-blur-xl transition-all duration-300
        ${
          error
            ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,.25)]"
            : "border-white/10 focus-within:border-blue-500 focus-within:shadow-[0_0_25px_rgba(37,99,235,.25)]"
        }`}
      >
        {icon && (
          <div className="pl-5 text-slate-400">
            {icon}
          </div>
        )}

        <input
          type={isPassword && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent px-5 py-4 text-white outline-none placeholder:text-slate-500"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-5 text-slate-400 transition hover:text-white"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;