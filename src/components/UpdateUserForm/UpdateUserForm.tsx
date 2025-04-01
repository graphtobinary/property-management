import { useEffect, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import Radio from "../form/input/Radio";
import { patchUser } from "../../api/User.api";
import { UpdateUserDataProps } from "../../interfaces";
import useCountries from "../../hooks/useCountries";

const INIT_FORM_ELEMENTS = {
  country: "",
  firstName: "",
  lastName: "",
  businessName: "",
  phoneNumber: "",
  approxNumOfListings: "",
  averagePrice: "",
};

const listingOptions = [
  { value: "10", label: "10+" },
  { value: "20", label: "20+" },
  { value: "50", label: "50+" },
];

const averagePriceOptions = [
  { value: "₹25-100", label: "₹25-100" },
  { value: "₹500-1000", label: "₹500-1000" },
  { value: "₹1000-2000", label: "₹1000-2000" },
];

export default function UpdateUserForm() {
  const [formValues, setFormValues] =
    useState<UpdateUserDataProps>(INIT_FORM_ELEMENTS);
  const [ownerType, setOwnerType] = useState("business");
  const [isLoading, setLoading] = useState(false);
  const { countries } = useCountries();

  // Error state
  const [errors, setErrors] = useState<UpdateUserDataProps>(INIT_FORM_ELEMENTS);

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  useEffect(() => {
    if (ownerType !== "business") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.businessName;
        return newErrors;
      });
      setFormValues((prev) => {
        const newErrors = { ...prev };
        delete newErrors.businessName;
        return newErrors;
      });
    }
  }, [ownerType]);

  // Validation function
  const validateForm = () => {
    const newErrors: Partial<Record<keyof typeof formValues, string>> = {};
    Object.keys(formValues).forEach((key) => {
      const value = formValues[key as keyof typeof formValues];
      if (!value || typeof value !== "string" || !value.trim()) {
        newErrors[key as keyof typeof errors] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = {
        isBussinessType: ownerType === "business",
        countryId: 1,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        ...(formValues?.businessName && {
          businessName: formValues?.businessName,
        }),
        phoneNumber: formValues.phoneNumber,
        approxNumOfListings: formValues.approxNumOfListings,
      };

      try {
        setLoading(true);
        await patchUser(formData);
        navigate("/");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const handleRadioChange = (value: string) => {
    setOwnerType(value);
  };

  return (
    <>
      <div className="flex flex-col flex-1">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col flex-1 gap-4 md:gap-6 ">
            <div className="bg-gray-100 p-5">
              <div className="md:w-1/2 mb-2">
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
              {countries.length > 0 && (
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
              )}
              <div>
                <Label>
                  Mobile Number<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="number"
                  placeholder="Enter mobile"
                  onChange={(e) => handleChange("phoneNumber", e.target.value)}
                  error={Boolean(errors?.phoneNumber ?? false)}
                  hint={errors.phoneNumber}
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
                  onChange={(value) =>
                    handleChange("approxNumOfListings", value)
                  }
                  className="dark:bg-dark-900"
                  error={Boolean(errors?.approxNumOfListings ?? false)}
                  hint={errors.approxNumOfListings}
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
            <Button
              type="submit"
              size="md"
              variant="primary"
              isLoading={isLoading}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
