import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { Link } from "react-router";
const categories = [
  { id: 1, name: "House" },
  { id: 2, name: "Flat/Apartment" },
  { id: 3, name: "Barn" },
  { id: 4, name: "Bed & Breakfast" },
  { id: 5, name: "Boat" },
  { id: 6, name: "Cabin" },
  { id: 7, name: "Motorhome" },
  { id: 8, name: "Castle" },
  { id: 9, name: "Container" },
  { id: 10, name: "Guest House" },
  { id: 11, name: "House Boat" },
  { id: 12, name: "Tree House" },
];
const StepOne: React.FC = () => {
  const [selected, setSelected] = useState(1);

  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5">
          <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
            Step 1
          </h3>
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
              Which of these best describes your place?
            </span>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelected(category.id)}
                      className={`border  bg-white shadow-lg cursor-pointer ${
                        selected === category.id
                          ? "border-black"
                          : "border-none"
                      }`}
                    >
                      {/* Product Image Section */}
                      <div className="relative">
                        <img
                          src="https://demo.tailadmin.com/src/images/grid-image/image-01.png" // Replace with the actual product image URL
                          alt="Nike Air Force 1 NDESTRUKT"
                          className="w-full "
                        />
                      </div>

                      {/* Product Info Section */}
                      <div className=" p-3 flex justify-center items-center">
                        <span className="text-gray-800  text-center">
                          {category.name}
                        </span>
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
            <Link
              to=""
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]"
            >
              Back
            </Link>
            <Link
              to="/create-listing-step-two"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
            >
              Next
            </Link>
          </div>
        </div>
      </CreateListingPageLayout>
    </>
  );
};

export default StepOne;
