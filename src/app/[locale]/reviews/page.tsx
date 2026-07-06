import ReviewsView from "@/features/reviews/ReviewsView";
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
    title: t("reviewsTitle"),
    description: t("reviewsDesc"),
    openGraph: {
      title: t("reviewsTitle"),
      description: t("reviewsDesc"),
      url: `https://merhabahotel.uz/${locale}/reviews`,
      images: [
        {
          url: "/images/hotel/general/general-1.jpg",
          width: 1200,
          height: 630,
          alt: "Merhaba Hotel Guest Reviews",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("reviewsTitle"),
      description: t("reviewsDesc"),
      images: ["/images/hotel/general/general-1.jpg"],
    },
    alternates: buildAlternates("/reviews", locale),
  };
}

const reviewsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Merhaba Hotel",
  url: "https://merhabahotel.uz/reviews",
  image: "https://merhabahotel.uz/images/hotel/general/general-1.jpg",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
    bestRating: "5",
  },
  // Review profiles where guests can read and write reviews
  sameAs: [
    "https://www.google.com/maps/place//data=!4m3!3m2!1s0x38bb8500207fb19b:0xaf46b23a21e55fb5!12e1",
    "https://yandex.uz/maps/org/safir_hotel/126362646807/",
    "https://www.tripadvisor.com/Hotel_Review-g788138-d28863252-Safir_Hotel-Fergana_Fergana_Province.html",
  ],
};

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />
      <ReviewsView />
    </>
  );
}
