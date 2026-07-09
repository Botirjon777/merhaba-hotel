import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { routing } from "@/i18n/routing";
import en from "../../../new-translations/en.json";
import ru from "../../../new-translations/ru.json";
import uz from "../../../new-translations/uz.json";

const allMessages = { en, ru, uz };
import { PopupProvider } from "@/lib/PopupContext";
import GalleryPopup from "@/components/ui/GalleryPopup";
import { BasePopup } from "@/components/ui/BasePopup";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { RouteChangeHandler } from "@/components/ui/RouteChangeHandler";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Merhaba Hotel",
  description:
    "Experience genuine hospitality, premium rooms, and modern comfort in the heart of Fergana.",
  url: "https://merhabahotel.uz/uz",
  telephone: "+998940677700",
  email: "merhabaluxhotel@gmail.com",
  checkinTime: "14:00",
  checkoutTime: "12:00",
  numberOfRooms: 63,
  currenciesAccepted: "UZS, USD",
  paymentAccepted: "Cash, Credit Card",
  address: {
    "@type": "PostalAddress",
    streetAddress: "A. Navoi Street, 27",
    addressLocality: "Fergana",
    addressRegion: "Fergana Region",
    addressCountry: "UZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.373780650653345",
    longitude: "71.78624619711951",
  },
  image: "https://merhabahotel.uz/images/hotel/general/general-1.jpg",
  starRating: { "@type": "Rating", ratingValue: "5" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
    bestRating: "5",
  },
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/safir_hotell/",
    "https://t.me/safirhotell",
  ],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
    { "@type": "LocationFeatureSpecification", name: "Buffet Breakfast", value: true },
    { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true },
    { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
    { "@type": "LocationFeatureSpecification", name: "Laundry Service", value: true },
  ],
};

const BASE = "https://merhabahotel.uz";

/** Strip a leading locale segment so we get the locale-agnostic path (e.g. "/about", "" for home). */
function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && hasLocale(routing.locales, segments[0])) {
    segments.shift();
  }
  return segments.length > 0 ? `/${segments.join("/")}` : "";
}

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const path = getPathWithoutLocale(pathname);

  return {
    metadataBase: new URL(BASE),
    title: {
      default: "Merhaba Hotel — Luxury Hotel in Fergana, Uzbekistan",
      template: "%s | Merhaba Hotel",
    },
    description:
      "Experience genuine hospitality, premium rooms, and modern comfort in the heart of Fergana. Merhaba Hotel — a place you will want to return to.",
    keywords: [
      "merhaba hotel",
      "merhaba hotel",
      "hotel fergana",
      "fergana hotel",
      "mehmonxona fargona",
      "fargona mehmonxona",
      "гостиница фергана",
      "фергана гостиница",
      "merhaba mehmonxonasi",
      "best hotel in fergana",
      "luxury accommodation fergana",
      "гостиница в фергане",
      "отель фергана",
    ],
    authors: [{ name: "Merhaba Hotel" }],
    creator: "Merhaba Hotel",
    publisher: "Merhaba Hotel",
    alternates: {
      languages: {
        uz: `${BASE}/uz${path}`,
        ru: `${BASE}/ru${path}`,
        en: `${BASE}/en${path}`,
        "x-default": `${BASE}/ru${path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Merhaba Hotel",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const messages = allMessages[locale as keyof typeof allMessages];

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Tashkent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PopupProvider>
        <RouteChangeHandler />
        <div className="overflow-x-hidden relative w-full flex flex-col min-h-screen">
          {children}
          <BasePopup />
          <GalleryPopup />
          <ScrollToTop />
        </div>
      </PopupProvider>
    </NextIntlClientProvider>
  );
}
