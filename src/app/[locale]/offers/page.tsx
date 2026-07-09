import OffersView from "@/features/offers/OffersView";
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
    title: t("offersTitle"),
    description: t("offersDesc"),
    openGraph: {
      title: t("offersTitle"),
      description: t("offersDesc"),
      url: `https://merhabahotel.uz/${locale}/offers`,
      images: [
        {
          url: "/images/hotel/general/general-1.jpg",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Special Offers",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("offersTitle"),
      description: t("offersDesc"),
      images: ["/images/hotel/general/general-1.jpg"],
    },
    alternates: buildAlternates("/offers", locale),
  };
}

export default function OffersPage() {
  return <OffersView />;
}
