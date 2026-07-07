"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import {
  MdOutlineBreakfastDining,
  MdOutlineRestaurant,
  MdEvStation,
} from "react-icons/md";
import { FiWifi, FiTruck, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "@/i18n/navigation";

const images = [
  {
    src: "/images/hotel/general/general-1.jpg",
    alt: "Merhaba Hotel Day View",
    id: "hotel-day",
  },
  {
    src: "/images/hotel/general/general-2.jpg",
    alt: "Merhaba Hotel Night View",
    id: "hotel-night",
  },
  {
    src: "/images/hotel/general/general-3.jpg",
    alt: "Hotel Reception",
    id: "reception",
  },
  {
    src: "/images/hotel/general/general-4.jpg",
    alt: "Hotel Restaurant",
    id: "restaurant",
  },
  {
    src: "/images/hotel/general/general-5.jpg",
    alt: "Merhaba Hotel Cozy Room",
    id: "pool",
  },
  {
    src: "/images/hotel/general/general-6.jpg",
    alt: "Hotel Breakfast Buffet",
    id: "breakfast",
  },
  {
    src: "/images/hotel/general/general-7.jpg",
    alt: "Merhaba Hotel Guest Service",
    id: "billiard",
  },
];

const amenitiesList = [
  {
    icon: <MdOutlineBreakfastDining className="w-5 h-5" />,
    key: "breakfast",
  },
  { icon: <FiWifi className="w-5 h-5" />, key: "wifi" },
  { icon: <MdEvStation className="w-5 h-5" />, key: "ev" },
  { icon: <MdOutlineRestaurant className="w-5 h-5" />, key: "restaurant" },
  { icon: <FiTruck className="w-5 h-5" />, key: "shuttle" },
];

function BannerImage({ img, priority }: { img: { src: string; alt: string; id: string }; priority: boolean }) {
  const [loading, setLoading] = useState(true);

  return (
    // banner-img class is the zoom animation target (see globals.css .banner-swiper .swiper-slide-active .banner-img)
    <div className="banner-img relative w-full h-full bg-[#1a1108]">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="w-10 h-10 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
        </div>
      )}
      <ResponsiveImage
        src={img.src}
        alt={img.alt}
        fill
        className={`object-cover transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        priority={priority}
        quality={75}
        sizes="(max-width: 768px) 100vw, 100vw"
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}

export function ImageBanner() {
  const t = useTranslations("ImageBanner");
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <section id="amenities" aria-label="Amenities" className="bg-cream">
      <div className="max-w-[1200px] mx-auto py-5 px-5 md:px-5 md:py-10">
        <SectionHeader
          label={t("featuredAmenities")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-10 gap-x-6 md:gap-x-10 mb-10">
          {amenitiesList.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-text-dark">
              <div className="text-gold shrink-0">{item.icon}</div>
              <span className="text-[13px] font-medium tracking-[0.5px]">
                {t(`amenities.${item.key}` as Parameters<typeof t>[0])}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gold/30 text-gold text-sm tracking-[4px] font-bold hover:bg-gold hover:text-white transition-all duration-500"
          >
            {t("allAmenities")}
          </Link>
        </div>
      </div>

      <div className="relative group overflow-hidden h-[450px] md:h-[700px]">
        <Swiper
          onSwiper={setSwiper}
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full banner-swiper"
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="h-full">
              {/* overflow-hidden clips the zoomed image within the slide bounds */}
              <div className="relative w-full h-full overflow-hidden">
                <BannerImage img={img} priority={i === 0} />

                {/* Darkening Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 flex items-end md:items-center justify-start pointer-events-none px-6 md:px-20 pb-24 md:pb-0">
                  <div className="max-w-[1200px] w-full">
                    {/* Left Side Content Only */}
                    <div className="text-cream/70 max-w-[600px] animate-[fadeUp_1s_ease-out] drop-shadow-lg">
                      <span className="font-jost text-md md:text-lg tracking-[5px] uppercase block mb-4 md:mb-6 font-semibold">
                        {t(`slides.${img.id}.subtitle`)}
                      </span>
                      <h2 className="font-cormorant text-[clamp(38px,5vw,70px)] leading-[0.85] font-light">
                        {t(`slides.${img.id}.title`)
                          .split(" ")
                          .map((word, idx) => (
                            <span
                              key={idx}
                              className="block last:italic last:text-cream"
                            >
                              {word}
                            </span>
                          ))}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-4 py-6">
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
    </section>
  );
}
