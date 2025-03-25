import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";

import TextArea from "../form/input/TextArea";

export default function AddressForm() {
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const countryOptions = [
    { value: "india", label: "India" },
    { value: "uae", label: "UAE" },
    { value: "usa", label: "USA" },
  ];
  const stateOptions = [
    { value: "delhi", label: "New Delhi" },
    { value: "bihar", label: "Bihar" },
    { value: "up", label: "Uttar Pradesh" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Select Country
          </Label>
          <Select
            options={countryOptions}
            placeholder="Select Option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>Address Line 1</Label>
          <TextArea
            value={addressLine1}
            onChange={(value) => setAddressLine1(value)}
            rows={4}
          />
        </div>
        <div>
          <Label>Address Line 2</Label>
          <TextArea
            value={addressLine2}
            onChange={(value) => setAddressLine2(value)}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="input">Nearby Landmark</Label>
          <Input type="text" id="input" placeholder="Enter landmark" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label>District</Label>
            <Input type="text" id="input" placeholder="Enter district" />
          </div>
          <div>
            <Label>City</Label>
            <Input type="text" id="input" placeholder="Enter city" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          <div>
            <Label>State</Label>
            <Select
              options={stateOptions}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Pin Code</Label>
            <Input type="number" id="input" placeholder="Enter pincode" />
          </div>
        </div>
        <small className="text-gray-500 dark:text-gray-400">
          Your address is only shared with guests after they've made a
          reservation.
        </small>
      </div>
    </>
  );
}
