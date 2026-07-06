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
      url: `https://merhabahotel.uz/${locale}`,
      images: [
        {
          url: "/images/hotel/general/general-1.jpg",
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
      images: ["/images/hotel/general/general-1.jpg"],
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
        href="/images/hotel/general/general-1.jpg"
      />
      <HomeView />
    </>
  );
}
