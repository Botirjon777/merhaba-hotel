"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

import { FiArrowLeft } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

export default function MeetingsView() {
  const t = useTranslations("Meetings");
  const tc = useTranslations("Common");

  const rooms = [
    {
      name: t("rooms.executiveSuite"),
      capacity: "22",
      image: "/images/hotel/conference-rooms/22-person/1.webp",
    },
    {
      name: t("rooms.boardroom"),
      capacity: "32",
      image: "/images/hotel/conference-rooms/32-person/1.webp",
    },
    {
      name: t("rooms.grandHall"),
      capacity: "52",
      image: "/images/hotel/conference-rooms/52-person/1.webp",
    },
  ];

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-5 bg-[#111a08] text-white relative overflow-hidden">
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
      {/* Introduction */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto text-center">
        <h2 className="font-cormorant text-4xl md:text-5xl text-text-dark mb-5">
          {t("conferenceTitle")}
        </h2>
        <p className="font-jost text-text-mid text-lg leading-relaxed mb-5">
          {t("conferenceDesc")}
        </p>
      </section>

      {/* Conference Rooms Grid */}
      <section className="pb-5 px-5 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-4/5 overflow-hidden mb-5">
                <ResponsiveImage
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black to-transparent">
                  <span className="text-gold font-jost text-[10px] tracking-[2px] uppercase">
                    {t("rooms.capacityPersons", { capacity: room.capacity })}
                  </span>
                </div>
              </div>
              <h3 className="font-cormorant text-2xl text-text-dark group-hover:text-gold transition-colors">
                {room.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Services/Equipment */}
      <section className="py-5 px-5 bg-sand/20">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="text-center">
              <span className="text-gold font-cormorant text-3xl block mb-2">
                {t("services.pro")}
              </span>
              <p className="text-[10px] tracking-[2px] uppercase text-text-mid">
                {t("services.audioVisual")}
              </p>
            </div>
            <div className="text-center">
              <span className="text-gold font-cormorant text-3xl block mb-2">
                {t("services.wifi")}
              </span>
              <p className="text-[10px] tracking-[2px] uppercase text-text-mid">
                {t("services.highSpeed")}
              </p>
            </div>
            <div className="text-center">
              <span className="text-gold font-cormorant text-3xl block mb-2">
                {t("services.catering")}
              </span>
              <p className="text-[10px] tracking-[2px] uppercase text-text-mid">
                {t("services.customMenus")}
              </p>
            </div>
            <div className="text-center">
              <span className="text-gold font-cormorant text-3xl block mb-2">
                {t("services.support")}
              </span>
              <p className="text-[10px] tracking-[2px] uppercase text-text-mid">
                {t("services.eventManager")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
