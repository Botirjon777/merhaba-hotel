import { useState, useEffect } from 'react';

interface BookingRule {
  date: string;
  forbidden?: boolean;
  room_types?: string[];
}

interface Price {
  price_before_tax: number;
  price_after_tax: number;
  currency: string;
}

interface AvailabilityDate {
  date: string;
  is_available: boolean;
  guests: number;
  price: Price;
}

interface RoomTypeAvailability {
  id_room_type: number;
  availability_date: AvailabilityDate[];
}

interface AvailabilityData {
  forbiddenDates: Set<string>;
  lowestPrices: Record<string, Price>;
  isLoading: boolean;
  error: Error | null;
}

export function useAvailability(viewDate: Date): AvailabilityData {
  const [data, setData] = useState<AvailabilityData>({
    forbiddenDates: new Set(),
    lowestPrices: {},
    isLoading: false,
    error: null,
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  useEffect(() => {
    let isMounted = true;

    const fetchAvailability = async () => {
      setData((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        // Fetch from 1st of current month to last day of next month to cache a bit
        // Fetch from 1st of current month to last day of next month to support 2-month calendar
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 2, 0);

        const startDate = `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-${String(firstDay.getDate()).padStart(2, '0')}`;
        const endDate = `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`;

        const [rulesRes, availRes] = await Promise.all([
          fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/hotel_booking_rules?end_date=${endDate}&hotel=506781&shared=false&start_date=${startDate}`),
          fetch(`https://uz-ibe.hopenapi.com/ApiWebDistribution/AvailabilityCalendar/room_type_availability_2?aggregate_dates=true&currency=UZS&end_date=${endDate}&hotel=506781&max_nights=21&start_date=${startDate}&shared=false&point_of_sale.referrer_code=GOOG`)
        ]);

        if (!rulesRes.ok || !availRes.ok) {
          throw new Error('Failed to fetch availability data');
        }

        const rulesData = await rulesRes.json();
        const availData = await availRes.json();

        if (!isMounted) return;

        const forbiddenDates = new Set<string>();
        rulesData.booking_rules?.forEach((rule: BookingRule) => {
          if (rule.forbidden) {
            forbiddenDates.add(rule.date);
          }
        });

        const lowestPrices: Record<string, Price> = {};
        availData.room_type_availability?.forEach((roomType: RoomTypeAvailability) => {
          roomType.availability_date?.forEach((avail: AvailabilityDate) => {
            if (avail.is_available) {
              const currentLowest = lowestPrices[avail.date];
              if (!currentLowest || avail.price.price_after_tax < currentLowest.price_after_tax) {
                lowestPrices[avail.date] = avail.price;
              }
            }
          });
        });

        setData({
          forbiddenDates,
          lowestPrices,
          isLoading: false,
          error: null,
        });

      } catch (error) {
        if (isMounted) {
          setData((prev) => ({ ...prev, isLoading: false, error: error as Error }));
        }
      }
    };

    fetchAvailability();

    return () => {
      isMounted = false;
    };
  }, [year, month]);

  return data;
}
