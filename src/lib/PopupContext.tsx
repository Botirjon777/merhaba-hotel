"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type PopupType = "booking-popup" | "confirm-popup" | "service-popup" | "welcome-popup" | "gallery-popup" | "availability-popup" | null;

interface PopupContextType {
  activePopup: PopupType;
  openPopup: (id: PopupType) => void;
  closePopup: () => void;
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  galleryImages: string[];
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export function PopupProvider({ children }: { children: ReactNode }) {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const openPopup = useCallback((id: PopupType) => setActivePopup(id), []);
  const closePopup = useCallback(() => setActivePopup(null), []);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  // Sync scroll locking
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      if (activePopup || isSidebarOpen) {
        document.documentElement.classList.add('no-scroll');
        document.body.classList.add('no-scroll');
        document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      } else {
        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
        document.body.style.paddingRight = '';
      }
    }
  }, [activePopup, isSidebarOpen]);

  return (
    <PopupContext.Provider value={{ activePopup, openPopup, closePopup, isSidebarOpen, openSidebar, closeSidebar, galleryImages, setGalleryImages }}>
      {children}
    </PopupContext.Provider>
  );
}

export function usePopup() {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup must be used within a PopupProvider");
  return context;
}
