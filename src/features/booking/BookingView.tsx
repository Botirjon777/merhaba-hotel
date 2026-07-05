"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useBookingStore } from "@/store/useBookingStore";
import { useLocale } from "next-intl";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import BeBookingForm from "@/components/be-forms/BeBookingForm";

export default function BookingView() {
  const t = useTranslations("Booking");
  const { checkIn, checkOut, adults, childrenAges } = useBookingStore();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [iframeUrl, setIframeUrl] = useState("");

  const selectedRoomId = searchParams.get("room-type");

  useEffect(() => {
    let nights = 1;
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end.getTime() - start.getTime();
      if (diffTime > 0) {
        nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      }
    }

    const queryParams = new URLSearchParams({
      accommodationMode: "auto",
      adults: adults.toString(),
      language: locale === 'en' ? 'en' : locale === 'uz' ? 'uz' : 'ru',
      providerId: "506781",
      theme: "express-orange"
    });

    if (selectedRoomId) {
      queryParams.append("roomType", selectedRoomId);
    }

    if (childrenAges && childrenAges.length > 0) {
      queryParams.append("childrenAge", childrenAges.join(";"));
    }

    if (checkIn) {
      queryParams.append("date", checkIn);
      queryParams.append("nights", nights.toString());
    }

    setIframeUrl(`https://uz-ibe.hopenapi.com/booking2/hotel/index.html?${queryParams.toString()}`);
  }, [checkIn, checkOut, adults, childrenAges, locale, selectedRoomId]);

  return (
    <main className="min-h-screen bg-[#1a1108] flex flex-col">
      <Navbar />
      <MobileSidebar />

      <section className="pt-[80px] flex-1 flex flex-col">
        <div className="w-full flex-1 flex flex-col">
          <div className="bg-white overflow-hidden flex-1 min-h-[70vh] flex flex-col">
            {/*{iframeUrl ? (*/}
            {/*  <iframe */}
            {/*    src={iframeUrl}*/}
            {/*    className="w-full h-full flex-1 border-none"*/}
            {/*    title="Booking Engine"*/}
            {/*    allow="payment"*/}
            {/*  />*/}
            {/*) : (*/}
            {/*  <div className="flex-1 flex justify-center items-center">*/}
            {/*    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>*/}
            {/*  </div>*/}
            {/*)}*/}
            <h2 className="font-cormorant text-2xl md:text-4xl text-text-dark text-center mt-5 mb-5">{t("bookYourStay")}</h2>
            <BeBookingForm />
          </div>
        </div>
      </section>

      <Footer/>

    </main>
  );
}
