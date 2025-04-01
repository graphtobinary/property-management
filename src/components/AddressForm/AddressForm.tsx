import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import useCountries from "../../hooks/useCountries";

const INIT_FORM_ELEMENTS = {
  country: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  district: "",
  city: "",
  state: "",
  pincode: "",
};

interface ErrorTypes {
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  district?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const stateOptions = [
  { value: "delhi", label: "New Delhi" },
  { value: "bihar", label: "Bihar" },
  { value: "up", label: "Uttar Pradesh" },
];

export default function AddressForm() {
  const [formValues, setFormValues] = useState(INIT_FORM_ELEMENTS);
  const { countries } = useCountries();
  // Error state
  const [errors, setErrors] = useState<ErrorTypes>(INIT_FORM_ELEMENTS);

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  // Validation function
  const validateForm = () => {
    const newErrors: ErrorTypes = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key as keyof typeof formValues].trim()) {
        newErrors[key as keyof typeof errors] = "This field is required";
      }
    });

    // Pincode validation
    if (!/^\d{6}$/.test(formValues.pincode)) {
      newErrors.pincode = "Pincode must be a 6-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formValues);
      navigate("/create-listing-step-four");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col w-full md:w-1/2 gap-4 md:gap-6 ">
          <div>
            <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Select Country<span className="text-error-500">*</span>
            </Label>
            <Select
              options={countries}
              placeholder="Select Option"
              onChange={(value) => handleChange("country", value)}
              className="dark:bg-dark-900"
              error={Boolean(errors?.country ?? false)}
              hint={errors.country}
            />
          </div>
          <div>
            <Label>
              Address Line 1<span className="text-error-500">*</span>
            </Label>
            <TextArea
              value={formValues.addressLine1}
              onChange={(value) => handleChange("addressLine1", value)}
              rows={4}
              error={Boolean(errors?.addressLine1 ?? false)}
              hint={errors.addressLine1}
            />
          </div>
          <div>
            <Label>
              Address Line 2<span className="text-error-500">*</span>
            </Label>
            <TextArea
              value={formValues.addressLine2}
              onChange={(value) => handleChange("addressLine2", value)}
              rows={4}
              error={Boolean(errors?.addressLine2 ?? false)}
              hint={errors.addressLine2}
            />
          </div>
          <div>
            <Label htmlFor="input">
              Nearby Landmark<span className="text-error-500">*</span>
            </Label>
            <Input
              type="text"
              id="input"
              placeholder="Enter landmark"
              onChange={(e) => handleChange("landmark", e.target.value)}
              error={Boolean(errors?.landmark ?? false)}
              hint={errors.landmark}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div>
              <Label>
                District<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                id="input"
                placeholder="Enter district"
                onChange={(e) => handleChange("district", e.target.value)}
                error={Boolean(errors?.district ?? false)}
                hint={errors.district}
              />
            </div>
            <div>
              <Label>
                City<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                id="input"
                placeholder="Enter city"
                onChange={(e) => handleChange("city", e.target.value)}
                error={Boolean(errors?.city ?? false)}
                hint={errors.city}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            <div>
              <Label>
                State<span className="text-error-500">*</span>
              </Label>
              <Select
                options={stateOptions}
                placeholder="Select an option"
                onChange={(value) => handleChange("state", value)}
                className="dark:bg-dark-900"
                error={Boolean(errors?.state ?? false)}
                hint={errors.state}
              />
            </div>
            <div>
              <Label>
                Pin Code<span className="text-error-500">*</span>
              </Label>
              <Input
                type="number"
                id="input"
                placeholder="Enter pincode"
                onChange={(e) => handleChange("pincode", e.target.value)}
                error={Boolean(errors?.pincode ?? false)}
                hint={errors.pincode}
              />
            </div>
          </div>
          <small className="text-gray-500 dark:text-gray-400">
            Your address is only shared with guests after they've made a
            reservation.
          </small>
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
    </>
  );
}
