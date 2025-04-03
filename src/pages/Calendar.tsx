import PageMeta from "../components/common/PageMeta";
import { lazy } from "react";

const CalendarHeader = lazy(() => import("../components/CalendarHeader"));
const CalendarPropertyList = lazy(
  () => import("../components/CalendarPropertyList")
);

const Calendar: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />

      <div className="p-4">
        <h1 className="text-lg font-semibold">Calendar | March 2025</h1>
        <CalendarHeader />
        <CalendarPropertyList />
      </div>
    </>
  );
};

export default Calendar;
