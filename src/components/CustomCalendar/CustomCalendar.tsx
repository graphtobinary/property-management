import DatePicker from "../DatePicker";

export default function CustomCalendar() {
  const selectedDay = (day: Date) => {
    console.log(day);
  };
  return (
    <div className="w-full overflow-hidden mb-5 flex justify-end">
      <div className="w-full overflow-hidden mb-5 relative">
        <DatePicker
          getSelectedDay={selectedDay}
          labelFormat={"MMMM yyyy"}
          color={"#F26724"}
          endDate={30}
        />
      </div>
    </div>
  );
}
