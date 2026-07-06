import {
  LiaBedSolid,
  LiaWineGlassSolid,
  LiaSpaSolid,
  LiaSwimmingPoolSolid,
  LiaUsersSolid,
  LiaConciergeBellSolid,
} from "react-icons/lia";

export const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  {
    label: "Services",
    href: "/services",
    subLinks: [
      { label: "Gastrobar", href: "/services/gastrobar" },
      { label: "Fitness & SPA", href: "/services/spa" },
      { label: "Meetings & Events", href: "/services/meetings" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "News", href: "/news" },
  { label: "Contacts", href: "/contacts" },
  { label: "Reviews", href: "/reviews" },
];

export interface NewsItem {
  id: string;
  date: string;
  image: string;
  pdfUrl?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "management-certificate",
    date: "2026-01-01",
    image: "/images/hotel/general/general-1.jpg",
    pdfUrl: "/news/preview-2370.pdf",
  },
];

export const stats = [
  { num: "63", key: "rooms" },
  { num: "4", key: "dining" },
  { num: "★★★", key: "stars" },
  { num: "∞", key: "views" },
];

export const roomCategories = [
  {
    id: "deluxe-king",
    label: "Deluxe King Room",
    hopenId: 5051545,
    mainImage: "/images/hotel/rooms/deluxe/king/1.webp",
    images: [
      "/images/hotel/rooms/deluxe/king/1.webp",
      "/images/hotel/rooms/deluxe/king/2.webp",
      "/images/hotel/rooms/deluxe/king/3.webp",
    ],
  },
  {
    id: "superior-king",
    label: "Superior King Room",
    hopenId: 5036377,
    mainImage: "/images/hotel/rooms/lux/king/1.webp",
    images: [
      "/images/hotel/rooms/lux/king/1.webp",
      "/images/hotel/rooms/lux/king/2.webp",
      "/images/hotel/rooms/lux/king/3.webp",
    ],
  },
  {
    id: "superior-twin",
    label: "Superior Twin Room",
    hopenId: 5036376,
    bestseller: true,
    mainImage: "/images/hotel/rooms/lux/2-room/2.webp",
    images: [
      "/images/hotel/rooms/lux/2-room/2.webp",
      "/images/hotel/rooms/lux/2-room/3.webp",
    ],
  },
  {
    id: "deluxe-twin",
    label: "Deluxe Twin Room",
    hopenId: 5036375,
    mainImage: "/images/hotel/rooms/lux/2-room/1.webp",
    images: [
      "/images/hotel/rooms/lux/2-room/1.webp",
      "/images/hotel/rooms/lux/2-room/4.webp",
    ],
  },
  {
    id: "superior-family",
    label: "Superior Family Room",
    hopenId: 5049207,
    mainImage: "/images/hotel/rooms/lux/family/1.webp",
    images: [
      "/images/hotel/rooms/lux/family/1.webp",
      "/images/hotel/rooms/lux/family/2.webp",
    ],
  },
  {
    id: "standart",
    label: "Standard Single Room",
    hopenId: 5047553,
    mainImage: "/images/hotel/rooms/standart/1-room/1.webp",
    images: [
      "/images/hotel/rooms/standart/1-room/1.webp",
      "/images/hotel/rooms/standart/1-room/2.webp",
    ],
  },
  {
    id: "apartment",
    label: "Apartment",
    hopenId: 5039999,
    mainImage: "/images/hotel/rooms/lux/king/4.webp",
    images: [
      "/images/hotel/rooms/lux/king/4.webp",
      "/images/hotel/rooms/lux/king/5.webp",
    ],
  },
  {
    id: "conference",
    label: "Conference Hall",
    mainImage: "/images/hotel/conference-rooms/32-person/1.webp",
    images: [
      "/images/hotel/conference-rooms/32-person/1.webp",
      "/images/hotel/conference-rooms/22-person/1.webp",
      "/images/hotel/conference-rooms/52-person/1.webp",
    ],
  },
];

export const generalGallery = [
  "/images/hotel/general/general-1.jpg",
  "/images/hotel/general/general-2.jpg",
  "/images/hotel/general/general-3.jpg",
  "/images/hotel/general/general-4.jpg",
  "/images/hotel/general/general-5.jpg",
  "/images/hotel/general/general-6.jpg",
  "/images/hotel/general/general-7.jpg",
  "/images/hotel/general/general-8.jpg",
];

export const servicesItems = [
  {
    icon: <LiaWineGlassSolid />,
    key: "gastrobar",
    href: "/services/gastrobar",
  },
  {
    icon: <LiaSpaSolid />,
    key: "spa",
    href: "/services/spa",
  },
  {
    icon: <LiaUsersSolid />,
    key: "meetings",
    href: "/services/meetings",
  },
  {
    icon: <LiaBedSolid />,
    key: "amenities",
    href: "/services",
  },
  {
    icon: <LiaConciergeBellSolid />,
    key: "guest_services",
    href: "/services",
  },
  {
    icon: <LiaSwimmingPoolSolid />,
    key: "pool",
    href: "/services/spa",
  },
];
