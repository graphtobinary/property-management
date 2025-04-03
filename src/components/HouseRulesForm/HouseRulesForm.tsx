import { useCallback, useEffect, useState } from "react";
import Label from "../../components/form/Label";
import Radio from "../form/input/Radio";
import TimePicker from "../TimePicker/TimePicker";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import {
  convertTo12HourFormat,
  convertTo24HourFormat,
} from "../../utils/utils";
import { useListingStore } from "../../store/listing.store";

interface ErrorTypes {
  checkinTime?: string;
  checkoutTime?: string;
}

const INIT_FORM_ELEMENTS = {
  checkinTime: "",
  checkoutTime: "",
};

const HouseRulesForm = () => {
  const [smoking, setSmoking] = useState<boolean>(false);
  const [petFriendly, setPetFriendly] = useState<boolean>(false);
  const [specialNeeds, setSpecialNeeds] = useState<boolean>(false);
  const [checkinTime, setCheckInTime] = useState<string>("");
  const [checkoutTime, setCheckOutTime] = useState<string>("");
  const { listingFormData, setListingFormData } = useListingStore();
  // Error state
  const [errors, setErrors] = useState<ErrorTypes>(INIT_FORM_ELEMENTS);

  const handleRadioChange = (type: string, value: boolean) => {
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
  // const timeFormatRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors: Partial<ErrorTypes> = {};
    const timeFields = {
      checkinTime: checkinTime,
      checkoutTime: checkoutTime,
    };

    Object.entries(timeFields).forEach(([key, value]) => {
      if (!value || value.trim() === "--:-- --") {
        newErrors[key as keyof ErrorTypes] = "This field is required";
      }

      // else if (!timeFormatRegex.test(value)) {
      //   newErrors[key as keyof ErrorTypes] =
      //     "Invalid time format (e.g., 03:00 AM)";
      // }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }, [checkinTime, checkoutTime]);

  const navigate = useNavigate();
  const handleSubmit = () => {
    if (validateForm()) {
      setListingFormData({
        ...listingFormData,
        checkinTime: convertTo24HourFormat(checkinTime),
        checkoutTime: convertTo24HourFormat(checkoutTime),
        petAllowed: petFriendly,
        smokingAllowed: smoking,
        needsAccessibility: specialNeeds,
      });
      navigate("/create-listing-step-eleven");
    }
  };

  useEffect(() => {
    if (listingFormData?.checkinTime) {
      setCheckInTime(convertTo12HourFormat(listingFormData.checkinTime));
    }
    if (listingFormData?.checkoutTime) {
      setCheckOutTime(convertTo12HourFormat(listingFormData.checkoutTime));
    }
    if (listingFormData?.smokingAllowed) {
      setSmoking(listingFormData.smokingAllowed);
    }
    if (listingFormData?.petAllowed) {
      setPetFriendly(listingFormData.petAllowed);
    }
    if (listingFormData?.needsAccessibility) {
      setSpecialNeeds(listingFormData.needsAccessibility);
    }
  }, [listingFormData]);

  console.log(errors?.checkinTime, "errors?.checkInTime");
  return (
    <div className="space-y-4">
      <div className="space-y-4 w-full md:w-1/2 ">
        {/* <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
          What is the checkin time
        </span> */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
          <div>
            <Label htmlFor="tm">
              What is the checkin time
              <span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkinTime}
              onTimeChange={setCheckInTime}
              error={Boolean(errors?.checkinTime ?? false)}
            />
          </div>
          <div>
            <Label htmlFor="tm">
              What is the checkout time<span className="text-error-500">*</span>
            </Label>
            <TimePicker
              selectedTime={checkoutTime}
              onTimeChange={setCheckOutTime}
              error={Boolean(errors?.checkoutTime ?? false)}
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
              value={"true"}
              checked={smoking}
              onChange={(e) => handleRadioChange("smoking", JSON.parse(e))}
              label="Yes"
            />
            <Radio
              id="radio2"
              name="group1"
              value={"false"}
              checked={!smoking}
              onChange={(e) => handleRadioChange("smoking", JSON.parse(e))}
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
              value={"true"}
              checked={petFriendly}
              onChange={(e) => handleRadioChange("petFriendly", JSON.parse(e))}
              label="Yes"
            />
            <Radio
              id="radio4"
              name="group2"
              value={"false"}
              checked={!petFriendly}
              onChange={(e) => handleRadioChange("petFriendly", JSON.parse(e))}
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
              value={"true"}
              checked={specialNeeds}
              onChange={(e) => handleRadioChange("specialNeeds", JSON.parse(e))}
              label="Yes"
            />
            <Radio
              id="radio6"
              name="group3"
              value={"false"}
              checked={!specialNeeds}
              onChange={(e) => handleRadioChange("specialNeeds", JSON.parse(e))}
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
