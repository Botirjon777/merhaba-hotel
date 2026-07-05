"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { Swiper as SwiperType } from "swiper";

interface SwiperNavButtonsProps {
  swiper: SwiperType | null;
  className?: string;
  variant?: "light" | "dark" | "glass";
}

export function SwiperNavButtons({ swiper, className = "", variant = "light" }: SwiperNavButtonsProps) {
  const baseStyles = "w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-20 shadow-lg border";
  
  const variants = {
    light: "bg-cream text-gold border-gold/10 hover:bg-gold hover:text-white",
    dark: "bg-text-dark text-white border-white/10 hover:bg-gold hover:border-gold",
    glass: "bg-cream/10 backdrop-blur-md text-white border-white/20 hover:bg-gold hover:border-gold",
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      <button 
        onClick={() => swiper?.slidePrev()}
        className={`${baseStyles} ${variants[variant]}`}
        aria-label="Previous slide"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={() => swiper?.slideNext()}
        className={`${baseStyles} ${variants[variant]}`}
        aria-label="Next slide"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
