import GeneralServicesView from "@/features/services/GeneralServicesView";
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
    title: t("servicesTitle"),
    description: t("servicesDesc"),
    openGraph: {
      title: t("servicesTitle"),
      description: t("servicesDesc"),
      url: `https://merhabahotel.uz/${locale}/services`,
      images: [
        {
          url: "/images/hotel/general/restaurant.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel premium services, Fergana",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("servicesTitle"),
      description: t("servicesDesc"),
      images: ["/images/hotel/general/restaurant.webp"],
    },
    alternates: buildAlternates("/services", locale),
  };
}

export default function ServicesPage() {
  return <GeneralServicesView />;
}
