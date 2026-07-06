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
          url: "/news/safir-news-3.png",
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
      images: ["/news/safir-news-3.png"],
    },
    alternates: buildAlternates("/news", locale),
  };
}

export default function NewsPage() {
  return <NewsView />;
}
