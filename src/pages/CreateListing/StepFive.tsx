import PageMeta from "../../components/common/PageMeta";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { MinusIcon, Plus } from "../../icons";

const StepFive: React.FC = () => {
  const navigate = useNavigate();
  const [guests, setGuests] = useState(4);
  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 5
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
              Now, let's get some basic details about the property
            </span>
            <div className=" gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="space-y-6">
                  {/* Property Name Input */}
                  <div>
                    <label className="text-gray-500 text-sm block mb-1">
                      Name of your property
                    </label>
                    <input
                      type="text"
                      defaultValue="La -Casa the papel"
                      className="w-full p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* Progress */}
                  <p className="text-gray-500 text-sm">17/32</p>

                  {/* Guest Accommodation Details */}
                  <div>
                    <span className="mb-3 text-base font-semibold text-gray-800 dark:text-white/90">
                      Guest accommodation details
                    </span>
                  </div>

                  {/* Guest Count Input */}
                  <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                    <p className="text-gray-800">
                      How many guests can you accommodate in your place
                    </p>
                    <div className="flex space-x-3">
                      <button
                        className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
                        onClick={() =>
                          setGuests((prev) => Math.max(1, prev - 1))
                        }
                        disabled={guests <= 1}
                      >
                        <MinusIcon />
                      </button>
                      <span className="text-lg font-semibold">{guests}</span>
                      <button
                        className="p-2 bg-gray-300 rounded-md"
                        onClick={() => setGuests((prev) => prev + 1)}
                      >
                        <Plus />
                      </button>
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

            <Link
              to="/create-listing-step-six"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primaryDark"
            >
              Next
            </Link>
          </div>
        </div>
      </CreateListingPageLayout>
    </>
  );
};

export default StepFive;
