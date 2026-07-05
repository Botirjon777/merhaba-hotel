import HomeView from "@/features/home/HomeView";
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
    title: t("homeTitle"),
    description: t("homeDesc"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDesc"),
      url: `https://safirhotel.uz/${locale}`,
      images: [
        {
          url: "/images/hotel/general/hotel-day.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Exterior View",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDesc"),
      images: ["/images/hotel/general/hotel-day.webp"],
    },
    alternates: buildAlternates("", locale),
  };
}

export default function Home() {
  return (
    <>
      {/* Preload the LCP hero image so the browser fetches it before the
          dynamically-imported ImageBanner mounts. Homepage-only on purpose. */}
      <link
        rel="preload"
        as="image"
        href="/images/hotel/general/hotel-day.webp"
        imageSrcSet="/images/hotel/general/hotel-day-mobile.webp 768w, /images/hotel/general/hotel-day.webp 1920w"
        imageSizes="(max-width: 768px) 768px, 1920px"
      />
      <HomeView />
    </>
  );
}
