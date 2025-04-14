import { useEffect } from "react";
import { usePropertyDetails } from "../../hooks/usePropertyDetails";
import { PropertyCardProps } from "../../interfaces/listing";
import { useListingStore } from "../../store/listing.store";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
const fallBackImg = "images/product/placeholder-thumb.jpg";

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  propertyAddress,
  pricePerNight,
  imagePath,
  onClick,
}) => {
  const { clearListingStore } = useListingStore();
  const {
    propertyDetails,
    imagesList,
    amenitiesList,
    tagsList,
    roomsList,
    fetchProperty,
  } = usePropertyDetails();
  const { listingFormData, setListingFormData } = useListingStore();
  const navigate = useNavigate();

  const formData = {
    propertyId: id,
    includeRooms: true,
    includeAmenities: true,
    includeTags: true,
    includePhotos: true,
  };
  useEffect(() => {
    if (propertyDetails) {
      setListingFormData({
        ...listingFormData,
        // property related data
        isUpdateListing: true,
        propertyTempId: propertyDetails.nanoId,
        propertyTypeId: propertyDetails.propertyType.id,
        bookingPlaceTypeId: propertyDetails.bookingPlaceType.id,
        address: {
          countryId: propertyDetails.propertyAddress.countryId,
          addressLine1: propertyDetails.propertyAddress.addressLine1,
          addressLine2: propertyDetails.propertyAddress.addressLine2,
          landmark: propertyDetails.propertyAddress.landmark,
          city: propertyDetails.propertyAddress.city,
          state: propertyDetails.propertyAddress.state,
          zipCode: propertyDetails.propertyAddress.zipCode,
          latitude: propertyDetails.propertyAddress.latitude,
          longitude: propertyDetails.propertyAddress.longitude,
        },
        bhkTypeId: propertyDetails.bhkType.id,
        furnishingTypeId: propertyDetails.furnishingType.id,
        guestCapacity: propertyDetails.guestCapacity,
        areaInSqMeter: propertyDetails.areaInSqMeter,
        pricePerNight: propertyDetails.pricePerNight,
        checkinTime: propertyDetails.checkinTime,
        checkoutTime: propertyDetails.checkoutTime,
        ...(propertyDetails.petAllowed && {
          petAllowed: propertyDetails.petAllowed,
        }),
        ...(propertyDetails.needsAccessibility && {
          needsAccessibility: propertyDetails.needsAccessibility,
        }),
        ...(propertyDetails.smokingAllowed && {
          smokingAllowed: propertyDetails.smokingAllowed,
        }),
        name: propertyDetails.name,
        description: propertyDetails.description,
        // other data
        photos: imagesList,
        roomDetails: roomsList.map((room) => ({
          roomTypeId: room.roomType.id,
          quantity: room.quantity,
        })),
        amenityIds: amenitiesList
          .map((item) => item.amenity?.id)
          .filter((id): id is string => Boolean(id)),
        tagIds: tagsList
          .map((item) => item.tag?.id)
          .filter((id): id is string => Boolean(id)),
      });
    }
  }, [propertyDetails, imagesList, amenitiesList, tagsList, roomsList]);

  const handleEdit = async () => {
    clearListingStore();
    await fetchProperty(formData);

    navigate("/create-listing-step-one");
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg flex-col sm:flex-row gap-5">
      <div
        className="flex items-center gap-5 md:gap-8 cursor-pointer"
        onClick={onClick}
      >
        <img
          src={imagePath || fallBackImg}
          alt="Property"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div className="w-full md:w-56">
          <h3 className="text-md font-medium">{name}</h3>
          <p className="text-xs text-gray-500">{`${propertyAddress?.addressLine1}, ${propertyAddress?.addressLine2}, ${propertyAddress?.city} ${propertyAddress?.state} ${propertyAddress?.zipCode}`}</p>
        </div>
        {/* Price section */}
        <div className="border-l border-l-gray-200 pl-4">
          <p className="text-xs text-gray-400">Your price per night</p>
          <p className="text-sm text-gray-900">{pricePerNight}</p>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={handleEdit}>
          Edit
        </Button>
        <Button size="sm" variant="outline">
          Delist
        </Button>
        <Button size="sm" variant="primary">
          Publish Property
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
