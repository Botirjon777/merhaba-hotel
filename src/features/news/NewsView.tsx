"use client";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

import { Footer } from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { newsItems } from "@/lib/data";
import { FiCalendar, FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

import { useState, useEffect } from "react";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

export default function NewsView() {
  const t = useTranslations("NewsPage");
  const tc = useTranslations("Common");
  const [mounted, setMounted] = useState(false);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    setMounted(true);
  }, []);

  const sortedNews = [...newsItems].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <MobileSidebar />

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-10 px-5 bg-[#1a1108] text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gold/60 hover:text-gold text-[10px] uppercase tracking-[3px] font-bold mb-8 transition-all group"
          >
            <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{tc("backToHome")}</span>
          </Link>

          <div className="text-center">
            <h1 className="font-cormorant text-5xl md:text-8xl font-light text-gold mb-6 animate-[fadeUp_0.8s_ease-out]">
              {t("title")}
            </h1>
            <p className="font-jost text-sand/70 tracking-[2px] uppercase text-xs md:text-sm max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>
      <BeSearchForm />
      {/* News Grid */}
      <section className="py-5 px-5 md:px-6 max-w-[1200px] mx-auto">
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-jost text-text-mid uppercase tracking-[2px]">
              {t("sortBy")}:
            </span>
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="bg-white border border-sand/20 text-text-dark font-jost text-sm py-2 pl-4 pr-10 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer rounded-none min-w-[150px]"
              >
                <option value="newest">{t("newestFirst")}</option>
                <option value="oldest">{t("oldestFirst")}</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-sand">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedNews.map((item, index) => (
            <article
              key={item.id}
              className="bg-white border border-sand/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group animate-[fadeUp_0.8s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              {/* Image Container */}
              {item.image && (
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={t(`items.${item.id}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2 shadow-sm">
                    <FiCalendar className="w-3.5 h-3.5 text-gold" />
                    <span className="text-[10px] font-bold text-text-dark tracking-widest">
                      {mounted ? new Date(item.date).toLocaleDateString() : ""}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-2.5 md:p-5">
                <h2 className="font-cormorant text-2xl text-text-dark mb-4 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                  {t(`items.${item.id}.title`)}
                </h2>
                <p className="font-jost text-text-mid text-sm leading-relaxed mb-8 line-clamp-3">
                  {t(`items.${item.id}.excerpt`)}
                </p>
                <Link href={`/news/${item.id}`} className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    {t("readMore")}
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
