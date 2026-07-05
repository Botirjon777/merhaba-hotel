"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { roomCategories } from "@/lib/data";
import { usePopup } from "@/lib/PopupContext";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/components/ui/SectionHeader";

import { Link } from "@/i18n/navigation";
import "swiper/css";

export function Gallery() {
  const { openPopup, setGalleryImages } = usePopup();
  const t = useTranslations("Gallery");
  const tr = useTranslations("RoomsPage");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleOpenGallery = (images: string[]) => {
    setGalleryImages(images);
    openPopup("gallery-popup");
  };

  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="px-5 py-5 md:py-10 bg-sand overflow-hidden relative"
    >
      <div className="max-w-[1160px] mx-auto mb-12">
        <SectionHeader
          label={t("visualJourney")}
          title={t("throughOur")}
          subtitle={t("spaces")}
          description={t("description")}
        />
      </div>

      <div className="max-w-[1160px] mx-auto px-4 md:px-0 mb-12">
        <Swiper
          onSwiper={setSwiper}
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="gallery-categories-swiper"
        >
          {roomCategories.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open ${item.label} gallery`}
                className="group relative aspect-4/5 cursor-pointer overflow-hidden bg-text-dark"
                onClick={() => handleOpenGallery(item.images || [])}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpenGallery(item.images || []); }}
              >
                {item.mainImage && (
                  <ResponsiveImage
                    src={item.mainImage}
                    alt={item.label}
                    fill
                    className="object-cover transition-all duration-1000 md:group-hover:scale-110 md:group-hover:opacity-40"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}

                {/* Hover Overlay Color - Desktop Only */}
                <div className="absolute inset-0 bg-gold/60 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Mobile Gradient Overlay - Darker and taller for readability */}
                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent md:hidden"></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end text-white z-10 drop-shadow-md">
                  <div className="overflow-hidden mb-1 md:mb-2">
                    <span className="text-[10px] tracking-[5px] uppercase text-gold md:group-hover:text-white transition-colors duration-500 block md:transform md:translate-y-full md:group-hover:translate-y-0">
                      {t("roomType")}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-cormorant text-2xl md:text-3xl tracking-[1px] md:transform md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 md:delay-100">
                      {item.id === "conference" ? t("conferenceLabel") : tr(`details.${item.id}.title` as Parameters<typeof tr>[0])}
                    </h3>
                  </div>

                  <div className="mt-4 md:mt-6 flex items-center gap-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 md:translate-y-4 md:group-hover:translate-y-0 md:delay-200">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center">
                      <FiPlus className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <span className="text-[9px] md:text-[10px] tracking-[2px] uppercase font-medium">
                      {t("exploreGallery")}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-5">
          <button
            onClick={() => swiper?.slidePrev()}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gold/60 bg-white text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 active:scale-95"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-gold/60 bg-white text-gold hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 active:scale-95"
            aria-label="Next slide"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href="/gallery"
          className="inline-flex items-center justify-center px-5 py-2.5 border border-gold/30 text-gold text-sm tracking-[4px] font-bold hover:bg-gold hover:text-white transition-all duration-500"
        >
          {t("viewFullGallery")}
        </Link>
      </div>
    </section>
  );
}
