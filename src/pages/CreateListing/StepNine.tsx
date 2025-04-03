import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useEffect, useState } from "react";
import { useListingStore } from "../../store/listing.store";

const StepNine: React.FC = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState<number>();
  const [errors, setErrors] = useState<string>("");
  const { listingFormData, setListingFormData } = useListingStore();

  useEffect(() => {
    if (listingFormData?.pricePerNight) {
      setPrice(listingFormData.pricePerNight);
    }
  }, [listingFormData]);

  const handleSubmit = () => {
    // Reset errors before validation
    let newErrors: string = "";
    // Password validation
    if (!price) {
      newErrors = "Price is required";
    }

    // Set errors if any
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // submit form
    setListingFormData({
      ...listingFormData,
      pricePerNight: Number(price),
    });
    navigate("/create-listing-step-ten");
  };

  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 9
            </h3>
            <Button size="sm" variant="outline" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
          <div className="flex flex-col w-2/3">
            <span className="text-lg pb-1 text-gray-500 dark:text-gray-400">
              Tell us about your place
            </span>

            <span className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              In this step, you'll add some of the amenities your place offers,
              plus 5 or more photos. Then you'll create a title and description.
            </span>
          </div>
          <div className="flex flex-col ">
            <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
              Now, set your price
            </span>
            <div className=" gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="space-y-4 w-full md:w-1/2 ">
                  <div>
                    <Label>
                      Price per night<span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        placeholder="100"
                        type="number"
                        className="pr-[62px]"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        error={Boolean(errors ?? false)}
                        hint={errors}
                      />
                      <small className="absolute right-0 top-0 border-l border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                        The guest will pay ₹{Math.round((price || 0) + ((price || 0) * 0.1))} after taxes
                      </small>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
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
      </>
    </>
  );
};

export default StepNine;
