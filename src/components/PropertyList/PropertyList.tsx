import { Plus } from "../../icons";
import Button from "../ui/button/Button";
import PropertyCard from "./PropertyCard";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { getPropertyList, getPropertyTempId } from "../../api/Listing.api";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router";
import { useListingStore } from "../../store/listing.store";
import { PropertyListItemProps } from "../../interfaces/listing";
const PropertyDetails = lazy(() => import("./PropertyDetails"));

const PropertyList: React.FC = () => {
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyListItemProps | null>(null);
  const { listingFormData, setListingFormData } = useListingStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const [propertyList, setPropertyList] = useState<
    PropertyListItemProps[] | []
  >([]);

  useEffect(() => {
    fetchPropertyList();
  }, []);

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

  const fetchPropertyList = async () => {
    try {
      const formData = {
        pagination: {
          page: 1,
          limit: 10,
        },
      };
      const { properties } = (await getPropertyList(token, formData)) as {
        properties: PropertyListItemProps[];
      };
      setPropertyList(properties);
      // console.log(properties);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setTimeout(() => setSelectedProperty(null), 100); // Wait for animation to finish
  };

  return (
    <>
      <div className="min-h-screen flex flex-col gap-4">
        {propertyList?.map((property, index) => (
          <PropertyCard
            key={index}
            {...property}
            imagePath={
              property.imagePath
                ? `${import.meta.env.VITE_CDN_URL}${property.imagePath}`
                : ""
            }
            onClick={() => setSelectedProperty(property)}
          />
        ))}
        <AnimatePresence>
          {selectedProperty && (
            <Suspense fallback={<h2>Loading...</h2>}>
              <PropertyDetails
                property={selectedProperty}
                onClose={handleClose}
              />
            </Suspense>
          )}
        </AnimatePresence>

        <div className="flex justify-center mt-6">
          <Button variant="primary" onClick={handlePropertyTempId}>
            <span className="text-lg">
              <Plus stroke="#fff" />
            </span>{" "}
            Add Another Property
          </Button>
        </div>
      </div>
    </>
  );
};

export default PropertyList;
