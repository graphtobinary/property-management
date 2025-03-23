import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import CreateListingPageLayout from "./CreateListingPageLayout";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
const categories = [
  { id: 1, name: "Wifi" },
  { id: 2, name: "TV" },
  { id: 3, name: "Kitchen" },
  { id: 4, name: "Washing Machine" },
  { id: 5, name: "Dish Washer" },
  { id: 6, name: "Free Parking" },
  { id: 7, name: "Air Conditioning" },
  { id: 8, name: "Workspace" },
  { id: 9, name: "Pool" },
  { id: 10, name: "Hot Tub" },
  { id: 11, name: "Patio" },
  { id: 12, name: "BBQ Grill" },
  { id: 13, name: "Dining Table" },
  { id: 14, name: "House" },
  { id: 15, name: "Pool Table" },
  { id: 16, name: "Fireplace" },
  { id: 17, name: "Beach Access" },
  { id: 18, name: "Fire Extinguisher" },
  { id: 19, name: "Piano" },
  { id: 20, name: "Guitar" },
  { id: 21, name: "Closet" },
  { id: 22, name: "Toilet Paper" },
  { id: 23, name: "Shower" },
  { id: 24, name: "Toilet" },
  { id: 25, name: "Hair Dryer" },
  { id: 26, name: "Bathtub" },
  { id: 27, name: "Toiletries" },
  { id: 28, name: "Bathrobes" },
];
const StepEight: React.FC = () => {
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();
  return (
    <>
      <PageMeta
        title="React.js Calendar Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Calendar Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />

      <CreateListingPageLayout>
        <div className="bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 8
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
            <Button size="sm" variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Link
              to="/create-listing-step-nine"
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

export default StepEight;
