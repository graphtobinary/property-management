import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { useListingStore } from "../../store/listing.store";
import { getPropertyTypes } from "../../api/Listing.api";
import { ListTypeProps } from "../../interfaces/listing";

const StepOne: React.FC = () => {
  const { listingFormData, setListingFormData } = useListingStore();
  const [selected, setSelected] = useState<string>("");
  const [propertyTypeList, setPropertyTypeList] = useState<
    ListTypeProps[] | []
  >([]);

  useEffect(() => {
    if (listingFormData?.propertyTypeId) {
      setSelected(listingFormData.propertyTypeId);
    }
  }, [listingFormData]);

  useEffect(() => {
    fetchPropertyTypeList();
  }, []);

  const fetchPropertyTypeList = async () => {
    try {
      const { propertyTypes } = (await getPropertyTypes()) as {
        propertyTypes: ListTypeProps[];
      };
      setPropertyTypeList(propertyTypes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selected) {
      setListingFormData({
        ...listingFormData,
        propertyTypeId: selected,
      });
    }
  }, [selected]);

  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 1
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
                  {propertyTypeList?.map((category: ListTypeProps) => (
                    <div
                      key={category?.id}
                      onClick={() => setSelected(category?.id)}
                      className={`border  bg-white shadow-lg cursor-pointer ${
                        selected === category?.id
                          ? "border-black"
                          : "border-none"
                      }`}
                    >
                      {/* Product Image Section */}
                      <div className="relative">
                        <img
                          src="images/product/placeholder-thumb.jpg" // Replace with the actual product image URL
                          alt="Nike Air Force 1 NDESTRUKT"
                          className="w-full "
                        />
                      </div>

                      {/* Product Info Section */}
                      <div className=" p-3 flex justify-center items-center">
                        <span className="text-gray-800  text-center">
                          {category?.name}
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
              to="/create-listing-step-two"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primaryDark"
            >
              Next
            </Link>
          </div>
        </div>
      </>
    </>
  );
};

export default StepOne;
