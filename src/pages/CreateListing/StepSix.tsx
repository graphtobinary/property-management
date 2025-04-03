import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import TextArea from "../../components/form/input/TextArea";
import { useEffect, useState } from "react";
import { useListingStore } from "../../store/listing.store";

const StepSix: React.FC = () => {
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<string>("");
  const navigate = useNavigate();
  const maxLength = 500;
  const { listingFormData, setListingFormData } = useListingStore();

  useEffect(() => {
    if (listingFormData.description)
      setDescription(listingFormData.description);
  }, [listingFormData]);

  const handleSubmit = () => {
    // Reset errors before validation
    let newErrors: string = "";
    // Password validation
    if (!description.trim()) {
      newErrors = "Description is required";
    }

    // Set errors if any
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // submit form
    setListingFormData({
      ...listingFormData,
      description: description,
    });
    navigate("/create-listing-step-seven");
  };

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 6
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
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </span>
          </div>
          <div className="flex flex-col ">
            <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
              Create your description<span className="text-error-500">*</span>
            </span>
            <div className="w-full md:w-1/2 gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="space-y-6">
                  <div>
                    <TextArea
                      value={description}
                      onChange={(value) => setDescription(value)}
                      maxLength={maxLength}
                      rows={4}
                      placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                      error={Boolean(errors ?? false)}
                      hint={errors}
                    />
                    {/* Progress */}
                    <p className="text-gray-500 text-sm">
                      {description.length}/{maxLength}
                    </p>
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

export default StepSix;
