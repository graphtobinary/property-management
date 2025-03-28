import { useState } from "react";
import { MinusIcon, Plus, TrashBinIcon } from "../../icons";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";
import { useNavigate } from "react-router";

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

interface ErrorTypes {
  propertyType?: string;
  furnishingType?: string;
  propertySize?: string;
}

interface Room {
  id: number;
  type: string;
  quantity: number;
}

const INIT_FORM_ELEMENTS = {
  propertyType: "",
  furnishingType: "",
  propertySize: "",
};

const DynamicRoomSelector = () => {
  const [formValues, setFormValues] = useState(INIT_FORM_ELEMENTS);

  // Error state
  const [errors, setErrors] = useState<ErrorTypes>(INIT_FORM_ELEMENTS);
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

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  // Validation function
  const validateForm = () => {
    const newErrors: ErrorTypes = {};
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof typeof formValues];

      if (typeof value === "string" && !value.trim()) {
        newErrors[key as keyof ErrorTypes] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formValues);
      navigate("/create-listing-step-eight");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full md:w-1/2 space-y-4">
        <div>
          <Label>
            Select property type<span className="text-error-500">*</span>
          </Label>
          <Select
            options={options}
            placeholder="Select Option"
            onChange={(value) => handleChange("propertyType", value)}
            className="dark:bg-dark-900"
            error={Boolean(errors?.propertyType ?? false)}
            hint={errors.propertyType}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label>
              Select furnishing type<span className="text-error-500">*</span>
            </Label>
            <Select
              options={furnishingTypeOptions}
              placeholder="Select an option"
              onChange={(value) => handleChange("furnishingType", value)}
              error={Boolean(errors?.furnishingType ?? false)}
              hint={errors.furnishingType}
            />
          </div>

          <div>
            <Label>
              How big is this property?<span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="100"
                type="number"
                className="pr-[62px]"
                onChange={(e) => handleChange("propertySize", e.target.value)}
                error={Boolean(errors?.propertySize ?? false)}
                hint={errors.propertySize}
              />
              <span className="absolute right-0 top-0  border-l border-gray-200 px-3.5 py-2.5 text-gray-500 dark:border-gray-800 dark:text-gray-400">
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
      <div className="flex justify-end mb-3 w-full">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Button type="submit" variant="primary">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default DynamicRoomSelector;
