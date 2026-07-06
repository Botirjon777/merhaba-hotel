"use client";

import { useTranslations } from "next-intl";
import { CustomDatePicker } from "@/components/ui/form/CustomDatePicker";
import { GuestPicker } from "@/components/ui/form/GuestPicker";
import { useBookingStore } from "@/store/useBookingStore";
import { useRouter } from "next/navigation";

export function BookingBar() {
  const t = useTranslations("Booking");
  const router = useRouter();

  const { checkIn, checkOut, adults, childrenAges, setCheckIn, setCheckOut, setAdults, setChildrenAges } = useBookingStore();

  return (
    <div id="booking-bar" className="max-w-[1200px] mx-auto px-5 relative z-20 -mt-24 md:-mt-40 group">
      <div className="bg-white shadow-[0_20px_50px_rgba(26,17,8,0.3)] md:shadow-[0_40px_80px_rgba(26,17,8,0.4)] px-6 py-8 md:p-10 flex gap-6 items-end flex-col lg:flex-row transition-transform duration-500 hover:-translate-y-1">
        <CustomDatePicker
          label={`${t("checkIn")} — ${t("checkOut")}`}
          checkIn={checkIn}
          checkOut={checkOut}
          onChange={(inDate, outDate) => { setCheckIn(inDate); setCheckOut(outDate); }}
          className="flex-[1.5] w-full min-w-[280px]"
          theme="light"
        />
        <GuestPicker
          adults={adults}
          childrenAges={childrenAges}
          onChange={(a, c) => { setAdults(a); setChildrenAges(c); }}
          className="flex-1 w-full"
          theme="light"
        />
        <button
          className="bg-brand hover:bg-brand-dark transition-all duration-300 text-text-dark border-none px-10 font-jost text-[11px] tracking-[4px] uppercase cursor-pointer whitespace-nowrap self-end w-full lg:w-auto shadow-xl shadow-brand/20 font-bold active:scale-95 h-[58px] flex items-center justify-center"
          onClick={() => router.push("/booking")}
        >
          {t("checkAvailability")}
        </button>
      </div>
    </div>
  );
}
