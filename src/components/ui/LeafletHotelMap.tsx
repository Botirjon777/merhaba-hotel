"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRoomPrices } from "@/hooks/useRoomPrices";

const HOTEL_POSITION: [number, number] = [40.3693934, 71.7868168];

// Gold map pin matching the site palette
const pinIcon = L.divIcon({
  className: "hotel-map-pin",
  html: `<svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C8.06 0 0 8.06 0 18c0 13.5 18 28 18 28s18-14.5 18-28C36 8.06 27.94 0 18 0z" fill="#2a4d78"/>
    <circle cx="18" cy="18" r="7" fill="#fdfaf4"/>
  </svg>`,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
  popupAnchor: [0, -50],
});

export default function LeafletHotelMap() {
  const t = useTranslations("Location");
  const { prices, loading } = useRoomPrices();
  const markerRef = useRef<L.Marker>(null);

  const minPrice =
    Object.values(prices).length > 0
      ? Math.min(...Object.values(prices).map((p) => p.price_after_tax))
      : null;

  // Open the popup by default; re-open after the price loads so it resizes
  useEffect(() => {
    markerRef.current?.openPopup();
  }, [loading]);

  return (
    <MapContainer
      center={HOTEL_POSITION}
      zoom={16}
      scrollWheelZoom={false}
      className="hotel-map w-full h-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={HOTEL_POSITION} icon={pinIcon} ref={markerRef}>
        <Popup className="hotel-map-popup" autoClose={false} closeOnClick={false}>
          <div className="w-[170px] sm:w-[220px]">
            <p className="text-sm sm:text-base text-text-dark font-medium m-0 pr-4">
              Merhaba Hotel
            </p>
            <p className="text-[10px] sm:text-xs text-text-mid font-light mt-0.5 sm:mt-1 mb-2 sm:mb-3 leading-relaxed">
              {t("addressText")}
            </p>
            {!loading && minPrice && (
              <p className="text-xs sm:text-sm text-text-dark border-b border-sand pb-2 sm:pb-2.5 mb-2 sm:mb-3">
                {t.rich("fromPrice", {
                  price: minPrice
                    .toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                    .replace(/,/g, " "),
                  b: (chunks) => (
                    <span className="font-semibold">{chunks}</span>
                  ),
                })}
              </p>
            )}
            <Link
              href="/booking"
              className="block w-full bg-gold text-white! text-[10px] sm:text-xs tracking-[1.5px] uppercase text-center py-2 sm:py-2.5 hover:bg-gold/90 transition-colors no-underline"
            >
              {t("bookNow")}
            </Link>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
