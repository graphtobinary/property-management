import { useState } from "react";
import Label from "../../components/form/Label";
import Radio from "../form/input/Radio";
import TimePicker from "../TimePicker/TimePicker";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

interface ErrorTypes {
  checkInFromTime?: string;
  checkInUntilTime?: string;
  checkOutFromTime?: string;
  checkOutUntilTime?: string;
}

const INIT_FORM_ELEMENTS = {
  checkInFromTime: "",
  checkInUntilTime: "",
  checkOutFromTime: "",
  checkOutUntilTime: "",
};

const HouseRulesForm = () => {
  const [smoking, setSmoking] = useState<string>("no");
  const [petFriendly, setPetFriendly] = useState<string>("no");
  const [specialNeeds, setSpecialNeeds] = useState<string>("no");
  const [checkInFromTime, setCheckInFromTime] = useState<string>("");
  const [checkInUntilTime, setCheckInUntilTime] = useState<string>("");
  const [checkOutFromTime, setCheckOutFromTime] = useState<string>("");
  const [checkOutUntilTime, setCheckOutUntilTime] = useState<string>("");
  // Error state
  const [errors, setErrors] = useState<ErrorTypes>(INIT_FORM_ELEMENTS);

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

  // Regex for time format validation (HH:MM AM/PM)
  const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

  // Validation function
  const validateForm = () => {
    const newErrors: Partial<ErrorTypes> = {};
    const timeFields = {
      checkInFromTime,
      checkInUntilTime,
      checkOutFromTime,
      checkOutUntilTime,
    };

    Object.entries(timeFields).forEach(([key, value]) => {
      if (!value || value.trim() === "--:-- --") {
        newErrors[key as keyof ErrorTypes] = "This field is required";
      } else if (!timeFormatRegex.test(value)) {
        newErrors[key as keyof ErrorTypes] =
          "Invalid time format (e.g., 03:00 AM)";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully", {
        checkInFromTime,
        checkInUntilTime,
        checkOutFromTime,
        checkOutUntilTime,
      });
      navigate("/create-listing-step-eleven");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4 w-full md:w-1/2 ">
        <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
          What is the checkin time
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label htmlFor="tm">
              From<span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkInFromTime}
              onTimeChange={setCheckInFromTime}
              error={Boolean(errors?.checkInFromTime ?? false)}
            />
          </div>
          <div>
            <Label htmlFor="tm">
              Until<span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkInUntilTime}
              onTimeChange={setCheckInUntilTime}
              error={Boolean(errors?.checkInUntilTime ?? false)}
            />
          </div>
        </div>
        <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
          What is the checkout time
        </span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label htmlFor="tm">
              From<span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkOutFromTime}
              onTimeChange={setCheckOutFromTime}
              error={Boolean(errors?.checkOutFromTime ?? false)}
            />
          </div>
          <div>
            <Label htmlFor="tm">
              Until<span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkOutUntilTime}
              onTimeChange={setCheckOutUntilTime}
              error={Boolean(errors?.checkOutUntilTime ?? false)}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <Label htmlFor="group1">
            Smoking<span className="text-error-500">*</span>
          </Label>
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
          <Label htmlFor="group1">
            Pet Friendly<span className="text-error-500">*</span>
          </Label>
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
          <Label htmlFor="group1">
            Special Needs Accessibility<span className="text-error-500">*</span>
          </Label>
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
      <div className="flex justify-end mb-3">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Button onClick={handleSubmit}>Next</Button>
        </div>
      </div>
    </div>
  );
};

export default HouseRulesForm;
