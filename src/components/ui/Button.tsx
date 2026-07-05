"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "creamy" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * Reusable Button component for the Merhaba Hotel design system.
 * Supports Gold, Creamy, and Outlined variants with smooth transitions and disabled states.
 */
export function Button({
  variant = "gold",
  size = "md",
  fullWidth = false,
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  // Base structural and interaction styles
  const baseStyles =
    "inline-flex items-center justify-center font-jost font-bold uppercase tracking-[2px] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed active:scale-[0.98]";

  // Variant-specific appearance
  const variants = {
    gold: "bg-gold text-white border border-gold hover:bg-[#35608f] hover:border-[#35608f] hover:translate-y-[-2px] shadow-lg shadow-gold/20 disabled:bg-gold/40 disabled:border-gold/0 disabled:translate-y-0",
    creamy:
      "bg-cream text-text-dark border border-cream hover:bg-sand/30 hover:border-sand/30 disabled:opacity-50",
    outline:
      "bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-gold/5 disabled:border-gold/10 disabled:text-gold/30",
  };

  // Size-specific padding and typography
  const sizes = {
    sm: "py-2 px-6 text-[10px] tracking-[1.5px]",
    md: "py-3.5 px-10 text-xs tracking-[2px]",
    lg: "py-5 px-14 text-sm tracking-[3px]",
  };

  // Compose all classes
  const combinedClasses = [
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? "w-full flex" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing
        </span>
      ) : (
        children
      )}
    </button>
  );
}
