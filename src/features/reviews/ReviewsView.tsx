"use client";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";
import { Footer } from "@/components/layout/Footer";
import { useDetailedReviews, useRateSummary, Review, RateSummary } from "@/hooks/useReviews";
import { useLocale, useTranslations } from "next-intl";
import { FiChevronDown, FiArrowLeft } from "react-icons/fi";
import { SiGooglemaps, SiTripadvisor } from "react-icons/si";
import { FaYandex } from "react-icons/fa";
import { ReviewCard } from "./ReviewCard";
import { Link } from "@/i18n/navigation";
import BeSearchForm from "@/components/be-forms/BeSearchForm";

type SortType = "date-desc" | "date-asc" | "rate-desc" | "rate-asc";

export default function ReviewsView() {
  const locale = useLocale();
  const t = useTranslations("ReviewsPage");
  const tc = useTranslations("Common");
  const [sortBy, setSortBy] = useState<SortType>("date-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageSizeOpen, setIsPageSizeOpen] = useState(false);

  const { data: summary, isLoading: isLoadingSummary } = useRateSummary(locale);
  const { 
    data: reviewsData, 
    isLoading: isLoadingReviews,
    error: errorReviews 
  } = useDetailedReviews(
    locale,
    100,
  );

  const sortReviews = (reviews: Review[]) => {
    return [...reviews].sort((a, b) => {
      if (sortBy === "date-desc")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "date-asc")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "rate-desc")
        return b.reviewRates[0].rate - a.reviewRates[0].rate;
      if (sortBy === "rate-asc")
        return a.reviewRates[0].rate - b.reviewRates[0].rate;
      return 0;
    });
  };

  const allSortedReviews = reviewsData ? sortReviews(reviewsData.reviews) : [];
  const totalPages = Math.ceil(allSortedReviews.length / pageSize);
  const paginatedReviews = allSortedReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const sortOptions = [
    { label: t("sortNewest"), value: "date-desc" as SortType },
    { label: t("sortOldest"), value: "date-asc" as SortType },
    { label: t("sortHighRate"), value: "rate-desc" as SortType },
    { label: t("sortLowRate"), value: "rate-asc" as SortType },
  ];

  const pageSizeOptions = [5, 10, 15, 20];

  const currentSortLabel = sortOptions.find((o) => o.value === sortBy)?.label;

  // Reset to first page when sort or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, pageSize]);

  // Scroll to top when page changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  // Determine if we are in the initial loading state (no data yet)
  const isInitialLoading = (isLoadingSummary || isLoadingReviews) && !reviewsData;

  return (
    <main className="min-h-screen bg-cream text-text-dark">
      <Navbar />
      <MobileSidebar />

      {/* Hero */}
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

      <WriteReviewCTA />

      <section className="py-5 px-5 max-w-[1200px] mx-auto min-h-[70vh]">

        {isInitialLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : errorReviews && !reviewsData ? (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{t("failedToLoad")}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gold/20 border border-gold/50 text-gold rounded hover:bg-gold/30 transition-all"
            >
              {t("retry")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 items-start">
            {/* Summary Sidebar */}
            <div className="">
              {summary && <SummaryCard summary={summary} />}
            </div>

            {/* Reviews List */}
            <div className="">
              {/* Controls Bar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 relative">
                {/* Pagination Info */}
                <div className="w-full md:w-auto text-[10px] md:text-xs text-text-mid/60 uppercase tracking-[2px] font-medium flex justify-between md:justify-start items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-gold/60 font-bold">
                      {paginatedReviews.length}
                    </span>
                    <span>/</span>
                    <span>{t("reviewsInfo", { count: paginatedReviews.length, total: allSortedReviews.length }).split(paginatedReviews.length.toString() + " / ")[1] || t("reviewsInfo", { count: "", total: allSortedReviews.length }).replace(" / ", "")}</span>
                  </div>
                  <span className="hidden md:block mx-4 opacity-20">|</span>
                  <div className="flex items-center gap-2">
                    <span>{t("pageInfo", { current: currentPage, total: totalPages })}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto flex flex-row justify-end gap-2 relative">
                  {/* Page Size Selector */}
                  <div className="flex-1 md:w-[140px] md:flex-none relative z-50">
                    <button
                      onClick={() => {
                        setIsPageSizeOpen(!isPageSizeOpen);
                        setIsSortOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-white border border-sand/30 px-3 py-2 rounded text-[10px] md:text-xs text-text-dark hover:border-gold/50 transition-colors shadow-xs"
                    >
                      <span className="flex items-center gap-1 md:gap-2">
                        <span className="text-text-mid/60">{t("show")}</span>
                        {pageSize}
                      </span>
                      <FiChevronDown
                        className={`transition-transform duration-300 ${isPageSizeOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isPageSizeOpen && (
                      <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-sand/30 rounded shadow-xl overflow-hidden animate-modal-in">
                        {pageSizeOptions.map((size) => (
                          <button
                            key={size}
                            onClick={() => {
                              setPageSize(size);
                              setIsPageSizeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-sand/20 ${pageSize === size ? "text-gold bg-sand/10 font-bold" : "text-text-dark/80 hover:text-text-dark"}`}
                          >
                            {size} {t("perPage")}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sorting Dropdown */}
                  <div className="flex-2 md:w-[220px] md:flex-none relative z-50">
                    <button
                      onClick={() => {
                        setIsSortOpen(!isSortOpen);
                        setIsPageSizeOpen(false);
                      }}
                      className="w-full flex items-center justify-between bg-white border border-sand/30 px-3 py-2 rounded text-[10px] md:text-xs text-text-dark hover:border-gold/50 transition-colors shadow-xs"
                    >
                      <span className="flex items-center gap-1 md:gap-2 overflow-hidden">
                        <span className="text-text-mid/60 shrink-0">{t("sort")}</span>
                        <span className="truncate">{currentSortLabel}</span>
                      </span>
                      <FiChevronDown
                        className={`transition-transform duration-300 shrink-0 ${isSortOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isSortOpen && (
                      <div className="absolute top-full right-0 left-0 mt-1 bg-white border border-sand/30 rounded shadow-xl overflow-hidden animate-modal-in">
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs transition-colors hover:bg-sand/20 ${sortBy === opt.value ? "text-gold bg-sand/10 font-bold" : "text-text-dark/80 hover:text-text-dark"}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reviews Cards */}
              <div className="space-y-5 min-h-[400px]">
                {paginatedReviews.map((review) => (
                  <ReviewCard
                    key={review.reviewGuid}
                    review={review}
                    locale={locale}
                  />
                ))}

                {allSortedReviews.length === 0 && (
                  <div className="text-center py-20 text-text-mid/50">
                    {t("noReviews")}
                  </div>
                )}
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-5">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-sand/30 bg-white rounded hover:border-gold/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronDown className="rotate-90" />
                  </button>

                  <div className="flex gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Logic to show limited page numbers if too many
                      if (
                        totalPages > 7 &&
                        page !== 1 &&
                        page !== totalPages &&
                        Math.abs(page - currentPage) > 1
                      ) {
                        if (page === 2 || page === totalPages - 1)
                          return (
                            <span key={page} className="px-1 text-text-mid/40">
                              ...
                            </span>
                          );
                        return null;
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded border transition-all cursor-pointer ${currentPage === page ? "bg-gold/10 border-gold text-gold font-bold" : "border-sand/30 text-text-mid hover:border-gold/50 hover:text-gold bg-white"}`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-sand/30 bg-white rounded hover:border-gold/50 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiChevronDown className="-rotate-90" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

function WriteReviewCTA() {
  const t = useTranslations("ReviewsPage");

  const platforms = [
    {
      name: "Google Maps",
      href: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x38bb8500207fb19b:0xaf46b23a21e55fb5!12e1?source=g.page.m._&laa=merchant-review-solicitation",
      Icon: SiGooglemaps,
      color: "#4285F4",
    },
    {
      name: "Yandex Maps",
      href: "https://yandex.uz/maps/org/safir_hotel/126362646807/reviews/?ll=71.786746%2C40.368405&z=17",
      Icon: FaYandex,
      color: "#FC3F1D",
    },
    {
      name: "Tripadvisor",
      href: "https://www.tripadvisor.com/UserReviewEdit-g788138-d28863252-Safir_Hotel-Fergana_Fergana_Province.html",
      Icon: SiTripadvisor,
      color: "#34E0A1",
    },
  ];

  return (
    <section className="px-5 pt-8 pb-2 max-w-[1200px] mx-auto">
      <div className="bg-white border border-sand/30 rounded-lg p-6 md:p-8 shadow-[0_4px_20px_rgba(42,77,120,0.03)]">
        <div className="text-center mb-6">
          <h2 className="font-cormorant text-3xl md:text-4xl text-gold font-light mb-2">
            {t("writeReviewTitle")}
          </h2>
          <p className="font-jost text-text-mid/70 text-sm md:text-base max-w-2xl mx-auto">
            {t("writeReviewDesc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {platforms.map(({ name, href, Icon, color }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 bg-cream/40 border border-sand/30 rounded-lg px-4 py-4 hover:border-gold/50 hover:bg-cream/70 hover:-translate-y-0.5 transition-all duration-300 shadow-xs"
            >
              <Icon
                className="w-7 h-7 shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color }}
              />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[9px] uppercase tracking-[2px] text-text-mid/50 font-medium">
                  {t("writeReviewAction")}
                </span>
                <span className="text-sm md:text-base font-semibold text-text-dark">
                  {name}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({ summary }: { summary: RateSummary }) {
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations("ReviewsPage");
  const categories = summary.providerRates;
  const visibleCategories = categories.slice(0, 4);
  const extraCategories = categories.slice(4);

  return (
    <div className="bg-white border border-sand/30 p-2.5 md:p-5 rounded-lg shadow-[0_4px_20px_rgba(42,77,120,0.03)]">
      <div className="flex flex-row gap-6 md:gap-12 items-center">
        {/* Left Side: Score */}
        <div className="shrink-0 border-r border-sand/20 pr-6 md:pr-12">
          <div className="flex items-baseline gap-1 md:gap-2 mb-0.5">
            <span className="text-4xl md:text-6xl font-cormorant text-gold leading-none">
              {summary.rate.rate}
            </span>
            <span className="text-text-mid/40 text-sm md:text-base font-light">
              / 10
            </span>
          </div>
          <div className="text-text-dark text-lg md:text-2xl font-cormorant tracking-wide mb-1 capitalize">
            {summary.rate.textRate}
          </div>
          <div className="text-text-mid/60 text-[8px] md:text-[9px] uppercase tracking-[2px] font-medium whitespace-nowrap">
            {t("basedOn", { count: summary.reviewsCount })}
          </div>
        </div>

        {/* Right Side: Bars */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4">
            {visibleCategories.map((cat, i: number) => (
              <div key={i}>
                <div className="flex justify-between text-[9px] md:text-[10px] mb-1.5 uppercase tracking-widest font-medium">
                  <span className="text-text-dark/80 truncate pr-2">
                    {cat.categoryName.replace("_", " ")}
                  </span>
                  <span className="text-gold font-bold">{cat.rate}</span>
                </div>
                <div className="h-[1.5px] w-full bg-sand/30 relative">
                  <div
                    className="h-full bg-gold absolute left-0 top-0 transition-all duration-1000 ease-out"
                    style={{
                      width: `${(cat.rate / cat.maxRate) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Categories with Animation */}
          <div
            className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
              showAll
                ? "grid-rows-[1fr] opacity-100 mt-4"
                : "grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="min-h-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4">
                {extraCategories.map((cat, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-[9px] md:text-[10px] mb-1.5 uppercase tracking-widest font-medium">
                      <span className="text-text-dark/80 truncate pr-2">
                        {cat.categoryName.replace("_", " ")}
                      </span>
                      <span className="text-gold font-bold">{cat.rate}</span>
                    </div>
                    <div className="h-[1.5px] w-full bg-sand/30 relative">
                      <div
                        className="h-full bg-gold absolute left-0 top-0 transition-all duration-1000 ease-out"
                        style={{
                          width: `${(cat.rate / cat.maxRate) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {categories.length > 4 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-gold/60 hover:text-gold text-[8px] md:text-[9px] uppercase tracking-[2px] font-bold mt-3 transition-all flex items-center gap-2 cursor-pointer"
            >
              {showAll ? t("showLess") : t("moreCategories", { count: categories.length - 4 })}
              <FiChevronDown
                className={`w-3 h-3 transition-transform duration-500 ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
