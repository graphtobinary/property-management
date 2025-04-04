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
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
