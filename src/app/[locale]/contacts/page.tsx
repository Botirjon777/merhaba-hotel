import ContactsView from "@/features/contacts/ContactsView";
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
    title: t("contactsTitle"),
    description: t("contactsDesc"),
    openGraph: {
      title: t("contactsTitle"),
      description: t("contactsDesc"),
      url: `https://safirhotel.uz/${locale}/contacts`,
      images: [
        {
          url: "/images/hotel/general/hotel-day.webp",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Exterior View",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("contactsTitle"),
      description: t("contactsDesc"),
      images: ["/images/hotel/general/hotel-day.webp"],
    },
    alternates: buildAlternates("/contacts", locale),
  };
}

export default function ContactsPage() {
  return <ContactsView />;
}
