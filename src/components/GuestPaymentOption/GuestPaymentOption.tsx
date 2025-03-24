import { useState } from "react";
import Label from "../form/Label";
import Radio from "../form/input/Radio";
import Input from "../form/input/InputField";

const GuestPaymentOption = () => {
  const [creditCard, setCreditCard] = useState<string>("");

  const handleRadioChange = (value: string) => {
    setCreditCard(value);
  };
  return (
    <>
      <div className="col-span-12 space-y-5 w-1/2">
        <div className="flex flex-wrap justify-between">
          <Label htmlFor="group1">
            Can you charge credit cards at your property?
          </Label>
          <div className="flex flex-wrap items-center gap-8">
            <Radio
              id="radio1"
              name="group1"
              value="yes"
              checked={creditCard === "yes"}
              onChange={handleRadioChange}
              label="Yes"
            />
            <Radio
              id="radio2"
              name="group1"
              value="no"
              checked={creditCard === "no"}
              onChange={handleRadioChange}
              label="No"
            />
          </div>
        </div>
        <span className=" text-base font-semibold text-gray-800 dark:text-white/90">
          What name should be on the invoice?
        </span>
        <div>
          <Label>Name on Invoice</Label>
          <Input type="text" id="input" placeholder="Enter name" />
        </div>
      </div>
    </>
  );
};

export default GuestPaymentOption;
