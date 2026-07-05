"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  type?: "center" | "full" | "dropdown";
  coords?: { top: number; left: number; width?: number };
  /** When true the dropdown uses position:fixed (for pickers inside fixed bars).
   *  When false (default) it uses position:absolute (scrolls with the page). */
  dropdownFixed?: boolean;
  id?: string;
}

export function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  type = "center",
  coords,
  dropdownFixed = false,
  id,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
      if (type !== "dropdown" || isMobile) {
        document.body.classList.add("no-scroll");
      }
    } else if (shouldRender) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
        document.body.classList.remove("no-scroll");
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender, type, isMobile]);

  if (!mounted || !shouldRender) return null;

  const isDesktopDropdown = type === "dropdown" && !isMobile;

  let animationClass = "";
  if (type === "full" && isMobile) {
    animationClass = isAnimatingOut ? "animate-slide-up-out" : "animate-slide-up-in";
  } else {
    animationClass = isAnimatingOut ? "animate-modal-out" : "animate-modal-in";
  }

  if (isDesktopDropdown) {
    /**
     * Two modes for the dropdown panel:
     *
     * dropdownFixed=false (default — normal scrollable page):
     *   position:absolute on <body> with document-relative coords
     *   (rect.bottom + scrollY).  Panel scrolls with the page — stays under the trigger.
     *
     * dropdownFixed=true (trigger lives inside a position:fixed bar):
     *   position:fixed with viewport-relative coords (rect.bottom, no scrollY).
     *   Panel stays glued to the trigger even as the page scrolls.
     */
    const panelPositionClass = dropdownFixed ? "fixed" : "absolute";

    return createPortal(
      <>
        {/* Invisible overlay to capture outside clicks */}
        <div className="fixed inset-0 z-[9990]" onClick={onClose} />
        <div
          id={id}
          className={`${panelPositionClass} z-[9991] ${animationClass} ${className}`}
          style={
            coords
              ? { top: coords.top + 8, left: coords.left }
              : {}
          }
        >
          {children}
        </div>
      </>,
      document.body,
    );
  }

  // Mobile dropdown or center/full types: full-screen overlay with backdrop
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      id={id}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto ${
          isAnimatingOut ? "opacity-0" : "opacity-100"
        }`}
        onClick={onClose}
      />
      <div
        className={`relative z-10 pointer-events-auto ${animationClass} ${className} ${
          type === "dropdown" ? "w-full h-full md:h-auto md:w-auto" : "w-full h-full"
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
