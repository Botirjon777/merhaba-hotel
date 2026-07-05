import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "ru", "en"],
  defaultLocale: "ru",
  localePrefix: "always", // /uz, /ru, /en — all explicit
  localeDetection: false, // Google всегда получает стабильный URL
});
