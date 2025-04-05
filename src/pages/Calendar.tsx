import PageMeta from "../components/common/PageMeta";
import CustomCalendar from "../components/CustomCalendar";

const Calendar: React.FC = () => {
  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />

      <div className="p-4">
        <CustomCalendar />
      </div>
    </>
  );
};

export default Calendar;
