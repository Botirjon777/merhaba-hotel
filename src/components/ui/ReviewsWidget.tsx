"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRateSummary } from '@/hooks/useReviews';
import { Link } from '@/i18n/navigation';

export function ReviewsWidget() {
  const locale = useLocale();
  const t = useTranslations("ReviewsWidget");
  const { data, isLoading, error } = useRateSummary(locale);

  if (isLoading || error || !data) {
    return null; // Silent fail if loading or error to not block UI
  }

  return (
    <Link
      href="/reviews"
      className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 transition-all duration-300 hover:bg-white/20 hover:scale-105 shadow-xl group"
    >
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-1">
          <span className="text-white font-bold text-lg leading-none">{data.rate.rate}</span>
          <span className="text-white/60 text-xs">/10</span>
        </div>
        <span className="text-gold text-[10px] uppercase tracking-wider font-semibold">{data.rate.textRate}</span>
      </div>

      <div className="w-px h-8 bg-white/20"></div>

      <div className="flex flex-col">
        <span className="text-white/90 text-sm font-medium leading-tight">{t("googleReviews")}</span>
        <span className="text-white/60 text-[11px] hover:text-gold transition-colors">{data.reviewsCount} {t("reviewsCount")}</span>
      </div>
    </Link>
  );
}
