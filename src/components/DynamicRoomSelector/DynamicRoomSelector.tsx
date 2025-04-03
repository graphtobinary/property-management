import { useEffect, useState } from "react";
import { MinusIcon, Plus, TrashBinIcon } from "../../icons";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import Select from "../form/Select";
import Input from "../form/input/InputField";
import { useNavigate } from "react-router";
import { Option, PropertyTypeFormProps, Room } from "../../interfaces";
import {
  GetBhkTypes,
  getFurnishingTypes,
  getRoomTypes,
} from "../../api/Listing.api";
import { ListTypeProps } from "../../interfaces/listing";
import { useListingStore } from "../../store/listing.store";

const INIT_FORM_ELEMENTS = {
  propertyType: "",
  furnishingType: "",
  propertySize: 0,
};

const DynamicRoomSelector = () => {
  const [formValues, setFormValues] = useState(INIT_FORM_ELEMENTS);
  const [bhkTypeList, setBhkTypeList] = useState<Option[]>([]);
  const [furnishingTypeList, setFurnishingTypeList] = useState<Option[]>([]);
  const [roomTypeList, setRoomTypeList] = useState<Option[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const { listingFormData, setListingFormData } = useListingStore();

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const { bhkTypes } = (await GetBhkTypes()) as {
        bhkTypes: ListTypeProps[];
      };
      if (bhkTypes.length) {
        setBhkTypeList(
          bhkTypes.map((item) => {
            return { value: item.id, label: item.name };
          })
        );
      }
      const { furnishingTypes } = (await getFurnishingTypes()) as {
        furnishingTypes: ListTypeProps[];
      };
      setFurnishingTypeList(
        furnishingTypes.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
      const { roomTypes } = (await getRoomTypes()) as {
        roomTypes: ListTypeProps[];
      };
      setRoomTypeList(
        roomTypes.map((item) => {
          return { value: item.id, label: item.name };
        })
      );
      setRooms([
        { id: Date.now(), roomTypeId: roomTypes[0].id, quantity: 1 }, // Default new entry
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  // Error state
  const [errors, setErrors] = useState<PropertyTypeFormProps>({
    propertyType: "",
    furnishingType: "",
    propertySize: "",
  });

  const addRoom = () => {
    setRooms([
      ...rooms,
      { id: Date.now(), roomTypeId: roomTypeList[0].value, quantity: 1 }, // Default new entry
    ]);
  };

  const updateRoom = (id: number, roomTypeId: string) => {
    setRooms(
      rooms.map((room) => (room.id === id ? { ...room, roomTypeId } : room))
    );
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
    const newErrors: PropertyTypeFormProps = {};
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof typeof formValues];

      if (typeof value === "string" && !value.trim()) {
        newErrors[key as keyof PropertyTypeFormProps] =
          "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  useEffect(() => {
    if (listingFormData.bhkTypeId) {
      setFormValues((prev) => {
        return { ...prev, propertyType: listingFormData.bhkTypeId };
      });
    }
    if (listingFormData.furnishingTypeId) {
      setFormValues((prev) => {
        return { ...prev, furnishingType: listingFormData.furnishingTypeId };
      });
    }
    if (listingFormData.areaInSqMeter)
      setFormValues((prev) => {
        return { ...prev, propertySize: listingFormData.areaInSqMeter };
      });
  }, [listingFormData]);

  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setListingFormData({
        ...listingFormData,
        roomDetails: rooms.map((item) => {
          return {
            roomTypeId: item.roomTypeId,
            quantity: item.quantity,
          };
        }),
        bhkTypeId: formValues.propertyType,
        furnishingTypeId: formValues.furnishingType,
        areaInSqMeter: Number(formValues.propertySize),
      });
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
          {!!bhkTypeList.length && (
            <Select
              options={bhkTypeList}
              placeholder="Select Option"
              defaultValue={listingFormData.bhkTypeId ?? ""}
              onChange={(value) => handleChange("propertyType", value)}
              className="dark:bg-dark-900"
              error={Boolean(errors?.propertyType ?? false)}
              hint={errors.propertyType}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label>
              Select furnishing type<span className="text-error-500">*</span>
            </Label>
            <Select
              options={furnishingTypeList}
              placeholder="Select an option"
              defaultValue={listingFormData.furnishingTypeId ?? ""}
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
                value={formValues.propertySize ?? ""}
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
                value={room.roomTypeId}
                onChange={(e) => updateRoom(room.id, e.target.value)}
              >
                {roomTypeList?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
                type="button"
              >
                <MinusIcon />
              </button>
              <span className="text-lg font-semibold">{room.quantity}</span>
              <button
                className="p-2 bg-gray-300 rounded-md"
                onClick={() => updateQuantity(room.id, 1)}
                type="button"
              >
                <Plus />
              </button>
            </div>

            {/* Remove Button */}
            <Button
              size="sm"
              variant="primary"
              type="button"
              onClick={() => removeRoom(room.id)}
            >
              <TrashBinIcon />
            </Button>
          </div>
        ))}

        {/* Add Room Button */}
        <div className="w-full p-3 flex justify-center">
          <Button size="md" variant="primary" type="button" onClick={addRoom}>
            Add Room
          </Button>
        </div>
      </div>
      <div className="flex justify-end mb-3 w-full">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => navigate(-1)}
          >
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
