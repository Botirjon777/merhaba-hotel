"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { FiMapPin, FiPhone, FiMail, FiClock, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";
import { HotelMap } from "@/components/ui/HotelMap";

export default function ContactsView() {
  const t = useTranslations("Location");
  const tc = useTranslations("Common");

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-10 px-6 bg-[#1a1108] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-gold text-[10px] uppercase tracking-[3px] font-bold mb-8 transition-all group"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{tc("backToHome")}</span>
          </Link>
          <div className="text-center">
            <h1 className="font-cormorant text-5xl md:text-8xl font-light text-gold mb-6 animate-[fadeUp_0.8s_ease-out]">
              {t("heartOfEverything")}
            </h1>
            <p className="font-jost text-sand/70 tracking-[2px] uppercase text-xs md:text-sm max-w-2xl mx-auto">
              {t("findUs")}
            </p>
          </div>
        </div>
      </section>

      <BeSearchForm />

      {/* Contact Details + Map */}
      <section className="px-5 py-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* Left: info cards */}
          <div className="flex flex-col gap-6">
            <p className="text-sm text-text-mid font-light leading-relaxed mb-2">
              {t("subtext")}
            </p>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <strong className="block text-[14px] tracking-[1px] text-text-dark mb-1 font-normal">
                  {t("address")}
                </strong>
                <span className="text-sm text-text-mid font-light leading-relaxed">
                  {t("addressText")}
                </span>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                <FiPhone className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <strong className="block text-[14px] tracking-[1px] text-text-dark mb-1 font-normal">
                  {t("reservations")}
                </strong>
                <a
                  href={`tel:${t("phone").replace(/\s/g, "")}`}
                  className="text-sm text-text-mid font-light leading-relaxed hover:text-gold transition-colors"
                >
                  {t("phone")}
                </a>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                <FiMail className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <strong className="block text-[14px] tracking-[1px] text-text-dark mb-1 font-normal">
                  {t("email")}
                </strong>
                <a
                  href={`mailto:${t("emailAddress")}`}
                  className="text-sm text-text-mid font-light leading-relaxed hover:text-gold transition-colors"
                >
                  {t("emailAddress")}
                </a>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="pt-1">
                <strong className="block text-[14px] tracking-[1px] text-text-dark mb-1 font-normal">
                  {t("checkInOut")}
                </strong>
                <span className="text-sm text-text-mid font-light leading-relaxed">
                  {t("checkInOutValue")}
                </span>
              </div>
            </div>
          </div>

          {/* Right: map */}
          <div className="flex flex-col gap-3">
            <div className="w-full aspect-4/3 bg-[#e8e0d0] relative z-0 overflow-hidden shadow-[0_8px_40px_rgba(42,29,13,0.12)]">
              <HotelMap />
            </div>
            <div className="flex gap-3">
              <a
                href="https://share.google/IrFOewtaig9bT0dPT"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-sand text-text-mid text-xs tracking-wide hover:border-gold hover:text-gold transition-colors"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                Google Maps
              </a>
              <a
                href="https://yandex.uz/maps/-/CTu8V6lg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white border border-sand text-text-mid text-xs tracking-wide hover:border-gold hover:text-gold transition-colors"
              >
                <FiExternalLink className="w-3.5 h-3.5" />
                Yandex Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
