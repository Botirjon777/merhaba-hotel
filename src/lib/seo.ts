const BASE = "https://safirhotel.uz";

export function buildAlternates(path: string, locale: string) {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      uz: `${BASE}/uz${path}`,
      ru: `${BASE}/ru${path}`,
      en: `${BASE}/en${path}`,
      "x-default": `${BASE}/uz${path}`,
    },
  };
}
