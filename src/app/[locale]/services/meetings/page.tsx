import MeetingsView from "@/features/services/MeetingsView";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://merhabahotel.uz" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://merhabahotel.uz/services" },
    { "@type": "ListItem", position: 3, name: "Meetings & Events", item: "https://merhabahotel.uz/services/meetings" },
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
    title: t("meetingsTitle"),
    description: t("meetingsDesc"),
    openGraph: {
      title: t("meetingsTitle"),
      description: t("meetingsDesc"),
      url: `https://merhabahotel.uz/${locale}/services/meetings`,
      images: [
        {
          url: "/images/hotel/conference-rooms/52-person/1.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel conference hall and meeting rooms, Fergana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meetingsTitle"),
      description: t("meetingsDesc"),
      images: ["/images/hotel/conference-rooms/52-person/1.webp"],
    },
    alternates: buildAlternates("/services/meetings", locale),
  };
}

export default function MeetingsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MeetingsView />
    </>
  );
}
