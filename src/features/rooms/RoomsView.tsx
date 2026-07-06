"use client";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { roomCategories } from "@/lib/data";
import { FiWifi, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { LuBath, LuBed, LuWind } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

export default function RoomsView() {
  const t = useTranslations("RoomsPage");
  const tc = useTranslations("Common");
  const router = useRouter();

  // We only want rooms, not conference halls for this page
  const rooms = roomCategories.filter((cat) => cat.id !== "conference");

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-6 bg-[#1a1108] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent"></div>
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
      {/* Rooms List */}
      <section className="py-5 px-4 md:px-6 max-w-[1200px] mx-auto space-y-6">
        {rooms.map((room, index) => (
          <div
            key={room.id}
            className="flex flex-col md:flex-row bg-white border border-sand/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-[fadeUp_0.8s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
          >
            {/* Image Section */}
            {room.mainImage && (
              <div className="w-full md:w-[320px] shrink-0 aspect-video md:aspect-auto relative group overflow-hidden">
                <ResponsiveImage
                  src={room.mainImage}
                  alt={room.label}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
                {/* Amenity Icons Overlaid */}
                <div className="absolute top-0 left-0 flex flex-col gap-px">
                  <div
                    className="bg-[#166534] text-white p-2 text-xs flex items-center justify-center opacity-90"
                    title="Free Wi-Fi"
                  >
                    <FiWifi className="w-4 h-4" />
                  </div>
                  <div
                    className="bg-[#166534] text-white p-2 text-xs flex items-center justify-center opacity-90"
                    title="Air Conditioning"
                  >
                    <LuWind className="w-4 h-4" />
                  </div>
                  <div
                    className="bg-[#166534] text-white p-2 text-xs flex items-center justify-center opacity-90"
                    title="Premium Bed"
                  >
                    <LuBed className="w-4 h-4" />
                  </div>
                  <div
                    className="bg-[#166534] text-white p-2 text-xs flex items-center justify-center opacity-90"
                    title="Private Bath"
                  >
                    <LuBath className="w-4 h-4" />
                  </div>
                </div>

                {/* Bestseller Badge */}
                {room.bestseller && (
                  <div className="absolute top-0 right-0 bg-gold text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] opacity-95 shadow-sm">
                    {t("bestseller")}
                  </div>
                )}
              </div>
            )}

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative">
              {/* Bestseller Badge for rooms without images */}
              {!room.mainImage && room.bestseller && (
                <div className="absolute top-0 right-0 bg-gold text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] opacity-95 shadow-sm">
                  {t("bestseller")}
                </div>
              )}
              <div>
                <div className="mb-2">
                  <h2 className="font-jost text-xl md:text-2xl font-medium text-text-dark tracking-tight">
                    {t(`details.${room.id}.title`)}
                  </h2>
                </div>

                <p className="text-text-mid font-jost text-sm leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
                  {t(`details.${room.id}.description`)}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-sand/10">
                <div className="flex flex-col gap-1 text-[10px] text-gold tracking-[1.5px] uppercase font-medium">
                  <span>{t(`details.${room.id}.capacity`)}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/booking")}
                >
                  {t("showMore")}
                  <FiArrowRight className="ml-2 w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}
