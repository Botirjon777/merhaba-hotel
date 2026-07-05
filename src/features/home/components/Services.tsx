"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicesItems } from "@/lib/data";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Services() {
  const t = useTranslations("Services");
  return (
    <section
      id="services"
      aria-label="Services"
      className="px-5 py-5 md:py-10 bg-cream relative"
    >
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-px md:gap-[2px]">
          {servicesItems.map((service, i) => (
            <Link
              href={service.href || "#"}
              className="bg-sand p-2.5 md:p-5 relative overflow-hidden transition-colors duration-400 cursor-pointer group hover:bg-cream no-underline block"
              key={i}
            >
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gold scale-x-0 transition-transform duration-400 group-hover:scale-x-100"></div>
              <span className="text-2xl md:text-4xl mb-4 md:mb-6 block transition-transform duration-400 group-hover:-translate-y-1.5">
                {service.icon}
              </span>
              <h3 className="text-sm md:text-2xl font-normal text-text-dark mb-1 md:mb-3">
                {t(`items.${service.key}.title` as Parameters<typeof t>[0])}
              </h3>
              <p className="hidden md:block text-sm leading-[1.8] text-text-mid font-light">
                {t(`items.${service.key}.description` as Parameters<typeof t>[0])}
              </p>
              <span className="inline-flex items-center gap-2 mt-3 md:mt-5 text-[9px] md:text-[11px] tracking-[2px] uppercase text-gold no-underline font-normal">
                {t(`items.${service.key}.linkText` as Parameters<typeof t>[0])}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gold/30 text-gold text-sm tracking-[4px] font-bold hover:bg-gold hover:text-white transition-all duration-500"
          >
            {t("showMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
