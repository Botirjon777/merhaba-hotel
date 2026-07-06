"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import {
  FiClock,
  FiInfo,
  FiFileText,
  FiCheckCircle,
  FiMapPin,
  FiArrowLeft,
  FiExternalLink,
} from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";
import { HotelMap } from "@/components/ui/HotelMap";

export default function AboutView() {
  const t = useTranslations("AboutPage");
  const tc = useTranslations("Common");

  return (
    <main className="min-h-screen bg-cream text-text-dark">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-20 md:pt-25 pb-20 px-5 bg-[#1a1108] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a1108] via-[#2d1f0a] to-[#3d2c12] opacity-50"></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cream/70 hover:text-gold text-[10px] uppercase tracking-[3px] font-bold mb-10 transition-all group"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{tc("backToHome")}</span>
          </Link>

          <div className="text-center">
            <h1 className="font-cormorant text-5xl md:text-7xl font-light text-gold animate-[fadeUp_0.8s_ease-out]">
              {t("title")}
            </h1>
          </div>
        </div>
      </section>

      {/* Welcome & Image Section */}
      <section className="pt-20 pb-5 px-5 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-10 items-center bg-white p-2.5 md:p-5 shadow-[0_20px_80px_rgba(0,0,0,0.05)] rounded-sm -mt-32 relative z-20 border border-sand/20">
          <div className="relative w-full overflow-hidden rounded-sm aspect-[4/3] lg:aspect-square max-h-[320px]">
            <ResponsiveImage
              src="/images/hotel/rooms/lux/2.jpg"
              alt="Merhaba Hotel Interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-5">
            <div className="w-12 h-px bg-gold"></div>
            <p className="font-jost text-lg md:text-xl font-light leading-relaxed text-text-mid italic">
              &ldquo;{t("welcome")}&rdquo;
            </p>
          </div>
        </div>
      </section>

      <BeSearchForm />

      {/* Terms & Conditions Section */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
        {/* Check-in / Check-out */}
        <div id="terms-of-stay" className="space-y-5 animate-[fadeUp_0.8s_0.2s_forwards] opacity-0">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-full text-gold">
              <FiClock size={24} />
            </div>
            <h2 className="font-cormorant text-2xl md:text-4xl text-text-dark">
              {t("termsTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 border-l-4 border-gold shadow-sm">
              <span className="block text-xs uppercase tracking-[2px] text-gold font-bold mb-2">
                {t("checkInTime")}
              </span>
              <span className="text-3xl font-cormorant">
                {t("checkInValue")}
              </span>
            </div>
            <div className="bg-white p-5 border-l-4 border-gold shadow-sm">
              <span className="block text-xs uppercase tracking-[2px] text-gold font-bold mb-2">
                {t("checkOutTime")}
              </span>
              <span className="text-3xl font-cormorant">
                {t("checkOutValue")}
              </span>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h3 className="text-gold font-jost font-bold uppercase tracking-[1px] text-sm mb-2.5 flex items-center gap-2">
                <FiInfo size={16} /> {t("earlyCheckIn")}
              </h3>
              <ul className="space-y-2 text-text-mid font-light text-sm">
                <li className="flex gap-3">
                  <span className="text-gold">•</span> {t("early1")}
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">•</span> {t("early2")}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gold font-jost font-bold uppercase tracking-[1px] text-sm mb-2.5 flex items-center gap-2">
                <FiInfo size={16} /> {t("lateCheckOut")}
              </h3>
              <ul className="space-y-2 text-text-mid font-light text-sm">
                <li className="flex gap-3">
                  <span className="text-gold">•</span> {t("late1")}
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">•</span> {t("late2")}
                </li>
              </ul>
            </div>

            <p className="text-xs text-text-mid/60 italic pt-5 border-t border-sand/30">
              {t("contactAdmin")}
            </p>
          </div>
        </div>

        {/* Cancellation & Policies */}
        <div id="cancellation-policy" className="space-y-5 animate-[fadeUp_0.8s_0.4s_forwards] opacity-0">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-full text-gold">
              <FiFileText size={24} />
            </div>
            <h2 className="font-cormorant text-2xl md:text-4xl text-text-dark">
              {t("policyTitle")}
            </h2>
          </div>

          <div className="bg-white p-2.5 md:p-5 shadow-sm border border-sand/20 space-y-5">
            <div>
              <h3 className="text-text-dark font-cormorant text-2xl mb-4">
                {t("cancellationTitle")}
              </h3>
              <p className="text-text-mid font-light leading-relaxed">
                {t("cancellationText")}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-sand/30">
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-gold mt-1 shrink-0" />
                <p className="text-sm text-text-mid font-light">
                  Professional service and support for all our guests.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FiCheckCircle className="text-gold mt-1 shrink-0" />
                <p className="text-sm text-text-mid font-light">
                  Transparent and clear policies for your peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-5 md:py-5 px-5 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-5 mb-5">
          <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-full text-gold">
            <FiMapPin size={24} />
          </div>
          <h2 className="font-cormorant text-3xl md:text-4xl text-text-dark">
            Our Location
          </h2>
        </div>

        <div className="w-full aspect-video md:aspect-21/9 bg-[#e8e0d0] relative z-0 overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-sand/20">
          <HotelMap />
        </div>
        <div className="flex gap-3 mt-3">
          <a
            href="https://maps.app.goo.gl/ZARm4dxEuKgBvWki8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sand text-text-mid text-xs tracking-wide hover:border-gold hover:text-gold transition-colors"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            Google Maps
          </a>
          <a
            href="https://yandex.uz/maps/-/CPdmnJjk"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-sand text-text-mid text-xs tracking-wide hover:border-gold hover:text-gold transition-colors"
          >
            <FiExternalLink className="w-3.5 h-3.5" />
            Yandex Maps
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
