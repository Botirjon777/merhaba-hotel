import RoomsView from "@/features/rooms/RoomsView";
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
    title: t("roomsTitle"),
    description: t("roomsDesc"),
    openGraph: {
      title: t("roomsTitle"),
      description: t("roomsDesc"),
      url: `https://merhabahotel.uz/${locale}/rooms`,
      images: [
        {
          url: "/images/hotel/rooms/lux/king/2.webp",
          width: 1200,
          height: 630,
          alt: "Deluxe King Room at Merhaba Hotel, Fergana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("roomsTitle"),
      description: t("roomsDesc"),
      images: ["/images/hotel/rooms/lux/king/2.webp"],
    },
    alternates: buildAlternates("/rooms", locale),
  };
}

export default function RoomsPage() {
  return <RoomsView />;
}
