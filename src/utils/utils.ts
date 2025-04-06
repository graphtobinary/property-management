import {
  CalendarEvent,
  DailyPrice,
  DailyUnavailability,
} from "../interfaces/listing";
import { AUTH_COOKIES, getCookie } from "./cookie";

export const getDaysFromMilliseconds = (time: number) => {
  return Number(time / (1000 * 60 * 60 * 24));
};

export const validateEmail = (value: string) => {
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value
  );
  return isValidEmail;
};

export const isBrowser = () => typeof window !== "undefined";

export const replaceParamInString = (
  str: string,
  params: { [key: string]: unknown }
): string => {
  const regexReqParam = /[^{]+(?=})/g;
  const matches = str.match(regexReqParam) || [];
  let changedUrl = str;
  matches.forEach((match) => {
    const param = params[match] !== undefined ? params[match] : "";
    // todo fix typescript error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    changedUrl = changedUrl.replace(`{${match}}`, param);
  });
  return changedUrl;
};

export const getHeaders = (accessToken?: string) => {
  const savedAccessToken = getCookie(AUTH_COOKIES.ACCESS_TOKEN);
  const headers: {
    [key: string]: string;
  } = {};
  if (accessToken || savedAccessToken) {
    headers.Authorization = `Bearer ${accessToken || savedAccessToken}`;
  }
  return headers;
};

export function convertTo24HourFormat(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}

export function convertTo12HourFormat(time24h: string): string {
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time24h.split(":").map(Number);
  const modifier = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12; // Midnight case (00:00 → 12:00 AM)
  } else if (hours > 12) {
    hours -= 12; // Convert to 12-hour format (e.g., 13:00 → 1:00 PM)
  }

  return String(`${hours}:${String(minutes).padStart(2, "0")} ${modifier}`);
}

export const getMonthRange = (date: Date) => {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: endDate.toISOString().split("T")[0],
  };
};

export const generateCalendarEvents = (
  dailyPrices: DailyPrice[],
  dailyUnavailabilities: DailyUnavailability[]
): CalendarEvent[] => {
  const events: CalendarEvent[] = [];

  // Convert unavailability list to a Set for quick lookup
  const blockedDatesSet = new Set(
    dailyUnavailabilities?.map((d) => d.unavailableOnDate)
  );
  const commentMap = new Map(
    dailyUnavailabilities?.map((d) => [
      d.unavailableOnDate,
      d.unavailabilityRule.comment,
    ])
  );

  // Group consecutive unavailable dates
  const sortedUnavailable = [...blockedDatesSet].sort();
  const blockedRanges: { start: string; end: string; comment: string }[] = [];

  let rangeStart = sortedUnavailable[0];
  let prevDate = new Date(rangeStart);

  for (let i = 1; i <= sortedUnavailable.length; i++) {
    const current = sortedUnavailable[i];
    const currentDate = new Date(current);
    const nextExpected = new Date(prevDate);
    nextExpected.setDate(prevDate.getDate() + 1);

    if (!current || currentDate.getTime() !== nextExpected.getTime()) {
      blockedRanges.push({
        start: rangeStart,
        end: new Date(prevDate).toISOString().split("T")[0],
        comment: commentMap.get(rangeStart) || "",
      });
      rangeStart = current;
    }
    prevDate = currentDate;
  }

  // Add blocked events
  blockedRanges.forEach((range, i) => {
    events.push({
      id: `blocked-${i}`,
      title: "Blocked",
      start: range.start,
      end: range.end !== range.start ? range.end : undefined,
      extendedProps: {
        calendar: "Danger",
        availability: "blocked",
        privateNote: range.comment,
        price: "Blocked",
      },
    });
  });

  // Add open dates with prices
  dailyPrices.forEach((priceObj, i) => {
    const date = priceObj.pricedAt;
    if (!blockedDatesSet.has(date)) {
      events.push({
        id: `price-${i}`,
        title: "Available",
        start: date,
        extendedProps: {
          calendar: "Success",
          availability: "open",
          privateNote: "",
          price: priceObj.price,
        },
      });
    }
  });

  return events;
};
