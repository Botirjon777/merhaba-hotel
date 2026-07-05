import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safirhotel.uz"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let locale = "uz";
  try {
    locale = await getLocale();
  } catch {
    // fallback to default when middleware hasn't set locale yet
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${jost.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
