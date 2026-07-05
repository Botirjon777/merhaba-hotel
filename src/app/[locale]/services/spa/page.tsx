import SpaView from "@/features/services/SpaView";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://safirhotel.uz" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://safirhotel.uz/services" },
    { "@type": "ListItem", position: 3, name: "Fitness & SPA", item: "https://safirhotel.uz/services/spa" },
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
    title: t("spaTitle"),
    description: t("spaDesc"),
    openGraph: {
      title: t("spaTitle"),
      description: t("spaDesc"),
      url: `https://safirhotel.uz/${locale}/services/spa`,
      images: [
        {
          url: "/images/hotel/general/pool.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel heated indoor swimming pool and spa, Fergana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("spaTitle"),
      description: t("spaDesc"),
      images: ["/images/hotel/general/pool.webp"],
    },
    alternates: buildAlternates("/services/spa", locale),
  };
}

export default function SpaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SpaView />
    </>
  );
}
