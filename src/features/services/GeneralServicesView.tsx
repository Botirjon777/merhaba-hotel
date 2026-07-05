"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  FiTv,
  FiSun,
  FiLock,
  FiWind,
  FiCoffee,
  FiWifi,
  FiMap,
  FiShield,
  FiPhone,
  FiHome,
  FiCloud,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

export default function GeneralServicesView() {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const t = useTranslations("GeneralServices");
  const tc = useTranslations("Common");

  const mainServices = [
    {
      title: t("gastrobarTitle"),
      desc: t("gastrobarDesc"),
      image: "/images/hotel/general/restaurant.webp",
      link: "/services/gastrobar",
    },
    {
      title: t("spaTitle"),
      desc: t("spaDesc"),
      image: "/images/hotel/general/pool.webp",
      link: "/services/spa",
    },
    {
      title: t("meetingsTitle"),
      desc: t("meetingsDesc"),
      image: "/images/hotel/conference-rooms/22-person/1.webp",
      link: "/services/meetings",
    },
    {
      title: t("laundryTitle"),
      desc: t("laundryDesc"),
      image: "/images/hotel/general/reception-3.webp",
    },
    {
      title: t("billiardTitle"),
      desc: t("billiardDesc"),
      image: "/images/hotel/general/billiard.webp",
    },
    { title: t("wifiTitle"), desc: t("wifiDesc"), icon: <FiWifi /> },
    { title: t("parkingTitle"), desc: t("parkingDesc"), icon: <FiMap /> },
  ];

  const amenities = [
    { icon: <FiTv />, label: t("amenities.tv") },
    { icon: <FiSun />, label: t("amenities.lamp") },
    { icon: <FiLock />, label: t("amenities.lock") },
    { icon: <FiWind />, label: t("amenities.ac") },
    { icon: <FiWifi />, label: t("amenities.wifi") },
    { icon: <FiCoffee />, label: t("amenities.kettle") },
    { icon: <FiShield />, label: t("amenities.safe") },
    { icon: <FiPhone />, label: t("amenities.phone") },
    { icon: <FiHome />, label: t("amenities.smartHome") },
    { icon: <FiCloud />, label: t("amenities.climate") },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-6 bg-[#1a1a1a] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-[10px] uppercase tracking-[3px] font-bold mb-8 transition-all group"
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
      {/* Services with Room Stay */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto">
        <h2 className="font-cormorant text-4xl md:text-5xl text-text-dark mb-5 text-center">
          {t("roomStayTitle")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 md:gap-5">
          {mainServices.map((service, i) => {
            const content = (
              <>
                {service.image ? (
                  <div className="relative w-24 h-24 md:w-40 md:h-40 overflow-hidden shrink-0 rounded-sm">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 768px) 160px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center bg-sand/30 text-gold text-3xl md:text-5xl shrink-0 rounded-sm group-hover:bg-sand/50 transition-colors">
                    {service.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-cormorant text-xl md:text-2xl text-text-dark mb-1 md:mb-3">
                    {service.title}
                  </h3>
                  <p className="font-jost text-[11px] md:text-sm text-text-mid leading-relaxed line-clamp-3">
                    {service.desc}
                  </p>
                  {service.link && (
                    <span className="inline-flex items-center gap-1.5 mt-3 text-[10px] tracking-[2px] uppercase text-gold font-medium group-hover:gap-2.5 transition-all duration-300">
                      {t("learnMore")}
                      <FiArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </>
            );

            const className =
              "flex flex-row gap-4 md:gap-8 items-center bg-white p-3 md:p-6 border border-sand shadow-sm hover:shadow-md hover:border-gold/30 transition-all group cursor-pointer";

            return service.link ? (
              <Link href={service.link} key={i} className={className}>
                {content}
              </Link>
            ) : (
              <div key={i} className={className.replace("cursor-pointer", "")}>
                {content}
              </div>
            );
          })}
        </div>
      </section>

      {/* Amenities Grid */}
      <section className="py-5 px-5 bg-[#1a1108]/90 text-cream">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl text-gold mb-5 md:mb-10 text-center">
            {t("amenitiesTitle")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-12 gap-x-8">
            {amenities.slice(0, 4).map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-3xl text-gold/50 mb-4 transition-transform group-hover:scale-110 group-hover:text-gold">
                  {item.icon}
                </div>
                <span className="text-[11px] tracking-[2px] uppercase font-jost text-sand/60 group-hover:text-sand transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div
            className={`grid transition-all duration-500 ease-in-out overflow-hidden ${showAllAmenities ? "grid-rows-[1fr] opacity-100 mt-12" : "grid-rows-[0fr] opacity-0 mt-0"}`}
          >
            <div className="min-h-0">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-12 gap-x-8">
                {amenities.slice(4).map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="text-3xl text-gold/50 mb-4 transition-transform group-hover:scale-110 group-hover:text-gold">
                      {item.icon}
                    </div>
                    <span className="text-[11px] tracking-[2px] uppercase font-jost text-sand/60 group-hover:text-sand transition-colors">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {amenities.length > 4 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="text-gold/60 hover:text-gold text-[10px] uppercase tracking-[3px] font-bold transition-all flex items-center gap-3 group"
              >
                <span className="border-b border-gold/30 group-hover:border-gold pb-0.5">
                  {showAllAmenities ? t("showLess") : t("showMore")}
                </span>
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-500 ${showAllAmenities ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
