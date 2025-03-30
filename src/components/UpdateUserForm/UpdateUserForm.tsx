import { useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import Radio from "../form/input/Radio";

const INIT_FORM_ELEMENTS = {
  country: "",
  firstName: "",
  lastName: "",
  businessName: "",
  mobile: "",
  listingCount: "",
  averagePrice: "",
};

interface ErrorTypes {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  country?: string;
  mobile?: string;
  listingCount?: string;
  averagePrice?: string;
}

const countryOptions = [
  { value: "india", label: "India" },
  { value: "uae", label: "UAE" },
  { value: "usa", label: "USA" },
];
const listingOptions = [
  { value: "10+", label: "10+" },
  { value: "20+", label: "20+" },
  { value: "50+", label: "50+" },
];

const averagePriceOptions = [
  { value: "₹25-100", label: "₹25-100" },
  { value: "₹500-1000", label: "₹500-1000" },
  { value: "₹1000-2000", label: "₹1000-2000" },
];

export default function UpdateUserForm() {
  const [formValues, setFormValues] = useState(INIT_FORM_ELEMENTS);
  const [ownerType, setOwnerType] = useState("business");

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

    // Mobile validation
    // if (!/^\d{12}$/.test(formValues.mobile)) {
    //   newErrors.mobile = "Pincode must be a 12-digit number";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully", formValues);
      navigate("/");
    }
  };

  const handleRadioChange = (value: string) => {
    setOwnerType(value);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="w-full pt-10 mx-auto"></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1 gap-4 md:gap-6 ">
            <div className="bg-gray-100 p-5">
              <div className="w-1/2 mb-2">
                <span className="text-gray-400 text-sm font-normal leading-0">
                  Are you a business managing multiple properties or the
                  property owner
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-8">
                <Radio
                  id="radio1"
                  name="group1"
                  value="business"
                  checked={ownerType === "business"}
                  onChange={(value) => handleRadioChange(value)}
                  label="We're a Business"
                />
                <Radio
                  id="radio2"
                  name="group1"
                  value="owner"
                  checked={ownerType === "owner"}
                  onChange={(value) => handleRadioChange(value)}
                  label="I'm Property Owner"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              <div>
                <Label>
                  First Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="John"
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  error={Boolean(errors?.firstName ?? false)}
                  hint={errors.firstName}
                />
              </div>
              <div>
                <Label>
                  Last Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  error={Boolean(errors?.lastName ?? false)}
                  hint={errors.lastName}
                />
              </div>
            </div>
            {ownerType === "business" && (
              <div>
                <Label>
                  Business Name<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  placeholder="Business Name"
                  onChange={(e) => handleChange("businessName", e.target.value)}
                  error={Boolean(errors?.businessName ?? false)}
                  hint={errors.businessName}
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              <div>
                <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Select Country<span className="text-error-500">*</span>
                </Label>
                <Select
                  options={countryOptions}
                  placeholder="Select Option"
                  onChange={(value) => handleChange("country", value)}
                  className="dark:bg-dark-900"
                  error={Boolean(errors?.country ?? false)}
                  hint={errors.country}
                />
              </div>
              <div>
                <Label>
                  Mobile Number<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Enter mobile"
                  onChange={(e) => handleChange("mobile", e.target.value)}
                  error={Boolean(errors?.mobile ?? false)}
                  hint={errors.mobile}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              <div>
                <Label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  How many listings do you have
                  <span className="text-error-500">*</span>
                </Label>
                <Select
                  options={listingOptions}
                  placeholder="Select Option"
                  onChange={(value) => handleChange("listingCount", value)}
                  className="dark:bg-dark-900"
                  error={Boolean(errors?.listingCount ?? false)}
                  hint={errors.listingCount}
                />
              </div>
              <div>
                <Label>
                  Avg. nightly rate<span className="text-error-500">*</span>
                </Label>
                <Select
                  options={averagePriceOptions}
                  placeholder="Select Option"
                  onChange={(value) => handleChange("averagePrice", value)}
                  className="dark:bg-dark-900"
                  error={Boolean(errors?.averagePrice ?? false)}
                  hint={errors.averagePrice}
                />
              </div>
            </div>
          </div>
          <div className="flex my-5 w-full">
            <Button type="submit" size="md" variant="primary">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
