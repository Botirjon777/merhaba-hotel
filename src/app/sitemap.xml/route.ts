import { newsItems } from "@/lib/data";
import { NextResponse } from "next/server";

export const dynamic = "force-static";
export const revalidate = 86400; // regenerate once per 24 hours

const BASE = "https://merhabahotel.uz";
const locales = ["uz", "ru", "en"] as const;

const staticPaths = [
  { path: "",                    priority: "1.0", changeFreq: "weekly"  },
  { path: "/about",              priority: "0.8", changeFreq: "monthly" },
  { path: "/rooms",              priority: "0.9", changeFreq: "weekly"  },
  { path: "/gallery",            priority: "0.7", changeFreq: "monthly" },
  { path: "/services",           priority: "0.8", changeFreq: "monthly" },
  { path: "/news",               priority: "0.7", changeFreq: "weekly"  },
  { path: "/booking",            priority: "0.9", changeFreq: "weekly"  },
  { path: "/contacts",           priority: "0.7", changeFreq: "monthly" },
  { path: "/reviews",            priority: "0.6", changeFreq: "weekly"  },
];

function urlBlock(path: string, priority: string, changeFreq: string, lastmod: string) {
  const alternates = locales.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE}/${l}${path}"/>`
  ).join("\n");
  const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/ru${path}"/>`;

  return locales.map((locale) => `
  <url>
    <loc>${BASE}/${locale}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
${xDefault}
  </url>`).join("");
}

export async function GET() {
  const staticBlocks = staticPaths.map(({ path, priority, changeFreq }) =>
    urlBlock(path, priority, changeFreq, "2026-06-15")
  ).join("");

  const newsBlocks = newsItems.map((item) =>
    urlBlock(`/news/${item.id}`, "0.6", "yearly", item.date)
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticBlocks}
${newsBlocks}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
