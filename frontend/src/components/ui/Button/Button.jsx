import { buttonVariants } from "./buttonVariants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Button = ({
  children,
  variant,
  size,
  fullWidth,
  className,
  leftIcon,
  rightIcon,
  loading,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          buttonVariants({
            variant,
            size,
            fullWidth,
          }),
          className
        )
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}

      {!loading && leftIcon}

      {!loading && children}

      {!loading && rightIcon}
    </button>
  );
};

export default Button;