import { useCallback, useEffect, useState } from "react";
import { PropertydailyUnavailabilityProps } from "../interfaces/listing";
import { getPropertyUnavailability } from "../api/Listing.api";
import { format } from "date-fns";

export const usePropertyUnavailability = (
  startDate: string,
  endDate: string,
  id: number
) => {
  const [unavailabilities, setUnavailabilities] = useState<
    PropertydailyUnavailabilityProps[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchUnavilablePrices = useCallback(async () => {
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
  }, [startDate, endDate, id]);
  useEffect(() => {
    fetchUnavilablePrices();
  }, [startDate, endDate]);

  return {
    unavailabilities,
    unavailablityLoading: loading,
    refetchUnavailablity: fetchUnavilablePrices,
  };
};
