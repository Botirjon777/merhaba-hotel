"use client";

import { useEffect, useState } from "react";
import { usePopup } from "@/lib/PopupContext";
import { useTranslations } from "next-intl";
import { GuestPicker } from "./form/GuestPicker";
import { CustomDatePicker } from "./form/CustomDatePicker";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";

export function StickyBookingBar() {
  const [show, setShow] = useState(false);
  const { openPopup, activePopup, isSidebarOpen } = usePopup();
  const t = useTranslations("Booking");
  const router = useRouter();

  const {
    checkIn,
    checkOut,
    adults,
    childrenAges,
    setCheckIn,
    setCheckOut,
    setAdults,
    setChildrenAges,
  } = useBookingStore();

  useEffect(() => {
    const handleScroll = () => {
      if (activePopup || isSidebarOpen) return;
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activePopup, isSidebarOpen]);

  return (
    <div
      className={`fixed top-[64px] md:top-[80px] left-0 right-0 z-900 transition-all duration-500 transform ${
        show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="bg-[#1a1108]/95 backdrop-blur-md border-b border-gold/20 px-5 py-2.5 md:px-2.5 md:py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Desktop: inline date + guest pickers with dropdowns */}
        <div className="hidden lg:flex items-center gap-5 flex-1">
          <CustomDatePicker
            label={`${t("checkIn")} — ${t("checkOut")}`}
            checkIn={checkIn}
            checkOut={checkOut}
            onChange={(inDate, outDate) => {
              setCheckIn(inDate);
              setCheckOut(outDate);
            }}
            className="flex-[1.5] min-w-[280px]"
            dropdownFixed={true}
          />
          <div className="w-px h-6 bg-gold/20"></div>
          <GuestPicker
            label={t("guests")}
            adults={adults}
            childrenAges={childrenAges}
            onChange={(a, c) => {
              setAdults(a);
              setChildrenAges(c);
            }}
            className="flex-1"
            dropdownFixed={true}
          />
        </div>

        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
          {/* Mobile: show hotel name, tapping Check Availability opens the full modal */}
          <div className="lg:hidden flex flex-col">
            <span className="text-sm uppercase text-gold font-bold">
              Merhaba Hotel
            </span>
            <span className="text-white text-[10px] font-light">
              {t("luxurySubtitle")}
            </span>
          </div>

          {/* Mobile: open availability modal / Desktop: go to booking page */}
          <button
            className="bg-brand hover:bg-brand-dark text-text-dark border-none py-1.5 px-2.5 md:py-2.5 md:px-5 font-jost text-[10px] md:text-xs tracking-[2px] cursor-pointer transition-all duration-300 shadow-lg shadow-brand/20 font-medium active:scale-95"
            onClick={() => {
              if (window.innerWidth >= 1024) {
                router.push("/booking");
              } else {
                openPopup("availability-popup");
              }
            }}
          >
            {t("checkAvailability")}
          </button>
        </div>
      </div>
    </div>
  );
}
