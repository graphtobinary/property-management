import { useEffect, useMemo, useState } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { DatePickerProps, PriceEntryProps } from "../../interfaces";
import { useNavigate } from "react-router";

const priceData: PriceEntryProps[] = [
  {
    id: 1,
    name: "The Royal Lotus Inn",
    location: "Bhubaneswar",
    prices: {
      "2025-04-05": "₹2,345",
      "2025-04-06": "₹2,500",
      "2025-04-07": "₹2,690",
      // more dates...
    },
  },
  {
    id: 2,
    name: "Palm Grove Resort",
    location: "Goa",
    prices: {
      "2025-04-05": "₹1,999",
      "2025-04-06": "₹2,199",
      // more dates...
    },
  },
  {
    id: 2,
    name: "Hathi Mahal Resort",
    location: "Panji",
    prices: {
      "2025-04-05": "₹3,999",
      "2025-04-06": "₹7,199",
      // more dates...
    },
  },
];

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
          className={`flex items-center gap-2 pl-2 w-[200px] h-[55px] shrink-0 border-t border-r border-gray-300 ${
            isLastRow ? "border-b border-gray-300" : ""
          }`}
          onClick={() => navigate(`/calendar/${property.id}`)}
        >
          <img
            src="https://manzil-dev.s3.ap-south-1.amazonaws.com/properties/cf_drtzcDeR2k0eVsC/1743743242371-nI1ZF6.166b1c21-7b9f-43f8-b5af-ca11b03b98e7"
            alt="Property"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-gray-800">{property.name}</p>
            <p className="text-xs text-gray-500">{property.location}</p>
          </div>
        </div>

        {/* Prices */}
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

    return (
      <div
        id="container"
        className="flex overflow-x-scroll no-scrollbar -ml-[40px] scroll-smooth w-full"
      >
        <div className="flex flex-col">
          <span className="sticky -top-1 left-0 text-lg font-normal text-gray-700 mb-2 h-[55px]">
            Calendar | {format(startDate, labelFormat || "MMMM yyyy")}
          </span>

          <div className="flex">
            {/* Empty placeholder for alignment with property cells */}
            <div className="w-[200px] h-[49px] shrink-0 "></div>
            {dateList.map((day) => (
              <div
                id={getId(day)}
                className="flex flex-col items-center cursor-pointer ml-[0px] w-[75px] h-[49px] shrink-0 border-r border-gray-300"
                style={getStyles(day)}
                key={day.toString()}
                onClick={() => onDateClick(day)}
              >
                <div className="text-xs mt-1">{format(day, dayFormat)}</div>
                <div className="text-lg">{format(day, dateFormat)}</div>
              </div>
            ))}
          </div>

          {priceData.map((property, index) =>
            renderPriceRowForProperty(property, index)
          )}
        </div>
      </div>
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
      <div className="flex flex-col">{/* {renderPrices()} */}</div>
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
