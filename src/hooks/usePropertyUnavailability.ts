import { useEffect, useState } from "react";
import { PropertydailyUnavailabilityProps } from "../interfaces/listing";
import { getPropertyUnavailability } from "../api/Listing.api";
import { format } from "date-fns";

export interface PriceData {
  propertyId: string;
  date: string;
  price: number;
}

export const usePropertyUnavailability = (
  startDate: string,
  endDate: string,
  id: number
) => {
  const [unavailabilities, setUnavailabilities] = useState<
    PropertydailyUnavailabilityProps[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const formattedStart = format(startDate, "yyyy-MM-dd");
        const formattedEnd = format(endDate, "yyyy-MM-dd");
        const { dailyUnavailabilities } = (await getPropertyUnavailability({
          propertyId: id,
          startDate: formattedStart,
          endDate: formattedEnd,
        })) as { dailyUnavailabilities: PropertydailyUnavailabilityProps[] };

        setUnavailabilities(dailyUnavailabilities);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [startDate, endDate]);

  return { unavailabilities, loading };
};
