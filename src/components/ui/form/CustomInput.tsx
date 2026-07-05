"use client";

import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function CustomInput({ label, className = "", ...props }: CustomInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[8px] tracking-[2px] uppercase text-gold font-bold">{label}</label>}
      <input
        className="bg-transparent border-none p-0 text-white text-xs font-light outline-none cursor-pointer placeholder:text-white/20 w-full"
        {...props}
      />
    </div>
  );
}
