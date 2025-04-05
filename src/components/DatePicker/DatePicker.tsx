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

  const renderPriceRowForProperty = (property: PriceEntryProps) => {
    const dateList: Date[] = [];
    const totalDays = endDate || 30;

    for (let i = 0; i < totalDays; i++) {
      dateList.push(addDays(startDate, i));
    }

    const prices = dateList.map((day) => {
      const key = format(day, "yyyy-MM-dd");
      const price = property.prices[key] || "-";
      return (
        <div
          key={`${property.name}-${key}`}
          className="flex items-center justify-center ml-[0px] w-[75px] h-[55px] shrink-0 border-r border-t border-gray-300 text-sm text-gray-700"
        >
          {price}
        </div>
      );
    });

    return <div className="flex">{prices}</div>;
  };

  const renderDays = () => {
    const dayFormat = "E";
    const dateFormat = "d";
    const dateList: Date[] = [];
    const totalDays = endDate || 30;

    for (let i = 0; i < totalDays; i++) {
      const currentDay = addDays(startDate, i);
      dateList.push(currentDay);
    }

    const dateCells = dateList.map((day) => (
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
    ));

    return (
      <div
        id="container"
        className="flex overflow-x-scroll no-scrollbar -ml-[40px] scroll-smooth w-[90%]"
      >
        <div className="flex flex-col">
          <span className="sticky -top-1 left-0 self-start text-lg font-normal text-gray-700  mb-2 h-[55px]">
            Calendar | {format(startDate, labelFormat || "MMMM yyyy")}
          </span>

          <div className="flex">{dateCells}</div>
          {priceData.map((property) => renderPriceRowForProperty(property))}
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
      <div className="flex flex-col w-80 ">
        <div className="flex items-center gap-2 border-b border-gray-300 h-[113px]"></div>
        <div className="flex flex-col w-full gap-4">
          {priceData.map((property, i) => (
            <div
              key={i}
              className="flex items-center gap-2 border-b border-gray-300 h-[55px]"
              onClick={() => navigate(`/calendar/${property.id}`)}
            >
              <div className="w-8 h-8 bg-gray-500"></div>
              <div className="cursor-pointer">
                <p>{property.name}</p>
                <p className="text-xs text-gray-500">{property.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
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
