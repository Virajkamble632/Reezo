import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 text-white shadow-[0_8px_30px_rgba(37,99,235,.35)] hover:scale-105 hover:shadow-[0_10px_35px_rgba(37,99,235,.55)]",

        secondary:
          "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700",

        outline:
          "border border-slate-600 text-white hover:bg-slate-800",

        glass:
          "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10",

        danger:
          "bg-red-600 hover:bg-red-700 text-white",

        ghost:
          "text-slate-300 hover:text-white hover:bg-white/5",
      },

      size: {
        sm: "px-4 py-2 text-sm",

        md: "px-6 py-3 text-base",

        lg: "px-8 py-4 text-lg",

        icon: "w-12 h-12",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);