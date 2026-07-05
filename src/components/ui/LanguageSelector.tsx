"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const languages: { code: string; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "ru", label: "RU", flag: "https://flagcdn.com/w20/ru.png" },
  { code: "uz", label: "UZ", flag: "https://flagcdn.com/w20/uz.png" },
];

export default function LanguageSelector({
  isScrolled,
}: {
  isScrolled?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  useEffect(() => {
    setMounted(true);
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted)
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-cream">
        <div className="w-5 h-[15px] bg-sand/20 rounded-sm animate-pulse" />
        <span className="w-4 h-3 bg-sand/20 rounded animate-pulse" />
      </div>
    );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors duration-300 ${isScrolled ? "text-text-mid" : "text-cream"} hover:text-gold`}
      >
        <Image src={currentLang.flag} alt={currentLang.label} width={20} height={15} style={{ height: "auto" }} />
        <span>{currentLang.label}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-24 bg-cream shadow-lg z-1001 animate-[popup-in_0.3s_ease-out]">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-xs text-text-dark hover:bg-sand transition-colors ${
                  locale === lang.code ? "bg-sand font-bold" : ""
                }`}
              >
                <Image src={lang.flag} alt={lang.label} width={20} height={15} />
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
