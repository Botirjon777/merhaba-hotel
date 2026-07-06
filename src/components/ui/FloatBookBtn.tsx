"use client";

import { useTranslations } from "next-intl";
import { usePopup } from "@/lib/PopupContext";

export function FloatBookBtn() {
  const t = useTranslations("Navbar");
  const { openPopup } = usePopup();

  return (
    <button
      className="hidden max-md:block fixed bottom-5 right-5 bg-brand text-text-dark border-none py-[14px] px-5 font-jost text-[11px] tracking-[2px] uppercase cursor-pointer z-901 shadow-[0_4px_20px_rgba(227,206,111,0.4)] animate-[bounce-in_0.5s_2s_cubic-bezier(.34,1.56,.64,1)_both]"
      onClick={() => openPopup("availability-popup")}
    >
      {t("bookNow")}
    </button>
  );
}
