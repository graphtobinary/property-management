import { useCallback, useEffect, useState } from "react";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import useCountries from "../../hooks/useCountries";
import { AddressFormProps } from "../../interfaces";
import { useListingStore } from "../../store/listing.store";

const INIT_FORM_ELEMENTS = {
  countryId: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  // district: "",
  city: "",
  state: "",
  zipCode: "",
};

export default function AddressForm() {
  const [formValues, setFormValues] = useState(INIT_FORM_ELEMENTS);
  const { countries } = useCountries();
  // Error state
  const [errors, setErrors] = useState<AddressFormProps>(INIT_FORM_ELEMENTS);
  const { listingFormData, setListingFormData } = useListingStore();

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear error when typing
  };

  useEffect(() => {
    if (listingFormData.address) {
      setFormValues((prev) => ({
        ...prev,
        countryId: listingFormData.address.countryId,
      }));
      setFormValues((prev) => ({
        ...prev,
        addressLine1: listingFormData.address.addressLine1,
      }));
      setFormValues((prev) => ({
        ...prev,
        addressLine2: listingFormData.address.addressLine2,
      }));
      setFormValues((prev) => ({
        ...prev,
        landmark: listingFormData.address.landmark,
      }));
      setFormValues((prev) => ({
        ...prev,
        city: listingFormData.address.city,
      }));
      setFormValues((prev) => ({
        ...prev,
        zipCode: listingFormData.address.zipCode,
      }));
      setFormValues((prev) => ({
        ...prev,
        state: listingFormData.address.state,
      }));
    }
  }, [listingFormData]);

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors: AddressFormProps = {};
    Object.keys(formValues).forEach((key) => {
      if (!formValues[key as keyof typeof formValues].trim()) {
        newErrors[key as keyof typeof errors] = "This field is required";
      }
    });

    // Pincode validation
    if (!/^\d{6}$/.test(formValues.zipCode)) {
      newErrors.zipCode = "Pincode must be a 6-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  }, [formValues]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setListingFormData({
        ...listingFormData,
        address: { ...listingFormData.address, ...formValues },
      });
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
              onChange={(value) => handleChange("countryId", value)}
              defaultValue={listingFormData.address.countryId ?? ""}
              className="dark:bg-dark-900"
              error={Boolean(errors?.countryId ?? false)}
              hint={errors.countryId}
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
              value={formValues.landmark ?? ""}
              placeholder="Enter landmark"
              onChange={(e) => handleChange("landmark", e.target.value)}
              error={Boolean(errors?.landmark ?? false)}
              hint={errors.landmark}
            />
          </div>
          <div>
            {/* <div>
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
            </div> */}
            <div>
              <Label>
                City<span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                id="input"
                placeholder="Enter city"
                value={formValues.city ?? ""}
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
              {/* <Select
                options={stateOptions}
                placeholder="Select an option"
                onChange={(value) => handleChange("state", value)}
                className="dark:bg-dark-900"
                error={Boolean(errors?.state ?? false)}
                hint={errors.state}
              /> */}
              <Input
                type="text"
                id="input"
                placeholder="Enter State"
                value={formValues.state ?? ""}
                onChange={(e) => handleChange("state", e.target.value)}
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
                value={formValues.zipCode ?? ""}
                onChange={(e) => handleChange("zipCode", e.target.value)}
                error={Boolean(errors?.zipCode ?? false)}
                hint={errors.zipCode}
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
