"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { stats } from "@/lib/data";
import { useTranslations } from "next-intl";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Link } from "@/i18n/navigation";

export function About() {
  const t = useTranslations("About");
  const ta = useTranslations("AboutPage");

  return (
    <section
      id="about"
      aria-label="About Us"
      className="px-5 py-5 md:py-10 bg-cream relative overflow-hidden"
    >
      <div className="max-w-[1160px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div className="flex-1 min-w-0">
            <SectionHeader
              label={t("storyLabel")}
              title={t("storyTitle1")}
              subtitle={t("storyTitleEm")}
              description={ta("welcome")}
            />

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8 md:gap-10 mb-8">
              {stats.map((stat, i) => (
                <div
                  className="border-l-2 border-gold/20 pl-5 animate-[fadeUp_0.8s_ease-out_forwards]"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                  key={i}
                >
                  <span className="font-cormorant text-4xl md:text-5xl font-light text-gold leading-none block mb-2">
                    {stat.num}
                  </span>
                  <span className="text-[11px] tracking-[3px] uppercase text-text-mid font-medium">
                    {t(`stats.${stat.key}` as Parameters<typeof t>[0])}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-2.5 border border-gold/30 text-gold text-sm tracking-[4px] font-bold hover:bg-gold hover:text-white transition-all duration-500"
              >
                {t("readMore")}
              </Link>
            </div>
          </div>

          {/* Right: Image — hidden on mobile */}
          <div className="hidden lg:block flex-shrink-0 w-[420px] xl:w-[480px]">
            <div className="w-full aspect-4/5 relative overflow-hidden">
              <ResponsiveImage
                src="/images/hotel/general/general-2.jpg"
                alt="Merhaba Hotel Atmosphere"
                fill
                className="object-cover"
                sizes="480px"
                priority
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
