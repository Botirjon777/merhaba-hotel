import AboutView from "@/features/about-us/AboutView";
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
    title: t("aboutTitle"),
    description: t("aboutDesc"),
    openGraph: {
      title: t("aboutTitle"),
      description: t("aboutDesc"),
      url: `https://safirhotel.uz/${locale}/about`,
      images: [
        {
          url: "/images/hotel/general/reception.webp",
          width: 1200,
          height: 630,
          alt: "Reception lounge at Merhaba Hotel",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("aboutTitle"),
      description: t("aboutDesc"),
      images: ["/images/hotel/general/reception.webp"],
    },
    alternates: buildAlternates("/about", locale),
  };
}

export default function AboutPage() {
  return <AboutView />;
}
