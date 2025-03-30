import { useState } from "react";
import Label from "../form/Label";
import Radio from "../form/input/Radio";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { CheckLineIcon } from "../../icons";
import { useNavigate } from "react-router";
import { useModal } from "../../hooks/useModal";

const GuestPaymentOption = () => {
  const [creditCard, setCreditCard] = useState<string>("no");
  const [errors, setErrors] = useState<string>("");
  const [nameOnInvoice, setNameOnInvoice] = useState<string>("");
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();

  const handleSubmit = () => {
    // Reset errors before validation
    let newErrors: string = "";
    // Password validation
    if (!nameOnInvoice.trim()) {
      newErrors = "Name is required";
    }

    // Set errors if any
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors("");
    }

    // submit form
    console.log(nameOnInvoice, "form submitted");
    openModal();
  };

  const handleRadioChange = (value: string) => {
    setCreditCard(value);
  };
  return (
    <>
      <div className="col-span-12 space-y-5 w-1/2">
        <div className="flex flex-wrap justify-between">
          <Label htmlFor="group1">
            Can you charge credit cards at your property?
            <span className="text-error-500">*</span>
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
          <Label>
            Name on Invoice<span className="text-error-500">*</span>
          </Label>
          <Input
            type="text"
            id="input"
            placeholder="Enter name"
            value={nameOnInvoice}
            onChange={(e) => setNameOnInvoice(e.target.value)}
            error={Boolean(errors ?? false)}
            hint={errors}
          />
        </div>
      </div>
      <div className="flex justify-end mb-3">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>

          <Button onClick={handleSubmit}>Complete Registration</Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-[700px] p-6 lg:p-10"
      >
        <div className="flex flex-col items-center justify-center  p-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-400">
            <CheckLineIcon width={50} height={50} />
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-xl font-semibold text-gray-900">
            Property Listed
          </h2>

          {/* Description */}
          <p className="mt-2 text-center text-gray-500 text-sm max-w-sm">
            Congratulations! Your property has been listed. It can be found in
            the manage properties panel for final publishing.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Done for Now
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate("/create-listing-step-one")}
            >
              <span className="text-lg">+</span> Add Another
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GuestPaymentOption;
