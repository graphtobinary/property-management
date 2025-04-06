import { useEffect, useState } from "react";
import {
  DailyPriceItemProps,
  PropertyPriceItemProps,
} from "../interfaces/listing";
import { getPropertyPriceRules } from "../api/Listing.api";
import { format } from "date-fns";

export interface PriceData {
  propertyId: string;
  date: string;
  price: number;
}

export const usePrices = (startDate: string, endDate: string, id: number) => {
  const [prices, setPrices] = useState<DailyPriceItemProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
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
    };

    fetchPrices();
  }, [startDate, endDate]);

  return { prices, loading };
};
