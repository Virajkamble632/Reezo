import { cva } from "class-variance-authority";

export const cardVariants = cva(
  "rounded-3xl transition-all duration-300",
  {
    variants: {
      variant: {
        glass:
          "bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(37,99,235,.18)]",

        solid:
          "bg-[#111827] border border-slate-800 hover:border-blue-500/30",

        gradient:
          "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 hover:shadow-[0_15px_40px_rgba(124,58,237,.20)]",

        primary:
          "bg-gradient-to-br from-blue-600 to-violet-600 text-white",

        outline:
          "border border-white/10 bg-transparent hover:bg-white/5",
      },

      padding: {
        none: "",
        sm: "p-5",
        md: "p-7",
        lg: "p-10",
      },
    },

    defaultVariants: {
      variant: "glass",
      padding: "md",
    },
  }
);