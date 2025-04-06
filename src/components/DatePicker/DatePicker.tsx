import { Fragment, useEffect, useMemo, useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { DatePickerProps, PriceEntryProps } from "../../interfaces";
import { useNavigate } from "react-router";
import { getPropertyList, getPropertyPriceRules } from "../../api/Listing.api";
import {
  DailyPriceItemProps,
  PropertyListItemProps,
  PropertyPriceItemProps,
} from "../../interfaces/listing";
import Loader from "../Loader/Loader";
import { getCurrencySymbol } from "../../constants";

export default function DatePicker({
  endDate,
  selectDate,
  getSelectedDay,
  color,
  labelFormat,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startDate = useMemo(() => new Date(), []);
  const primaryColor = color || "rgb(54, 105, 238)";
  const [priceData, setPriceData] = useState<PriceEntryProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const formData = {
          pagination: {
            page: 1,
            limit: 10,
          },
        };
        const { properties } = (await getPropertyList(formData)) as {
          properties: PropertyListItemProps[];
        };
        const start = new Date();
        const end = addDays(start, endDate || 30);
        const formattedStart = format(start, "yyyy-MM-dd");
        const formattedEnd = format(end, "yyyy-MM-dd");
        const propertiesWithPrices = await Promise.all(
          properties?.map(async (property: PropertyListItemProps) => {
            const { dailyPrices } = (await getPropertyPriceRules({
              propertyId: property.id,
              startDate: formattedStart,
              endDate: formattedEnd,
            })) as PropertyPriceItemProps;

            const priceMap: Record<string, string> = {};
            dailyPrices?.forEach((item: DailyPriceItemProps) => {
              const date = item.pricedAt;
              priceMap[date] = `${
                getCurrencySymbol[item.currency.currencyCode]
              }${Math.ceil(item.price)}`;
            });

            return {
              id: property.id,
              name: property.name,
              imagePath: property.imagePath,
              location: property.propertyAddress.city,
              prices: priceMap,
            };
          })
        );

        setPriceData(propertiesWithPrices);
      } catch (error) {
        console.error("Error fetching price data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const selectedStyle = {};

  const getStyles = (day: Date) => {
    if (isSameDay(day, selectedDate)) {
      return selectedStyle;
    }
    return undefined;
  };

  const getId = (day: Date) => (isSameDay(day, selectedDate) ? "selected" : "");

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
    getSelectedDay?.(day);
  };
  const [visibleMonth, setVisibleMonth] = useState(
    format(startDate, labelFormat || "MMMM yyyy")
  );
  useEffect(() => {
    const container = document.getElementById("container");

    const handleScroll = () => {
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const dayWidth = 75; // width of each date cell
      const index = Math.floor(scrollLeft / dayWidth);
      const visibleDate = addDays(startDate, index);
      setVisibleMonth(format(visibleDate, labelFormat || "MMMM yyyy"));
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [startDate]);

  const renderPriceRowForProperty = (
    property: PriceEntryProps,
    index: number
  ) => {
    const dateList: Date[] = [];
    const totalDays = endDate || 30;

    for (let i = 0; i < totalDays; i++) {
      dateList.push(addDays(startDate, i));
    }

    const isLastRow = index + 1 === priceData.length;

    return (
      <div className="flex">
        {/* Property image + name + location */}
        <div
          className={`flex items-center gap-2 pl-2 w-[300px] h-[55px] shrink-0 sticky left-0 z-10 bg-gray-50 border-t border-r border-gray-300 cursor-pointer ${
            isLastRow ? "border-b border-gray-300" : ""
          }`}
          onClick={() => navigate(`/calendar/${property.id}`)}
        >
          <img
            src={`${import.meta.env.VITE_CDN_URL}${property?.imagePath}`}
            alt={property.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-800">{property.name}</p>
            <p className="text-xs text-gray-500">{property.location}</p>
          </div>
        </div>

        {/* Prices */}
        <div className="flex flex-1">
          {dateList.map((day) => {
            const key = format(day, "yyyy-MM-dd");
            const price = property.prices[key] || "-";
            return (
              <div
                key={`${property.name}-${key}`}
                className={`flex items-center justify-center ml-[0px] w-[75px] h-[55px] shrink-0 border-r border-t border-gray-300 text-sm text-gray-700 ${
                  isLastRow ? "border-b border-gray-300" : ""
                }`}
              >
                {price}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dayFormat = "E";
    const dateFormat = "d";
    const dateList: Date[] = [];
    const totalDays = endDate || 30;

    for (let i = 0; i < totalDays; i++) {
      dateList.push(addDays(startDate, i));
    }
    if (loading)
      return (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      );

    return (
      <>
        <div className="absolute top-0  z-10 left-0">
          <span className="text-lg font-semibold text-gray-700">
            Calendar | {visibleMonth}
          </span>
        </div>
        <div
          id="container"
          className="flex overflow-x-scroll no-scrollbar -ml-[40px] scroll-smooth w-full mt-16"
        >
          <div className="flex flex-col">
            <div className="flex">
              {/* Empty placeholder for alignment with property cells */}
              <div className="w-[300px] h-[49px] shrink-0 sticky left-0 z-20 bg-gray-50 border-r border-gray-300"></div>
              <div className="flex flex-1">
                {dateList.map((day) => (
                  <div
                    id={getId(day)}
                    className={`flex flex-col items-center cursor-pointer ml-[0px] w-[75px] h-[49px] shrink-0 border-r border-gray-300`}
                    style={getStyles(day)}
                    key={day.toString()}
                    onClick={() => onDateClick(day)}
                  >
                    <div className="text-xs mt-1">{format(day, dayFormat)}</div>
                    <div className="text-lg">{format(day, dateFormat)}</div>
                  </div>
                ))}
              </div>
            </div>

            {priceData.map((property, index) => (
              <Fragment key={index}>
                {" "}
                {renderPriceRowForProperty(property, index)}
              </Fragment>
            ))}
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    if (getSelectedDay) {
      getSelectedDay(selectDate || startDate);
    }
  }, []);

  useEffect(() => {
    if (selectDate && !isSameDay(selectedDate, selectDate)) {
      setSelectedDate(selectDate);
      setTimeout(() => {
        const view = document.getElementById("selected");
        if (view) {
          view.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        }
      }, 20);
    }
  }, [selectDate]);

  const nextWeek = () => {
    const e = document.getElementById("container");
    const width = e?.getBoundingClientRect().width || 0;
    if (e) e.scrollLeft += width - 60;
  };

  const prevWeek = () => {
    const e = document.getElementById("container");
    const width = e?.getBoundingClientRect().width || 0;
    if (e) e.scrollLeft -= width - 60;
  };
  const navigate = useNavigate();
  return (
    <div className="flex w-full bg-inherit ml-6 justify-center">
      <div className="flex items-end z-[2] bg-inherit absolute right-12 top-1.5">
        <button
          className="rounded-full w-10 h-10 text-white text-xl font-bold flex items-center justify-center mb-1"
          style={{ background: primaryColor }}
          onClick={prevWeek}
        >
          ←
        </button>
      </div>
      {renderDays()}
      <div className="flex items-end z-[2] bg-inherit  absolute right-0 top-1.5">
        <button
          className="rounded-full w-10 h-10 text-white text-xl font-bold flex items-center justify-center mb-1"
          style={{ background: primaryColor }}
          onClick={nextWeek}
        >
          →
        </button>
      </div>
    </div>
  );
}
