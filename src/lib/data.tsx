import {
  LiaBedSolid,
  LiaCoffeeSolid,
  LiaWifiSolid,
  LiaCarSolid,
  LiaTshirtSolid,
  LiaConciergeBellSolid,
} from "react-icons/lia";

type NavLink = {
  label: string;
  href: string;
  subLinks?: { label: string; href: string }[];
};

export const navLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Rooms", href: "/rooms" },
  { label: "Services", href: "/services" },
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
    id: "standart-2",
    label: "Standard Room",
    mainImage: "/images/hotel/rooms/standart-2/1.jpg",
    images: [
      "/images/hotel/rooms/standart-2/1.jpg",
      "/images/hotel/rooms/standart-2/2.jpg",
      "/images/hotel/rooms/standart-2/3.jpg",
      "/images/hotel/rooms/standart-2/4.jpg",
      "/images/hotel/rooms/standart-2/5.jpg",
    ],
  },
  {
    id: "classic",
    label: "Classic Room",
    mainImage: "/images/hotel/rooms/classic/1.jpg",
    images: [
      "/images/hotel/rooms/classic/1.jpg",
      "/images/hotel/rooms/classic/2.jpg",
      "/images/hotel/rooms/classic/3.jpg",
      "/images/hotel/rooms/classic/4.jpg",
      "/images/hotel/rooms/classic/5.jpg",
      "/images/hotel/rooms/classic/6.jpg",
    ],
  },
  {
    id: "classic-with-balcon",
    label: "Classic Room with Balcony",
    mainImage: "/images/hotel/rooms/classic-with-balcon/1.jpg",
    images: [
      "/images/hotel/rooms/classic-with-balcon/1.jpg",
      "/images/hotel/rooms/classic-with-balcon/2.jpg",
      "/images/hotel/rooms/classic-with-balcon/3.jpg",
      "/images/hotel/rooms/classic-with-balcon/4.jpg",
      "/images/hotel/rooms/classic-with-balcon/5.jpg",
    ],
  },
  {
    id: "classic-king",
    label: "Classic King Room",
    mainImage: "/images/hotel/rooms/classic-king/1.jpg",
    images: [
      "/images/hotel/rooms/classic-king/1.jpg",
      "/images/hotel/rooms/classic-king/2.jpg",
      "/images/hotel/rooms/classic-king/3.jpg",
      "/images/hotel/rooms/classic-king/4.jpg",
      "/images/hotel/rooms/classic-king/5.jpg",
      "/images/hotel/rooms/classic-king/6.jpg",
      "/images/hotel/rooms/classic-king/7.jpg",
      "/images/hotel/rooms/classic-king/8.jpg",
      "/images/hotel/rooms/classic-king/9.jpg",
    ],
  },
  {
    id: "classic-king-with-balcon",
    label: "Classic King Room with Balcony",
    mainImage: "/images/hotel/rooms/classic-king-with-balcon/1.jpg",
    images: [
      "/images/hotel/rooms/classic-king-with-balcon/1.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/2.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/3.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/4.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/5.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/6.jpg",
      "/images/hotel/rooms/classic-king-with-balcon/7.jpg",
    ],
  },
  {
    id: "delux-2",
    label: "Deluxe Room",
    mainImage: "/images/hotel/rooms/delux-2/1.jpg",
    images: [
      "/images/hotel/rooms/delux-2/1.jpg",
      "/images/hotel/rooms/delux-2/2.jpg",
      "/images/hotel/rooms/delux-2/3.jpg",
      "/images/hotel/rooms/delux-2/4.jpg",
      "/images/hotel/rooms/delux-2/5.jpg",
    ],
  },
  {
    id: "delux-king",
    label: "Deluxe King Room",
    mainImage: "/images/hotel/rooms/delux-king/1.jpg",
    images: [
      "/images/hotel/rooms/delux-king/1.jpg",
      "/images/hotel/rooms/delux-king/2.jpg",
      "/images/hotel/rooms/delux-king/3.jpg",
      "/images/hotel/rooms/delux-king/4.jpg",
      "/images/hotel/rooms/delux-king/5.jpg",
      "/images/hotel/rooms/delux-king/6.jpg",
      "/images/hotel/rooms/delux-king/7.jpg",
    ],
  },
  {
    id: "lux",
    label: "Lux Suite",
    bestseller: true,
    mainImage: "/images/hotel/rooms/lux/1.jpg",
    images: [
      "/images/hotel/rooms/lux/1.jpg",
      "/images/hotel/rooms/lux/2.jpg",
      "/images/hotel/rooms/lux/3.jpg",
      "/images/hotel/rooms/lux/4.jpg",
      "/images/hotel/rooms/lux/5.jpg",
      "/images/hotel/rooms/lux/6.jpg",
      "/images/hotel/rooms/lux/7.jpg",
      "/images/hotel/rooms/lux/8.jpg",
      "/images/hotel/rooms/lux/9.jpg",
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
    icon: <LiaCoffeeSolid />,
    key: "breakfast",
    href: "/services",
  },
  {
    icon: <LiaWifiSolid />,
    key: "wifi",
    href: "/services",
  },
  {
    icon: <LiaCarSolid />,
    key: "parking",
    href: "/services",
  },
  {
    icon: <LiaTshirtSolid />,
    key: "laundry",
    href: "/services",
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
];
