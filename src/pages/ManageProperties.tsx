import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import PropertyList from "../components/PropertyList";
import { Plus } from "../icons";
import Button from "../components/ui/button/Button";
import { useListingStore } from "../store/listing.store";
import { getPropertyTempId } from "../api/Listing.api";
import { useEffect } from "react";
import useUserStore from "../store/user.store";
const ManageProperties: React.FC = () => {
  const { subscription } = useUserStore();
  const { listingFormData, setListingFormData, clearListingStore } =
    useListingStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearListingStore();
  }, []);

  const handlePropertyTempId = async () => {
    try {
      const { propertyId } = (await getPropertyTempId()) as {
        propertyId: string;
      };
      navigateToCreateListing(propertyId);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToCreateListing = (propertyId: string) => {
    setListingFormData({
      ...listingFormData,
      propertyTempId: propertyId,
    });
    navigate("/create-listing-step-one");
  };

  useEffect(() => {
    if (subscription?.isExpired) {
      navigate("/");
    }
  }, [subscription?.isExpired]);

  return (
    <>
      <PageMeta title="Manzil" description="Property Management Dashboard" />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Manage Properties
        </h2>
        <div className="flex justify-end mb-3">
          <div className="flex">
            <Button
              onClick={handlePropertyTempId}
              size="sm"
              variant="primary"
              startIcon={<Plus className="size-5" />}
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-4">
        <PropertyList />
      </div>
    </>
  );
};

export default ManageProperties;
