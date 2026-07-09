"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { HotelMap } from "@/components/ui/HotelMap";
import { useTranslations } from "next-intl";
import { FiMapPin, FiPhone, FiMail, FiClock, FiExternalLink } from "react-icons/fi";

export function Location() {
  const t = useTranslations("Location");

  return (
    <section
      id="location"
      aria-label="Location & Contact"
      className="px-5 py-5 md:py-10 bg-sand relative overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-start">
        <div>
          <SectionHeader
            label={t("findUs")}
            title={t("heartOfEverything")}
            description={t("subtext")}
          />
          <div className="flex flex-col gap-6">
            <div className="flex gap-5 items-start">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110">
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
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110">
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
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110">
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
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110">
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
        </div>
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
  );
}
