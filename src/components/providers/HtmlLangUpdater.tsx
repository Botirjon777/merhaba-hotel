"use client";
import { useEffect } from "react";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function HtmlLangUpdater() {
  const { locale } = useLanguageStore();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
