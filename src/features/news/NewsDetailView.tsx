"use client";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { newsItems } from "@/lib/data";
import {
  FiCalendar,
  FiArrowRight,
  FiArrowLeft,
  FiDownload,
} from "react-icons/fi";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

interface NewsDetailViewProps {
  id: string;
}

export default function NewsDetailView({ id }: NewsDetailViewProps) {
  const t = useTranslations("NewsPage");
  const router = useRouter();
  const currentIndex = newsItems.findIndex((n) => n.id === id);
  const item = newsItems[currentIndex];

  const nextItem = newsItems[(currentIndex + 1) % newsItems.length];
  // Only offer a "next" when there is a genuinely different article to go to.
  const hasNext = newsItems.length > 1 && nextItem && nextItem.id !== item?.id;
  const nextTitleRaw = hasNext ? t(`items.${nextItem.id}.title`) : "";
  const nextTitle =
    nextTitleRaw.length > 24 ? `${nextTitleRaw.slice(0, 24)}…` : nextTitleRaw;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        {item.image && (
          <Image
            src={item.image}
            alt={t(`items.${item.id}.title`)}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#1a1108] via-[#1a1108]/50 to-transparent"></div>

        <div className="max-w-[1200px] mx-auto w-full px-5 pb-10 relative z-10">
          <div className="flex items-center gap-3 text-sand/60 mb-2.5">
            <FiCalendar className="w-4 h-4" />
            <span className="text-xs font-medium tracking-[2px] uppercase">
              {mounted ? new Date(item.date).toLocaleDateString() : ""}
            </span>
          </div>

          <h1 className="font-cormorant text-4xl md:text-3xl text-white leading-tight animate-[fadeUp_0.8s_ease-out]">
            {t(`items.${item.id}.title`)}
          </h1>
        </div>
      </section>
      <BeSearchForm />
      {/* Article Content */}
      <section className="py-5 px-5 max-w-[1200px] mx-auto">
        <div className="bg-white p-5 border border-sand/10 shadow-sm">
          <div className="prose prose-gold max-w-none">
            {t(`items.${item.id}.content`)
              .split("\n\n")
              .map((paragraph, i) => (
                <p
                  key={i}
                  className="font-jost text-text-mid text-md leading-relaxed mb-5 last:mb-0 whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
          </div>

          {item.pdfUrl && (
            <div className="mt-5">
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <FiDownload className="mr-2 w-4 h-4" />
                  {t("viewCertificate")}
                </Button>
              </a>
            </div>
          )}

          <div className="pt-5 border-t border-sand/10 flex flex-col md:flex-row justify-center md:items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/news")}
              fullWidth
              className="md:w-auto md:min-w-[180px]"
            >
              <FiArrowLeft className="mr-2 w-4 h-4" />
              {t("allNews")}
            </Button>

            {hasNext && (
              <Button
                variant="gold"
                size="sm"
                onClick={() => router.push(`/news/${nextItem.id}`)}
                fullWidth
                className="md:w-auto md:min-w-[180px]"
              >
                {t("next")}: {nextTitle}
                <FiArrowRight className="ml-2 w-4 h-4 shrink-0" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
