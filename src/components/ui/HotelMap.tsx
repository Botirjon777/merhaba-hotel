"use client";

import dynamic from "next/dynamic";

// Leaflet accesses `window` on import, so it must be loaded client-side only
const LeafletHotelMap = dynamic(() => import("./LeafletHotelMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#e8e0d0] animate-pulse" />,
});

export function HotelMap() {
  return <LeafletHotelMap />;
}
