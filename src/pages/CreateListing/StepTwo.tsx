import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
const options = [
  {
    id: 1,
    title: "An entire place",
    description: "People will have the whole place to themselves",
  },
  {
    id: 2,
    title: "A room",
    description:
      "Guests will have their own room to themselves and access to shared places",
  },
  {
    id: 3,
    title: "A shared room in your property",
    description:
      "Guests sleep in a shared room in a professionally managed hostel with staff on site 24/7",
  },
];
const StepTwo: React.FC = () => {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5 h-full">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 2
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
              What type of place will guests have?
            </span>
            <div className="flex gap-4 md:gap-6 ">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="space-y-4">
                  {options.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer ${
                        selected === option.id
                          ? "border-black"
                          : "border-gray-300"
                      } hover:border-black transition`}
                      onClick={() => setSelected(option.id)}
                    >
                      {/* Placeholder for Image */}
                      <div className="w-12 h-12 bg-gray-300 rounded-md"></div>
                      {/* Text Content */}
                      <div>
                        <h3 className="text-lg font-semibold">
                          {option.title}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
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
              to="/create-listing-step-three"
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

export default StepTwo;
