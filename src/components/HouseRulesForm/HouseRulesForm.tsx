import { useState } from "react";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { TimeIcon } from "../../icons";
import Radio from "../form/input/Radio";

const HouseRulesForm = () => {
  const [smoking, setSmoking] = useState<string>("");
  const [petFriendly, setPetFriendly] = useState<string>("");
  const [specialNeeds, setSpecialNeeds] = useState<string>("");

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
    <div className="space-y-4 w-1/2 ">
      <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
        What is the checkin time
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div>
          <Label htmlFor="tm">From</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Until</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
      </div>
      <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
        What is the checkout time
      </span>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
        <div>
          <Label htmlFor="tm">From</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Until</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6" />
            </span>
          </div>
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
