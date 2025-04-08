import { useState, useRef, useEffect, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";
import {
  generateCalendarEvents,
  getMonthRange,
  isPastDate,
} from "../utils/utils";
import { ChevronLeftIcon } from "../icons";
import { useLocation, useNavigate, useParams } from "react-router";
import { CalendarEvent } from "../interfaces/listing";
import { usePrices } from "../hooks/usePrices";
import { usePropertyUnavailability } from "../hooks/usePropertyUnavailability";
import { getCurrencySymbol } from "../constants";
import AnimatedSidebar from "../components/AnimatedSidebar";
import EventUpdateForm from "../components/EventUpdateForm";

const CalendarDetails: React.FC = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventCurrency, setEventCurrency] = useState("");
  const [eventAvailability, setEventAvailability] = useState("");
  const [eventPrivateNote, setEventPrivateNote] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { startDate, endDate } = getMonthRange(currentDate);
  const { prices } = usePrices(startDate, endDate, Number(id));
  const { unavailabilities = [] } = usePropertyUnavailability(
    startDate,
    endDate,
    Number(id)
  );

  const allEvents = useMemo(() => {
    return generateCalendarEvents(prices, unavailabilities);
  }, [prices, unavailabilities]);

  useEffect(() => {
    if (JSON.stringify(events) !== JSON.stringify(allEvents)) {
      setEvents(allEvents);
    }
  }, [allEvents]);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (isPastDate(selectInfo.startStr)) return;
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    const start = clickInfo.event.start;
    if (start && isPastDate(start)) return;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title || "Bookings");
    setEventStartDate(event.start?.toLocaleDateString("en-CA") || "");
    setEventEndDate(event.end?.toLocaleDateString("en-CA") || "");

    const extendedProps = event.extendedProps;
    setEventLevel(extendedProps.calendar || "");
    setEventPrice(extendedProps.price || 0);
    setEventCurrency(extendedProps.currency || getCurrencySymbol["INR"]);
    setEventAvailability(extendedProps.availability || "");
    setEventPrivateNote(extendedProps.privateNote || "");

    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle || "Reserved",
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: {
                  calendar: eventLevel,
                  price: eventPrice,
                  currency: eventCurrency,
                  availability: eventAvailability,
                  privateNote: eventPrivateNote,
                },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle || "Reserved",
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: {
          calendar: eventLevel,
          price: eventPrice,
          availability: eventAvailability,
          privateNote: eventPrivateNote,
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
    setEventPrice("");
    setEventCurrency(getCurrencySymbol["INR"]);
    setEventAvailability("");
    setEventPrivateNote("");
  };

  const handleRadioChange = (value: string) => {
    setEventAvailability(value);
  };
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<
    "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  >("dayGridMonth");

  const changeView = (view: typeof currentView) => {
    setCurrentView(view);

    calendarRef.current?.getApi().changeView(view);
  };

  const goToNext = () => {
    const next = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(next);

    // Immediately tell the calendar to go to the new date
    calendarRef.current?.getApi().gotoDate(next);
  };

  const goToPrev = () => {
    const prev = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prev);

    calendarRef.current?.getApi().gotoDate(prev);
  };

  const renderDayCells = (e: { dayNumberText: string | undefined }) => {
    return (
      <div className="flex justify-end items-end text-sm">
        {e?.dayNumberText}
      </div>
    );
  };

  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      {/* <PageBreadcrumb pageTitle="Calendar" /> */}
      <div className="flex justify-between flex-col sm:flex-row gap-1 mb-6">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-300 p-2 rounded-full flex justify-center items-center cursor-pointer"
          >
            <ChevronLeftIcon />
          </div>
          <img
            src={`${import.meta.env.VITE_CDN_URL}${state?.property?.imagePath}`}
            alt={state?.property?.name}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col">
            <div className="text-sm text-gray-800 font-semibold">
              {state?.property?.name}
            </div>
            <div className="text-xs text-gray-500 font-normal">
              {state?.property?.location}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center">
          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={goToPrev}
              className="bg-gray-300 p-2 rounded-full flex justify-center items-center cursor-pointer w-8 h-8"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={goToNext}
              className="bg-gray-300 p-2 rounded-full flex justify-center items-center cursor-pointer w-8 h-8"
            >
              <div className="rotate-180">
                <ChevronLeftIcon />
              </div>
            </button>
          </div>
          {/* 🔼 Custom Toolbar */}
          <div className="flex justify-end p-4">
            <div className="bg-gray-200 p-1">
              <button
                className={`px-3 py-1 text-sm ${
                  currentView === "dayGridMonth"
                    ? "bg-white text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => changeView("dayGridMonth")}
              >
                Monthly
              </button>
            </div>
            <div className="bg-gray-200 p-1">
              <button
                className={`px-3 py-1 text-sm ${
                  currentView === "timeGridWeek"
                    ? "bg-white text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => changeView("timeGridWeek")}
              >
                Weekly
              </button>
            </div>
            <div className="bg-gray-200 p-1">
              <button
                className={`px-3 py-1 text-sm ${
                  currentView === "timeGridDay"
                    ? "bg-white text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => changeView("timeGridDay")}
              >
                Daily
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="custom-calendar rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialDate={new Date().toISOString().split("T")[0]} // Today
          initialView={currentView}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          fixedWeekCount={false}
          headerToolbar={{
            left: "title",
            right: "",
          }}
          showNonCurrentDates={false}
          height="auto"
          contentHeight="auto"
          dayCellContent={renderDayCells}
        />
      </div>
      <AnimatedSidebar isOpen={isOpen} onClose={closeModal}>
        <EventUpdateForm
          selectedEvent={selectedEvent}
          eventStartDate={eventStartDate}
          setEventStartDate={setEventStartDate}
          eventEndDate={eventEndDate}
          setEventEndDate={setEventEndDate}
          eventCurrency={eventCurrency}
          eventPrice={eventPrice}
          setEventPrice={setEventPrice}
          eventAvailability={eventAvailability}
          eventPrivateNote={eventPrivateNote}
          setEventPrivateNote={setEventPrivateNote}
          handleRadioChange={handleRadioChange}
          handleAddOrUpdateEvent={handleAddOrUpdateEvent}
          closeModal={closeModal}
        />
      </AnimatedSidebar>
    </>
  );
};

const renderEventContent = (eventInfo: {
  event: {
    end: number;
    start: number;
    extendedProps: {
      price: number;
      currency: string;
      availability: string;
    };
  };
}) => {
  const colorClass =
    eventInfo.event.extendedProps.availability !== "open" ? `fc-bg-danger` : "";
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      {eventInfo.event.extendedProps.availability !== "open" ? (
        <div className="fc-event-main-frame px-2">
          <div className="fc-event-title-container">
            <span className="fc-event-title fc-sticky">
              {eventInfo.event.extendedProps.availability}
            </span>
          </div>
        </div>
      ) : (
        <div className="fc-event-title text-sm font-bold">
          {eventInfo.event.extendedProps.currency}
          {eventInfo.event.extendedProps.price}
        </div>
      )}
    </div>
  );
};

export default CalendarDetails;
