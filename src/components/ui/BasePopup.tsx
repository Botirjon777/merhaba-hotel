"use client";

import { usePopup } from "@/lib/PopupContext";
import { ServicePopup } from "./ServicePopup";
import { WelcomePopup } from "./WelcomePopup";
import { AvailabilityModal } from "./AvailabilityModal";

export function BasePopup() {
  const { activePopup } = usePopup();

  if (!activePopup) return null;

  switch (activePopup) {
    case "service-popup":
      return <ServicePopup />;
    case "welcome-popup":
      return <WelcomePopup />;
    case "availability-popup":
      return <AvailabilityModal />;
    default:
      return null;
  }
}
