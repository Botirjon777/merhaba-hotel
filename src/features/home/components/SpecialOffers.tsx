"use client";

import { useTranslations, useLocale } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";

interface OfferItem {
  id: string;
  image: string;
  badge: {
    en: string;
    ru: string;
    uz: string;
  };
  link: string;
  icon: React.ReactNode;
}

export function SpecialOffers() {
  const t = useTranslations("OffersPage");
  const locale = useLocale();
  const router = useRouter();

  const offers: OfferItem[] = [
    {
      id: "new-year",
      image: "/images/hotel/general/general-4.jpg",
      badge: {
        en: "Seasonal Rate",
        ru: "Сезонный тариф",
        uz: "Mavsumiy tarif",
      },
      link: "/booking/?special-offer=10127123",
      icon: <FiCalendar className="w-4 h-4" />,
    },
    {
      id: "long-term",
      image: "/images/hotel/general/general-5.jpg",
      badge: {
        en: "4+ Nights",
        ru: "От 4 ночей",
        uz: "4+ Kecha",
      },
      link: "/booking/?special-offer=10068278",
      icon: <FiClock className="w-4 h-4" />,
    },
    {
      id: "early-booking",
      image: "/images/hotel/general/general-3.jpg",
      badge: {
        en: "10+ Days Early",
        ru: "За 10 дней",
        uz: "10 kun oldin",
      },
      link: "/booking/?special-offer=10068279",
      icon: <FiTag className="w-4 h-4" />,
    },
  ];

  return (
    <section
      id="special-offers"
      className="px-5 py-5 md:py-10 bg-sand/30 relative overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          label={t("title")}
          title={t("title")}
          subtitle=""
          description={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="bg-white border border-sand/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image & Badge */}
              <div className="aspect-video relative overflow-hidden shrink-0">
                <ResponsiveImage
                  src={offer.image}
                  alt={t(`offers.${offer.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] opacity-95 shadow-md flex items-center gap-2 rounded-xs">
                  {offer.icon}
                  <span>{offer.badge[locale as keyof typeof offer.badge] || offer.badge.en}</span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h3 className="font-jost text-xl font-medium text-text-dark tracking-tight mb-2.5">
                    {t(`offers.${offer.id}.title`)}
                  </h3>
                  <p className="text-text-mid font-jost text-sm leading-relaxed line-clamp-3">
                    {t(`offers.${offer.id}.description`)}
                  </p>
                </div>

                <div className="pt-4 border-t border-sand/10">
                  <button
                    onClick={() => router.push(offer.link)}
                    className="w-full inline-flex items-center justify-center bg-brand hover:bg-brand-dark transition-all duration-300 text-text-dark border-none h-[40px] px-6 font-jost text-[10px] tracking-[3px] uppercase cursor-pointer font-bold active:scale-97"
                  >
                    {t("bookNow")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/offers"
            className="inline-flex items-center justify-center px-6 py-3 border border-gold/30 text-gold text-xs tracking-[4px] font-bold hover:bg-gold hover:text-white transition-all duration-500 uppercase"
          >
            {t("title")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
