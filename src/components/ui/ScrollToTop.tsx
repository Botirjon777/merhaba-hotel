"use client";

import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Custom smooth scroll function for slower speed
  const scrollToTop = () => {
    const start = window.pageYOffset;
    const duration = 1500; // Slower duration in ms
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeOutCubic(timeElapsed, start, -start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const easeOutCubic = (t: number, b: number, c: number, d: number) => {
      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`hidden lg:block fixed bottom-18 left-6 md:left-10 z-50 transition-all duration-500 scroll-to-top ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 md:w-14 md:h-14 bg-gold hover:bg-[#35608f] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group ring-4 ring-gold/10 hover:ring-gold/30"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
}
