import { useCallback, useEffect, useState } from "react";
import {
  DailyPriceItemProps,
  PropertyPriceItemProps,
} from "../interfaces/listing";
import { getPropertyPriceRules } from "../api/Listing.api";
import { format } from "date-fns";

export const usePrices = (startDate: string, endDate: string, id: number) => {
  const [prices, setPrices] = useState<DailyPriceItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    try {
      const formattedStart = format(startDate, "yyyy-MM-dd");
      const formattedEnd = format(endDate, "yyyy-MM-dd");
      const { dailyPrices } = (await getPropertyPriceRules({
        propertyId: id,
        startDate: formattedStart,
        endDate: formattedEnd,
      })) as PropertyPriceItemProps;

      setPrices(dailyPrices);
    } catch (error) {
      console.error("Error fetching prices:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, id]);

  useEffect(() => {
    fetchPrices();
  }, [startDate, endDate]);

  return { prices, loading, refetchPrices: fetchPrices };
};
