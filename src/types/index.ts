import { ReactNode } from "react";

export interface NavLink {
  label: string;
  href: string;
}

export interface StatItem {
  num: string;
  label: string;
}

export interface GalleryItem {
  label: string;
  bgClass: string;
  icon?: ReactNode;
}

export interface ServiceItem {
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
}
