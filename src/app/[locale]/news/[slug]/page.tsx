import { newsItems } from "@/lib/data";
import { notFound } from "next/navigation";
import ManagementCert from "@/features/news/articles/ManagementCert";
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

  if (item.id === "management-certificate") {
    title = "ISO 9001:2015 Management System Certificate";
    description =
      "Merhaba Hotel has been awarded the O'z DSt ISO 9001:2015 Management System Certificate (Registry No: UZ.SMT.04.0013).";
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
          ? `https://merhabahotel.uz/news/${item.id}`
          : `https://merhabahotel.uz/${locale}/news/${item.id}`,
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
  "management-certificate": ManagementCert,
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
