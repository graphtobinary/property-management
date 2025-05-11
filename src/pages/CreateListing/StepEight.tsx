import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { getAmenities } from "../../api/Listing.api";
import { ListTypeProps } from "../../interfaces/listing";
import { useListingStore } from "../../store/listing.store";
import ExitButton from "../../components/ExitButton";
import { toast } from "react-toastify";
import useUserStore from "../../store/user.store";
const StepEight: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<ListTypeProps[] | []>([]);
  const { listingFormData, setListingFormData } = useListingStore();
  const navigate = useNavigate();
  const { subscription } = useUserStore();

  useEffect(() => {
    if (subscription?.isExpired) {
      navigate("/");
    }
  }, [subscription?.isExpired]);

  useEffect(() => {
    fetchAmenityList();
  }, []);

  const fetchAmenityList = async () => {
    try {
      const { amenities } = (await getAmenities()) as {
        amenities: ListTypeProps[];
      };
      setAmenitiesList(amenities);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (id: string) => {
    setSelected((prev) => {
      let newSelectedItem = [...prev];
      if (prev.includes(id)) {
        newSelectedItem = newSelectedItem.filter((item) => item !== id);
      } else {
        newSelectedItem = [...newSelectedItem, id];
      }
      return newSelectedItem;
    });
  };

  useEffect(() => {
    if (listingFormData?.amenityIds.length) {
      setSelected(listingFormData.amenityIds);
    }
  }, [listingFormData]);

  useEffect(() => {
    if (selected) {
      setListingFormData({
        ...listingFormData,
        amenityIds: selected,
      });
    }
  }, [selected]);

  const handleNext = () => {
    if (selected.length === 0) {
      toast.error("Please select at least one amenity");
      return;
    }
    navigate("/create-listing-step-nine");
  };

  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />

      <>
        <div className="bg-white p-0 md:p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-0 mb-5">
          <div className="flex justify-between">
            <h3 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
              Step 8
            </h3>
            <ExitButton isListingPage />
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
            <div className="grid grid-cols-12 gap-4 md:gap-6 pb-20">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 md:gap-6">
                  {amenitiesList?.map((category: ListTypeProps) => (
                    <div
                      key={category.id}
                      onClick={() => handleSelect(category.id)}
                      className={`border  bg-white shadow-lg cursor-pointer ${
                        selected.includes(category.id)
                          ? "border-primary"
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
                          {category.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/*  */}
              </div>
            </div>
            <div className="flex justify-end mb-3 fixed bottom-2 right-6">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default StepEight;
