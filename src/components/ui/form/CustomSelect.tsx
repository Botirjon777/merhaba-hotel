"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  theme?: "light" | "dark";
}

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  className = "",
  theme = "dark",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative flex flex-col gap-1 ${className}`}
      ref={containerRef}
    >
      {label && (
        <label className="text-[8px] tracking-[2px] uppercase text-gold font-bold">
          {label}
        </label>
      )}
      <div
        className={`flex items-center justify-between cursor-pointer group px-4 h-[58px] border transition-all duration-300 ${
          theme === "light"
            ? "bg-white border-gold/30 hover:border-gold focus:bg-white text-text-dark rounded-[4px]"
            : "border-transparent"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-xs font-light tracking-[0.5px] truncate ${theme === "light" ? "text-text-dark font-jost" : "text-white"}`}>
          {selectedOption ? selectedOption.label : "Select..."}
        </span>
        <FiChevronDown
          className={`text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[1500] md:absolute md:top-full md:inset-auto md:left-0 md:right-0 md:mt-2 md:border md:shadow-2xl animate-[fadeIn_0.2s_ease-out]">
          {/* Mobile Overlay Background (clickable to close) */}
          <div 
            className="md:hidden absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Menu Container */}
          <div className={`absolute bottom-0 left-0 right-0 w-full md:relative md:bottom-auto rounded-t-2xl md:rounded-none max-h-[60vh] md:max-h-[200px] overflow-y-auto custom-scrollbar flex flex-col ${
             theme === "light" ? "bg-white text-gray-800 md:border-gold/30" : "bg-[#1a1108] text-white md:border-gold/20"
          }`}>
             {/* Mobile Header */}
             <div className="md:hidden px-6 py-4 border-b border-gold/20 flex justify-between items-center sticky top-0 bg-inherit z-10">
                <span className="font-bold text-sm tracking-widest uppercase">{label || "Select Option"}</span>
                <button onClick={() => setIsOpen(false)} className="text-2xl leading-none">&times;</button>
             </div>

             {/* Options List */}
             <div className="py-2 md:py-0">
               {options.map((option) => (
                 <div
                   key={option.value}
                   className={`px-6 md:px-4 py-4 md:py-3 text-sm md:text-xs font-light cursor-pointer transition-colors duration-200 hover:bg-gold/10 hover:text-gold ${
                     value === option.value
                       ? "text-gold bg-gold/5"
                       : theme === "light" ? "text-gray-800" : "text-white/70"
                   }`}
                   onClick={() => {
                     onChange(option.value);
                     setIsOpen(false);
                   }}
                 >
                   {option.label}
                 </div>
               ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
