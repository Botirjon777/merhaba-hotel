"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

export default function GastrobarView() {
  const t = useTranslations("Gastrobar");
  const tc = useTranslations("Common");

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-5 bg-[#1a1108] text-white relative overflow-hidden">
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
              {t("title")}
            </h1>
            <p className="font-jost text-sand/70 tracking-[2px] uppercase text-xs md:text-sm max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>
      <BeSearchForm />
      {/* Content Section 1: Buffet Breakfast */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div className="relative aspect-4/3 overflow-hidden animate-[fadeUp_0.8s_ease-out_forwards]">
            <ResponsiveImage
              src="/images/hotel/general/general-6.jpg"
              alt={t("breakfastTitle")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="animate-[fadeUp_0.8s_ease-out_0.2s_forwards] opacity-0">
            <h2 className="font-cormorant text-4xl md:text-5xl text-text-dark mb-5">
              {t("breakfastTitle")}
            </h2>
            <p className="font-jost text-text-mid text-lg leading-relaxed mb-8">
              {t("breakfastDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section 2: Restaurant & Discount */}
      <section className="py-5 px-5 bg-sand/20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div className="order-2 lg:order-1 animate-[fadeUp_0.8s_ease-out_0.2s_forwards] opacity-0">
            <h2 className="font-cormorant text-4xl md:text-5xl text-text-dark mb-5">
              {t("discountTitle")}
            </h2>
            <p className="font-jost text-text-mid text-lg leading-relaxed mb-5">
              {t("discountDesc")}
            </p>
            <div className="p-5 bg-white border border-gold/20 shadow-sm">
              <span className="text-gold font-cormorant text-2xl italic block mb-2">
                {t("exquisite")}
              </span>
              <p className="text-sm text-text-mid italic">
                {t("exquisiteDesc")}
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative aspect-square overflow-hidden animate-[fadeUp_0.8s_ease-out_forwards]">
            <ResponsiveImage
              src="/images/hotel/general/general-4.jpg"
              alt="Restaurant"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="relative aspect-video overflow-hidden">
            <ResponsiveImage
              src="/images/hotel/general/general-8.jpg"
              alt="Gastrobar Interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="relative aspect-video overflow-hidden">
            <ResponsiveImage
              src="/images/hotel/general/general-2.jpg"
              alt="Bar Service"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
