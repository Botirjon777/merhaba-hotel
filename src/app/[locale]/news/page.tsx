import NewsView from "@/features/news/NewsView";
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
    title: t("newsTitle"),
    description: t("newsDesc"),
    openGraph: {
      title: t("newsTitle"),
      description: t("newsDesc"),
      url: `https://merhabahotel.uz/${locale}/news`,
      images: [
        {
          url: "/images/hotel/general/general-1.jpg",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel News & Events",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("newsTitle"),
      description: t("newsDesc"),
      images: ["/images/hotel/general/general-1.jpg"],
    },
    alternates: buildAlternates("/news", locale),
  };
}

export default function NewsPage() {
  return <NewsView />;
}
