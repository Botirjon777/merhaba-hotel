"use client";

import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";
import { usePopup } from "@/lib/PopupContext";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { useRouter, usePathname } from "@/i18n/navigation";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const { openSidebar } = usePopup();
  const t = useTranslations("Navbar");
  const router = useRouter();
  const pathname = usePathname();

  // const primaryLinkLabels = new Set(["About Us", "Rooms", "Contacts"]);
  // const primaryNavLinks = navLinks.filter((link) => primaryLinkLabels.has(link.label));

  const renderLinkItem = (link: typeof navLinks[number]) => {
    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
    return (
      <li key={link.label} className="relative group">
        <Link
          href={link.href}
          className={`relative text-[13px] font-normal tracking-[1px] uppercase no-underline transition-colors duration-300 flex items-center gap-1 group-hover:text-gold ${
            isActive ? "text-gold" : "text-text-mid"
          }`}
        >
          {t(link.label.toLowerCase())}
          {link.subLinks && (
            <FiChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
          )}
          {/* creative underline: expands from center on hover, desktop only */}
          <span
            className={`hidden lg:block absolute bottom-0 h-px bg-gold transition-all duration-400 ease-out ${
              isActive ? "left-0 right-0" : "left-1/2 right-1/2 group-hover:left-0 group-hover:right-0"
            }`}
          />
        </Link>

      {link.subLinks && (
        <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
          <ul className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] py-4 min-w-[220px] border border-sand/10">
            {link.subLinks.map((sub) => (
              <li key={sub.label}>
                <Link
                  href={sub.href}
                  className="block px-2.5 py-2.5 text-[12px] tracking-[1px] text-text-mid hover:text-gold hover:bg-cream/30 transition-colors uppercase no-underline"
                >
                  {t(`subLinks.${sub.label.toLowerCase()}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
    );
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 h-[80px] md:h-[80px] max-md:h-[64px] z-1000 flex items-center justify-between px-5 md:px-12 transition-all duration-400 bg-white backdrop-blur-md shadow-[0_2px_30px_rgba(42,29,13,0.10)]"
    >
      <Logo />

      <ul className="hidden lg:flex items-center gap-4 list-none m-0 p-0">
        {navLinks.map(renderLinkItem)}
        <li>
          <LanguageSelector isScrolled={true} />
        </li>
        <li>
          <Button size="sm" onClick={() => router.push("/booking")}>{t("bookNow")}</Button>
        </li>
      </ul>

      <div className="hidden md:flex lg:hidden items-center gap-4">
        <LanguageSelector isScrolled={true} />
        <Button size="sm" onClick={() => router.push("/booking")}>{t("bookNow")}</Button>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-white/90 p-2 text-text-mid transition-colors duration-300 hover:border-gold hover:text-gold"
          onClick={openSidebar}
          aria-label={t("menu")}
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex md:hidden items-center gap-4">
        <LanguageSelector isScrolled={true} />
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-white/90 p-2 text-text-mid transition-colors duration-300 hover:border-gold hover:text-gold"
          onClick={openSidebar}
          aria-label={t("menu")}
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
