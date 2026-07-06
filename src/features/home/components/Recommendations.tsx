"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useTranslations } from "next-intl";
import { usePopup } from "@/lib/PopupContext";
import { FiArrowRight } from "react-icons/fi";
import { roomCategories } from "@/lib/data";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/effect-fade";

export function Recommendations() {
  const t = useTranslations("Recommendations");
  const tr = useTranslations("RoomsPage");
  const { openPopup, setGalleryImages } = usePopup();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const handleOpenGallery = (images: string[]) => {
    setGalleryImages(images);
    openPopup("gallery-popup");
  };

  // Select 3 bestsellers or specific rooms
  const selectedRooms = roomCategories.filter((cat) =>
    ["lux", "delux-king", "classic-king"].includes(cat.id),
  );

  return (
    <section id="rooms" aria-label="Rooms" className="py-5 md:py-10 px-5 bg-cream">
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          label={t("subtitle")}
          title={t("title")}
          className="text-center md:text-left"
        />

        {/* Swiper — hidden overflow so partial slides are clipped */}
        <div className="overflow-hidden">
          <Swiper
            onSwiper={setSwiper}
            modules={[Autoplay, EffectFade, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={false}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {selectedRooms.map((room, index) => (
              <SwiperSlide key={room.id} className="!h-auto flex pb-2">
                <div
                  className="flex flex-col bg-white shadow-[0_20px_40px_rgba(26,17,8,0.05)] overflow-hidden group hover:shadow-[0_30px_60px_rgba(26,17,8,0.08)] transition-all duration-700 w-full h-full animate-[fadeUp_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.2}s`, opacity: 0 }}
                >
                  {/* Image Slider */}
                  <div
                    className="w-full aspect-3/2 relative cursor-pointer overflow-hidden shrink-0"
                    onClick={() => handleOpenGallery(room.images || [])}
                  >
                    <Swiper
                      modules={[Autoplay, EffectFade]}
                      effect="fade"
                      autoplay={{
                        delay: 3500 + index * 500,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      className="w-full h-full"
                    >
                      {(room.images || []).map((img, i) => (
                        <SwiperSlide key={i} className="h-full">
                          <ResponsiveImage
                            src={img}
                            alt={room.label}
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-cormorant text-xl md:text-2xl text-text-dark font-light group-hover:text-gold transition-colors duration-500 mb-3">
                        {tr(`details.${room.id}.title`)}
                      </h3>
                      <p className="text-text-mid text-[12px] font-light leading-relaxed mb-8 line-clamp-3">
                        {tr(`details.${room.id}.description`)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-sand/20">
                      <button
                        onClick={() => openPopup("booking-popup")}
                        className="flex items-center gap-2 group/btn text-[9px] tracking-[2px] uppercase font-bold text-text-dark hover:text-gold transition-all duration-300"
                      >
                        {tr("bookNow")}
                        <FiArrowRight className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                      </button>
                      <span className="text-[8px] tracking-[2px] uppercase text-text-mid italic opacity-30">
                        {t("premium")}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Discover All Rooms slide */}
            <SwiperSlide className="!h-auto flex pb-2">
              <Link
                href="/rooms"
                className="flex flex-col bg-brand overflow-hidden group hover:bg-brand-dark transition-all duration-700 w-full h-full p-8 md:p-10 justify-center items-center text-center text-text-dark relative shadow-[0_20px_40px_rgba(227,206,111,0.2)] min-h-[350px] animate-[fadeUp_0.8s_ease-out_forwards]"
                style={{ animationDelay: `0.6s`, opacity: 0 }}
              >
                <div className="absolute inset-0 opacity-10 bg-[url('/images/hotel/general/general-1.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative z-10">
                  <span className="font-jost text-[10px] tracking-[4px] uppercase block mb-4 opacity-80">
                    {t("subtitle")}
                  </span>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-light mb-8">
                    {t("discoverAll")} <br /> <span className="italic">{t("roomTypes")}</span>
                  </h3>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mx-auto group-hover:border-white transition-colors duration-300">
                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <span className="font-jost text-[9px] tracking-[2px] uppercase mt-6 block font-bold">
                    {t("viewRooms")}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Navigation buttons at the bottom */}
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
    </section>
  );
}
