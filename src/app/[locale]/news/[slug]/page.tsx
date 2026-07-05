import { newsItems } from "@/lib/data";
import { notFound } from "next/navigation";
import FoodSafetyCert from "@/features/news/articles/FoodSafetyCert";
import QualityManagementCert from "@/features/news/articles/QualityManagementCert";
import SmartInRoomService from "@/features/news/articles/SmartInRoomService";
import { buildAlternates } from "@/lib/seo";

const locales = ["uz", "ru", "en"];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    newsItems.map((item) => ({ locale, slug: item.id }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = newsItems.find((n) => n.id === slug);

  if (!item) {
    return {
      title: "News Article | Merhaba Hotel",
      description: "Read the latest news and updates from Merhaba Hotel.",
    };
  }

  let title = "";
  let description = "";

  if (item.id === "smart-in-room-service") {
    title = "Innovative Smart In-Room Service Launched";
    description =
      "Merhaba Hotel elevates guest experience with the introduction of intelligent smart in-room service controls and digital assistant systems.";
  } else if (item.id === "quality-management-cert") {
    title = "ISO 9001:2015 Quality Management System Certification";
    description =
      "Merhaba Hotel achieves the prestigious ISO 9001:2015 certification, reflecting our commitment to premium service quality and guest satisfaction.";
  } else if (item.id === "food-safety-cert") {
    title = "ISO 22000:2018 Food Safety Management Certification";
    description =
      "Merhaba Hotel Gastrobar receives the ISO 22000:2018 certification, confirming our absolute adherence to elite international food safety and culinary hygiene standards.";
  } else {
    title = item.id
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    description =
      "Read this article to learn more about the latest news, announcements, and events at Merhaba Hotel.";
  }

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title: `${title} | Merhaba Hotel`,
      description,
      url:
        locale === "uz"
          ? `https://safirhotel.uz/news/${item.id}`
          : `https://safirhotel.uz/${locale}/news/${item.id}`,
      publishedTime: new Date(item.date).toISOString(),
      authors: ["Merhaba Hotel"],
      images: [{ url: item.image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Merhaba Hotel`,
      description,
      images: [item.image],
    },
    alternates: buildAlternates(`/news/${item.id}`, locale),
  };
}

const articleMap: Record<string, React.ComponentType> = {
  "food-safety-cert": FoodSafetyCert,
  "quality-management-cert": QualityManagementCert,
  "smart-in-room-service": SmartInRoomService,
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const ArticleComponent = articleMap[slug];

  if (!ArticleComponent) {
    notFound();
  }

  return <ArticleComponent />;
}
