import BookingView from "@/features/booking/BookingView";
import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("bookingTitle"),
    description: t("bookingDesc"),
    openGraph: {
      title: t("bookingTitle"),
      description: t("bookingDesc"),
      url: `https://merhabahotel.uz/${locale}/booking`,
      images: [
        {
          url: "/images/hotel/general/hotel-day.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Online Booking",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("bookingTitle"),
      description: t("bookingDesc"),
      images: ["/images/hotel/general/hotel-day.webp"],
    },
    alternates: buildAlternates("/booking", locale),
  };
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingView />
    </Suspense>
  );
}
