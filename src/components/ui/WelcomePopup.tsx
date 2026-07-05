"use client";

import { usePopup } from "@/lib/PopupContext";
import { useTranslations } from "next-intl";
import { useEffect, useState, useCallback } from "react";
import { Button } from "./Button";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "welcome-popup-shown-at";
const TTL_DAYS = 7;

function shouldShow(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const shownAt = parseInt(raw, 10);
    const age = Date.now() - shownAt;
    return age > TTL_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {}
}

export function WelcomePopup() {
  const { activePopup, openPopup, closePopup } = usePopup();
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const t = useTranslations("Welcome");

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      closePopup();
      setIsClosing(false);
    }, 250);
  }, [closePopup]);

  useEffect(() => {
    setMounted(true);
    if (!shouldShow()) return;

    const timer = setTimeout(() => {
      openPopup("welcome-popup");
      markShown();
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activePopup !== "welcome-popup") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activePopup, handleClose]);

  const isOpen = activePopup === "welcome-popup";
  if (!mounted || !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center ${isClosing ? "animate-modal-out" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-[#1a1108] overflow-hidden w-full h-full md:h-auto md:max-w-[520px] md:mx-4 md:rounded-sm ${isClosing ? "animate-modal-out" : "animate-modal-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#1a1108] via-[#241608] to-[#1a1108]" />

        {/* Close Button */}
        <button
          className="absolute top-5 right-5 z-20 bg-white/20 hover:bg-white/35 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors cursor-pointer"
          onClick={handleClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-[500px] mx-auto">
            <div className="welcome-top-star px-5 py-10 md:px-10 md:py-8 text-center">
              <h2 className="text-4xl md:text-5xl font-light text-white mb-2 drop-shadow-lg font-cormorant">
                {t("title")}
              </h2>
              <p className="text-sm text-white/75 font-light tracking-[1px]">
                {t("subtitle")}
              </p>
            </div>
            <div className="px-5 pb-10 md:px-10 md:pb-10">
              {/* Offer banner */}
              <div className="mb-4 py-2 px-3 border border-gold/40 bg-gold/10 text-center">
                <p className="text-gold text-[11px] tracking-[0.5px] uppercase font-medium">
                  {t("offer")}
                </p>
              </div>
              <p className="text-cream/90 text-[15px] leading-[1.8] font-light text-center mb-3 drop-shadow-md">
                {t.rich("description", {
                  b: (chunks) => <span className="text-gold font-medium">{chunks}</span>,
                })}
              </p>
              <p className="text-cream/55 text-[11px] leading-snug font-light text-center mb-6">
                {t("disclaimer")}
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 hover:bg-white/10"
                  onClick={() => { handleClose(); router.push("/gallery"); }}
                >
                  {t("explore")}
                </Button>
                <Button
                  variant="gold"
                  className="flex-1"
                  onClick={() => { handleClose(); router.push("/booking"); }}
                >
                  {t("book")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
