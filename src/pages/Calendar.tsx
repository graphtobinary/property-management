import PageMeta from "../components/common/PageMeta";
import { lazy } from "react";
import CustomCalendar from "../components/CustomCalendar";

const CalendarPropertyList = lazy(
  () => import("../components/CalendarPropertyList")
);

const Calendar: React.FC = () => {
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />

      <div className="p-4">
        <h1 className="text-lg font-semibold">Calendar | March 2025</h1>
        <CustomCalendar />
        <CalendarPropertyList />
      </div>
    </>
  );
};

export default Calendar;
