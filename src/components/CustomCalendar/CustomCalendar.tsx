import DatePicker from "../DatePicker";

export default function CustomCalendar() {
  return (
    <div className="w-full overflow-hidden mb-5 flex justify-end">
      <div className="w-full overflow-hidden mb-5 relative">
        <DatePicker labelFormat={"MMMM yyyy"} color={"#F26724"} endDate={30} />
      </div>
    </div>
  );
}
