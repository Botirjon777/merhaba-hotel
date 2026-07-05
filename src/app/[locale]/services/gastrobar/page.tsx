import GastrobarView from "@/features/services/GastrobarView";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://safirhotel.uz" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://safirhotel.uz/services" },
    { "@type": "ListItem", position: 3, name: "Gastrobar", item: "https://safirhotel.uz/services/gastrobar" },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("gastrobarTitle"),
    description: t("gastrobarDesc"),
    openGraph: {
      title: t("gastrobarTitle"),
      description: t("gastrobarDesc"),
      url: `https://safirhotel.uz/${locale}/services/gastrobar`,
      images: [
        {
          url: "/images/hotel/general/restaurant-2.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Gastrobar restaurant dining, Fergana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("gastrobarTitle"),
      description: t("gastrobarDesc"),
      images: ["/images/hotel/general/restaurant-2.webp"],
    },
    alternates: buildAlternates("/services/gastrobar", locale),
  };
}

export default function GastrobarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GastrobarView />
    </>
  );
}
