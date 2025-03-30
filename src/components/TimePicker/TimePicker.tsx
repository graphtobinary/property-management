import React, { useState, useEffect, useRef } from "react";

interface TimePickerProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  error?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  selectedTime,
  onTimeChange,
  error = false,
}) => {
  const [selectedHour, setSelectedHour] = useState<string>("--");
  const [selectedMinute, setSelectedMinute] = useState<string>("--");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("--");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pickerRef = useRef<HTMLDivElement>(null); // Reference to dropdown

  useEffect(() => {
    onTimeChange(`${selectedHour}:${selectedMinute} ${selectedPeriod}`);
  }, [selectedHour, selectedMinute, selectedPeriod, onTimeChange]);

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-64" ref={pickerRef}>
      <input
        type="text"
        readOnly
        className={` ${
          error &&
          "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800"
        } w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer`}
        value={selectedTime}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className="absolute bg-white shadow-lg border rounded-lg mt-2 w-full p-2 flex space-x-2 overflow-hidden h-[200px] z-10">
          {/* Hours */}
          <div className="w-1/3 overflow-y-auto h-full">
            {Array.from({ length: 12 }, (_, i) =>
              (i + 1).toString().padStart(2, "0")
            ).map((hour) => (
              <div
                key={hour}
                className={`p-2 text-center cursor-pointer ${
                  selectedHour === hour
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </div>
            ))}
          </div>

          {/* Minutes */}
          <div className="w-1/3 overflow-y-auto h-full">
            {Array.from({ length: 60 }, (_, i) =>
              i.toString().padStart(2, "0")
            ).map((minute) => (
              <div
                key={minute}
                className={`p-2 text-center cursor-pointer ${
                  selectedMinute === minute
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute}
              </div>
            ))}
          </div>

          {/* AM/PM */}
          <div className="w-1/3 overflow-y-auto h-full">
            {["AM", "PM"].map((period) => (
              <div
                key={period}
                className={`p-2 text-center cursor-pointer ${
                  selectedPeriod === period
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
