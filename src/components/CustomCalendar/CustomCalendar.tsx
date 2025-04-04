// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DatePicker from "react-horizontal-datepicker";
// import "./Calender.css";

export default function CustomCalendar() {
  const selectedDay = (val: string) => {
    console.log(val);
  };
  return (
    <div className="w-full overflow-hidden mb-5">
      <DatePicker
        getSelectedDay={selectedDay}
        labelFormat={"MMMM"}
        color={"#F26724"}
        enableDaysBefore={2}
      />
    </div>
  );
}
