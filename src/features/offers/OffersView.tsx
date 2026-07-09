"use client";

import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Footer } from "@/components/layout/Footer";
import { useTranslations, useLocale } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { FiArrowLeft, FiTag, FiCalendar, FiClock } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

interface OfferCard {
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

export default function OffersView() {
  const t = useTranslations("OffersPage");
  const tc = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();

  const offers: OfferCard[] = [
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
    <main className="min-h-screen bg-cream text-text-dark">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-5 bg-[#1a1108] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent"></div>
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
          </div>
        </div>
      </section>

      <BeSearchForm />

      {/* Page Subtitle Description */}
      <section className="pt-10 pb-5 px-4 md:px-6 max-w-[1200px] mx-auto text-center animate-[fadeUp_0.8s_ease-out]">
        <p className="text-text-mid font-jost text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
      </section>

      {/* Offers List */}
      <section className="py-10 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className="bg-white border border-sand/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group animate-[fadeUp_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              {/* Image & Badge Container */}
              <div className="aspect-video relative overflow-hidden shrink-0">
                <ResponsiveImage
                  src={offer.image}
                  alt={t(`offers.${offer.id}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 380px"
                />
                {/* Promo Badge */}
                <div className="absolute top-4 left-4 bg-gold text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] opacity-95 shadow-md flex items-center gap-2 rounded-xs">
                  {offer.icon}
                  <span>{offer.badge[locale as keyof typeof offer.badge] || offer.badge.en}</span>
                </div>
              </div>

              {/* Offer Info Section */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div>
                  <h2 className="font-jost text-xl font-medium text-text-dark tracking-tight mb-3">
                    {t(`offers.${offer.id}.title`)}
                  </h2>
                  <p className="text-text-mid font-jost text-sm leading-relaxed">
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
      </section>

      <Footer />
    </main>
  );
}
