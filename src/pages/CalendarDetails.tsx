import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";
import Label from "../components/form/Label";
import Radio from "../components/form/input/Radio";
import Input from "../components/form/input/InputField";
import TextArea from "../components/form/input/TextArea";
import Button from "../components/ui/button/Button";
import { getDaysFromMilliseconds } from "../utils/utils";
import { ChevronLeftIcon } from "../icons";
import { useNavigate } from "react-router";
import { CalendarEvent } from "../interfaces";

const CalendarDetails: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTitle, setEventTitle] = useState("Reserved");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventPrice, setEventPrice] = useState(0);
  const [eventAvailability, setEventAvailability] = useState("");
  const [eventPrivateNote, setEventPrivateNote] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setEvents([
      {
        id: "1",
        title: "Reserved",
        start: new Date().toISOString().split("T")[0],
        extendedProps: {
          calendar: "Danger",
          price: 1200,
          availability: "open",
          privateNote: "Test Note 1",
        },
      },
      {
        id: "2",
        title: "Reserved",
        start: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        extendedProps: {
          calendar: "Success",
          price: 1290,
          availability: "open",
          privateNote: "Test Note 2",
        },
      },
      {
        id: "3",
        title: "Reserved",
        start: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        end: new Date(Date.now() + 259200000).toISOString().split("T")[0],
        extendedProps: {
          calendar: "Primary",
          availability: "blocked",
          price: 9020,
          privateNote: "Test Note 3",
        },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr);
    setEventEndDate(selectInfo.endStr || selectInfo.startStr);
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title || "Bookings");
    setEventStartDate(event.start?.toLocaleDateString("en-CA") || "");
    setEventEndDate(event.end?.toLocaleDateString("en-CA") || "");

    const extendedProps = event.extendedProps;
    setEventLevel(extendedProps.calendar || "");
    setEventPrice(extendedProps.price || 0);
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
    setEventPrice(0);
    setEventAvailability("");
    setEventPrivateNote("");
  };

  const handleRadioChange = (value: string) => {
    setEventAvailability(value);
  };
  const navigate = useNavigate();
  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />
      {/* <PageBreadcrumb pageTitle="Calendar" /> */}
      <div className="flex justify-between flex-col gap-1 mb-6">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-300 p-2 rounded-full flex justify-center items-center cursor-pointer"
          >
            <ChevronLeftIcon />
          </div>
          <div className="w-8 h-8 bg-gray-500"></div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-800 font-semibold">
              The Royal Lotus Inn
            </div>
            <div className="text-xs text-gray-500 font-normal">
              C211, Z-One, Bhubaneswar
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border  border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="custom-calendar">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            selectable={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
          />
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
            <div>
              <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                {selectedEvent ? "Edit Event" : "Add Event"}
              </h5>
            </div>
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                <div className="mt-6">
                  <Label>From</Label>
                  <div className="relative">
                    <Input
                      id="event-start-date"
                      type="date"
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Label>To</Label>
                  <div className="relative">
                    <Input
                      id="event-end-date"
                      type="date"
                      value={eventEndDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <Label>Pricing</Label>
                  <Input
                    id="event-price"
                    type="number"
                    value={eventPrice}
                    onChange={(e) => setEventPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex flex-col flex-wrap justify-between">
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="group1">Availability</Label>
                    <div className="flex flex-col gap-1">
                      <Radio
                        id="radio1"
                        name="group1"
                        value="open"
                        checked={eventAvailability === "open"}
                        onChange={(e) => handleRadioChange(e)}
                        label="Open"
                        className="text-md font-semibold"
                      />
                      <small className="pl-8 text-xs font-normal text-gray-400">
                        Guests can book your property for this date
                      </small>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Radio
                        id="radio2"
                        name="group1"
                        value="blocked"
                        checked={eventAvailability === "blocked"}
                        onChange={(e) => handleRadioChange(e)}
                        label="Blocked"
                        className="text-md font-semibold"
                      />
                      <small className="pl-8 text-xs font-normal text-gray-400">
                        Guests cannot book or find your property on search for
                        this date
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 mt-6">
                <Label>Private Note</Label>
                <div>
                  <TextArea
                    value={eventPrivateNote}
                    onChange={(value) => setEventPrivateNote(value)}
                    rows={4}
                    placeholder="Lorem ipsum dolor sit amet, "
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <Button onClick={closeModal} variant="outline">
                Close
              </Button>
              <Button onClick={handleAddOrUpdateEvent} variant="primary">
                {selectedEvent ? "Update Changes" : "Add Event"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

const renderEventContent = (eventInfo: {
  event: {
    end: number;
    start: number;
    extendedProps: {
      price: number;
    };
  };
}) => {
  const colorClass =
    getDaysFromMilliseconds(eventInfo.event.end - eventInfo.event.start) > 1
      ? `fc-bg-danger`
      : "";
  return (
    <div
      className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}
    >
      <div className="fc-event-title">
        {eventInfo.event.extendedProps.price}
      </div>
    </div>
  );
};

export default CalendarDetails;
