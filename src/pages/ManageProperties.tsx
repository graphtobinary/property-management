import { useNavigate } from "react-router";
import PageMeta from "../components/common/PageMeta";
import PropertyList from "../components/PropertyList";
import { Plus } from "../icons";
import Button from "../components/ui/button/Button";
import { useAuthStore } from "../store/auth.store";
import { useListingStore } from "../store/listing.store";
import { getPropertyTempId } from "../api/Listing.api";

const ManageProperties: React.FC = () => {

  const { token } = useAuthStore();
  const { listingFormData, setListingFormData } = useListingStore();
  const navigate = useNavigate();

  const handlePropertyTempId = async () => {
      try {
        const { propertyId } = (await getPropertyTempId(token)) as {
          propertyId: string;
        };
  
        setListingFormData({
          ...listingFormData,
          propertyTempId: propertyId,
        });
        navigate("/create-listing-step-one");
      } catch (error) {
        console.log(error);
      }
    }; 
  return (
    <>
      <PageMeta
        title="Manzil"
        description="Property Management Dashboard"
      />
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2
          className="text-xl font-myriad font-bold text-gray-800 dark:text-white/90"
          x-text="pageName"
        >
          Manage Properties
        </h2>
        <div className="flex justify-end mb-3">
          <div className="flex">
            {/* <Link
              to="/create-listing-step-one"
              className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
            >
              <Plus stroke="#fff" /> <span className="pl-1"> Add Property</span>
            </Link> */}
            <Button
              onClick={handlePropertyTempId}
              // to="/create-listing-step-one"
              // className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-primary text-theme-sm hover:bg-primary"
            >
              <Plus stroke="#fff" />{" "}
              <span className="pl-1">Add Property</span>
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
