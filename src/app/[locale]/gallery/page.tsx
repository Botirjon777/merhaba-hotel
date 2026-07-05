import GalleryView from "@/features/gallery/GalleryView";
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
    title: t("galleryTitle"),
    description: t("galleryDesc"),
    openGraph: {
      title: t("galleryTitle"),
      description: t("galleryDesc"),
      url: `https://safirhotel.uz/${locale}/gallery`,
      images: [
        {
          url: "/images/hotel/general/reception-2.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel interior gallery",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("galleryTitle"),
      description: t("galleryDesc"),
      images: ["/images/hotel/general/reception-2.webp"],
    },
    alternates: buildAlternates("/gallery", locale),
  };
}

export default function GalleryPage() {
  return <GalleryView />;
}
