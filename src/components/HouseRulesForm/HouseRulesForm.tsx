import { useState } from "react";
import Label from "../../components/form/Label";
import Radio from "../form/input/Radio";
import TimePicker from "../TimePicker/TimePicker";

const HouseRulesForm = () => {
  const [smoking, setSmoking] = useState<string>("");
  const [petFriendly, setPetFriendly] = useState<string>("");
  const [specialNeeds, setSpecialNeeds] = useState<string>("");
  const [checkInFromTime, setCheckInFromTime] = useState<string>("");
  const [checkInUntilTime, setCheckInUntilTime] = useState<string>("");
  const [checkOutFromTime, setCheckOutFromTime] = useState<string>("");
  const [checkOutUntilTime, setCheckOutUntilTime] = useState<string>("");

  const handleRadioChange = (type: string, value: string) => {
    if (type === "smoking") {
      setSmoking(value);
    }
    if (type === "petFriendly") {
      setPetFriendly(value);
    }
    if (type === "specialNeeds") {
      setSpecialNeeds(value);
    }
  };
  return (
    <div className="space-y-4 w-full md:w-1/2 ">
      <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
        What is the checkin time
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div>
          <Label htmlFor="tm">From</Label>
          <TimePicker
            selectedTime={checkInFromTime}
            onTimeChange={setCheckInFromTime}
          />
        </div>
        <div>
          <Label htmlFor="tm">Until</Label>
          <TimePicker
            selectedTime={checkInUntilTime}
            onTimeChange={setCheckInUntilTime}
          />
        </div>
      </div>
      <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
        What is the checkout time
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div>
          <Label htmlFor="tm">From</Label>
          <TimePicker
            selectedTime={checkOutFromTime}
            onTimeChange={setCheckOutFromTime}
          />
        </div>
        <div>
          <Label htmlFor="tm">Until</Label>
          <TimePicker
            selectedTime={checkOutUntilTime}
            onTimeChange={setCheckOutUntilTime}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <Label htmlFor="group1">Smoking</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio1"
            name="group1"
            value="yes"
            checked={smoking === "yes"}
            onChange={(e) => handleRadioChange("smoking", e)}
            label="Yes"
          />
          <Radio
            id="radio2"
            name="group1"
            value="no"
            checked={smoking === "no"}
            onChange={(e) => handleRadioChange("smoking", e)}
            label="No"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <Label htmlFor="group1">Pet Friendly</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio3"
            name="group2"
            value="yes"
            checked={petFriendly === "yes"}
            onChange={(e) => handleRadioChange("petFriendly", e)}
            label="Yes"
          />
          <Radio
            id="radio4"
            name="group2"
            value="no"
            checked={petFriendly === "no"}
            onChange={(e) => handleRadioChange("petFriendly", e)}
            label="No"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <Label htmlFor="group1">Special Needs Accessibility</Label>
        <div className="flex flex-wrap items-center gap-8">
          <Radio
            id="radio5"
            name="group3"
            value="yes"
            checked={specialNeeds === "yes"}
            onChange={(e) => handleRadioChange("specialNeeds", e)}
            label="Yes"
          />
          <Radio
            id="radio6"
            name="group3"
            value="no"
            checked={specialNeeds === "no"}
            onChange={(e) => handleRadioChange("specialNeeds", e)}
            label="No"
          />
        </div>
      </div>
    </div>
  );
};

export default HouseRulesForm;
