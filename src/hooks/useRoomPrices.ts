import { useState, useEffect } from 'react';

interface RoomPrice {
  price_before_tax: number;
  price_after_tax: number;
  currency: string;
  originalPrice?: number;
  discountPercentage?: number;
}

interface AvailabilityDate {
  date: string;
  is_available: boolean;
  price: RoomPrice | null;
}

interface RoomTypeAvailability {
  id_room_type: number;
  availability_date?: AvailabilityDate[];
}

interface RoomPricesApiResponse {
  room_type_availability?: RoomTypeAvailability[];
}

export function useRoomPrices() {
  const [prices, setPrices] = useState<Record<number, RoomPrice>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Look 30 days ahead — the next few days may have no availability,
        // in which case a short window returns no room types at all
        const today = new Date();
        const rangeEnd = new Date(today);
        rangeEnd.setDate(today.getDate() + 30);

        const startDate = today.toISOString().split('T')[0];
        const endDate = rangeEnd.toISOString().split('T')[0];

        const res = await fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=false&currency=UZS&end_date=${endDate}&hotel=506785&max_nights=1&start_date=${startDate}&shared=false`);
        const data = (await res.json()) as RoomPricesApiResponse;

        const priceMap: Record<number, RoomPrice> = {};
        data.room_type_availability?.forEach((rt) => {
          // Find the first date where this room is available
          const firstAvail = rt.availability_date?.find((a) => a.is_available);
          if (firstAvail && firstAvail.price) {
            const finalPrice = firstAvail.price.price_after_tax;
            const originalPrice = firstAvail.price.price_before_tax;
            
            // Dynamically detect discount from API data
            // If before_tax is higher than after_tax, we have a discount
            const hasDiscount = originalPrice > finalPrice;
            const discountPercentage = hasDiscount 
              ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100) 
              : 0;

            priceMap[rt.id_room_type] = {
              ...firstAvail.price,
              price_after_tax: finalPrice,
              originalPrice: hasDiscount ? originalPrice : undefined,
              discountPercentage: hasDiscount ? discountPercentage : undefined
            };
          }
        });

        setPrices(priceMap);
      } catch (e) {
        console.error("Failed to fetch room prices", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  return { prices, loading };
}
