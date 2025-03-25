import { useState } from "react";
import { MinusIcon, Plus, TrashBinIcon } from "../../icons";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";

const roomOptions = [
  "Master Bedroom",
  "Bedroom",
  "Bathroom",
  "Kitchen",
  "Living Room",
  "Dining Room",
  "Majlis",
  "Storage",
  "Maid Room",
];

const options = [
  { value: "1 BHK", label: "1 BHK" },
  { value: "2 BHK", label: "2 BHK" },
  { value: "3 BHK", label: "3 BHK" },
];

const furnishingTypeOptions = [
  { value: "fully furnished", label: "Fully Furnished" },
  { value: "semi furnished", label: "Semi Furnished" },
  { value: "not furnished", label: "Not Furnished" },
];

interface Room {
  id: number;
  type: string;
  quantity: number;
}

const DynamicRoomSelector = () => {
  const [rooms, setRooms] = useState<Room[]>([
    { id: Date.now(), type: "Master Bedroom", quantity: 4 },
  ]);

  const addRoom = () => {
    setRooms([
      ...rooms,
      { id: Date.now(), type: "Bedroom", quantity: 1 }, // Default new entry
    ]);
  };

  const updateRoom = (id: number, type: string) => {
    setRooms(rooms.map((room) => (room.id === id ? { ...room, type } : room)));
  };

  const updateQuantity = (id: number, change: number) => {
    setRooms(
      rooms.map((room) =>
        room.id === id
          ? { ...room, quantity: Math.max(1, room.quantity + change) }
          : room
      )
    );
  };

  const removeRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="space-y-4 w-full md:w-1/2 ">
      <div>
        <Label>Select property type</Label>
        <Select
          options={options}
          placeholder="Select Option"
          onChange={handleSelectChange}
          className="dark:bg-dark-900"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div>
          <Label>Select furnishing type</Label>
          <Select
            options={furnishingTypeOptions}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>

        <div>
          <Label>How big is this property?</Label>
          <div className="relative">
            <Input placeholder="100" type="text" className="pr-[62px]" />
            <span className="absolute right-0 top-1/2 -translate-y-1/2 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              sq mtr
            </span>
          </div>
        </div>
      </div>
      {rooms.map((room) => (
        <div
          key={room.id}
          className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
        >
          {/* Dropdown */}
          <div className="relative flex">
            <select
              // className="p-3 bg-gray-300 rounded-md border-none w-1/2"
              className={`h-11 appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-primaryLight focus:outline-hidden focus:ring-3 focus:ring-primary/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-500 `}
              value={room.type}
              onChange={(e) => updateRoom(room.id, e.target.value)}
            >
              {roomOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg
                className="stroke-current"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                  stroke=""
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </div>

          {/* Counter */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
              onClick={() => updateQuantity(room.id, -1)}
              disabled={room.quantity <= 1}
            >
              <MinusIcon />
            </button>
            <span className="text-lg font-semibold">{room.quantity}</span>
            <button
              className="p-2 bg-gray-300 rounded-md"
              onClick={() => updateQuantity(room.id, 1)}
            >
              <Plus />
            </button>
          </div>

          {/* Remove Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => removeRoom(room.id)}
          >
            <TrashBinIcon />
          </Button>
        </div>
      ))}

      {/* Add Room Button */}
      <div className="w-full p-3 flex justify-center">
        <Button size="md" variant="primary" onClick={addRoom}>
          Add Room
        </Button>
      </div>
    </div>
  );
};

export default DynamicRoomSelector;
