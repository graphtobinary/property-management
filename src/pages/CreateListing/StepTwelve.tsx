import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/button/Button";
import { createProperty, getTags } from "../../api/Listing.api";
import { ListTypeProps } from "../../interfaces/listing";
import { useListingStore } from "../../store/listing.store";
import { Modal } from "../../components/ui/modal";
import { CheckLineIcon } from "../../icons";
import { useModal } from "../../hooks/useModal";
import { useAuthStore } from "../../store/auth.store";

const StepTwelve: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlights, setHighlights] = useState<ListTypeProps[]>([]);
  const navigate = useNavigate();
  const { listingFormData, setListingFormData } = useListingStore();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchPropertyTypeList();
  }, []);

  const fetchPropertyTypeList = async () => {
    try {
      const { tags } = (await getTags()) as {
        tags: ListTypeProps[];
      };
      setHighlights(tags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selected) {
      setListingFormData({
        ...listingFormData,
        tagIds: selected,
      });
    }
  }, [selected]);

  useEffect(() => {
    if (listingFormData?.tagIds.length) {
      setSelected(listingFormData.tagIds);
    }
  }, [listingFormData]);

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

  const { token } = useAuthStore();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createProperty(token, listingFormData);
      openModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
              Step 12
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
              Let's give your “La-Casa the papel” a highlight
            </span>
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 space-y-12 ">
                {/*  */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 md:gap-6">
                  {highlights?.map((category: ListTypeProps) => (
                    <div
                      key={category.id}
                      onClick={() => handleSelect(category.id)}
                      className={`border  bg-white shadow-lg cursor-pointer ${
                        selected.includes(category.id)
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
            <Button
              isLoading={loading}
              size="sm"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Button onClick={handleSubmit}>Complete Registration</Button>
          </div>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-[700px] p-6 lg:p-10"
        >
          <div className="flex flex-col items-center justify-center  p-6">
            {/* Success Icon */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-400">
              <CheckLineIcon width={50} height={50} />
            </div>

            {/* Heading */}
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Property Listed
            </h2>

            {/* Description */}
            <p className="mt-2 text-center text-gray-500 text-sm max-w-sm">
              Congratulations! Your property has been listed. It can be found in
              the manage properties panel for final publishing.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("/manage-properties")}
              >
                Done for Now
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate("/create-listing-step-one")}
              >
                <span className="text-lg">+</span> Add Another
              </Button>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default StepTwelve;
