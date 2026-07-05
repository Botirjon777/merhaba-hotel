"use client";

import { usePopup } from "@/lib/PopupContext";
import React from "react";

export function PopupWrapper({
  id,
  children,
  maxWidth = "560px",
  center = false,
}: {
  id: "booking-popup" | "confirm-popup" | "service-popup" | "welcome-popup";
  children: React.ReactNode;
  maxWidth?: string;
  center?: boolean;
}) {
  const { activePopup, closePopup } = usePopup();

  if (activePopup !== id) return null;

  return (
    <div className="fixed inset-0 bg-[#1a1108]/80 z-3000 flex items-center justify-center md:p-6 overflow-hidden">
      <div
        className="bg-cream w-full h-full md:h-auto relative animate-[popup-in_0.4s_cubic-bezier(.34,1.56,.64,1)] px-6 py-12 md:px-12 md:py-14 overflow-y-auto"
        style={{ textAlign: center ? "center" : "left", maxWidth }}
      >
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 bg-transparent border-none text-3xl md:text-2xl text-text-mid cursor-pointer transition-colors duration-300 hover:text-gold z-50"
          onClick={closePopup}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
