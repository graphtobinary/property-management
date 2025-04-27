import React, { useEffect, useRef } from "react";
import Button from "../ui/button/Button";
import { PropertyDetailsProps, PhotosProps } from "../../interfaces/listing";
import useOutsideClick from "../../hooks/useOutsideClick";
import ServicesList from "../ServicesList";
import { usePropertyDetails } from "../../hooks/usePropertyDetails";
import Loader from "../Loader/Loader";
import { useListingStore } from "../../store/listing.store";
import { useNavigate } from "react-router";
const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose,
}) => {
  const { propertyAddress } = { ...property };
  const navigate = useNavigate();
  const { listingFormData, setListingFormData, clearListingStore } =
    useListingStore();
  const {
    propertyDetails,
    imagesList,
    amenitiesList,
    tagsList,
    roomsList,
    loading,
    fetchProperty,
  } = usePropertyDetails();

  useEffect(() => {
    if (property?.id) {
      const formData = {
        propertyId: property?.id,
        includeRooms: true,
        includeAmenities: true,
        includeTags: true,
        includePhotos: true,
      };
      fetchProperty(formData);
    }
  }, []);

  useEffect(() => {
    if (propertyDetails) {
      clearListingStore();
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
    navigate("/create-listing-step-one");
  };

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(sidebarRef, () => {
    onClose();
  });
  if (loading)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loader size="large" />
      </div>
    );
  return (
    <>
      <div className="">
        {/* Title & Price */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold">{property?.name}</h2>
            <p className="text-gray-500 text-xs font-light">
              {`${propertyAddress?.addressLine1}, ${propertyAddress?.addressLine2}, ${propertyAddress?.city} ${propertyAddress?.state} ${propertyAddress?.zipCode}`}
            </p>
          </div>
          <div className=" bg-gray-100 p-2">
            <p className="text-gray-500 text-xs font-thin">
              Your price per night
            </p>
            <p className="text-md">{property?.pricePerNight}</p>
          </div>
        </div>

        {/* Property Info */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
            <span className="text-xs text-gray-500 font-thin">
              Property Type
            </span>
            <span className="text-sm">{propertyDetails?.bhkType?.name}</span>
          </div>
          <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
            <span className="text-xs text-gray-500 font-thin">
              Furnishing Type
            </span>
            <span className="text-sm">
              {propertyDetails?.furnishingType?.name}
            </span>
          </div>
          <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
            <span className="text-xs text-gray-500 font-thin">Area</span>
            <span className="text-sm">
              {propertyDetails?.areaInSqMeter} sq mtr
            </span>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {imagesList?.length > 0 &&
            imagesList.map((image: PhotosProps) => (
              <img
                key={image.id}
                src={`${import.meta.env.VITE_CDN_URL}${image?.imagePath}`}
                alt="Property"
                className="w-full h-full object-cover rounded-md"
              />
            ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          {propertyDetails?.description}
        </p>

        {/* Features */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gray-100 p-3 rounded-md text-center flex flex-col">
            <span className="text-sm">{propertyDetails?.guestCapacity}</span>
            <span className="text-xs text-gray-500 font-thin"> Guests</span>
          </div>
          {roomsList.slice(0, 4)?.map((room, i) => (
            <div
              key={`${room.id}-${i}`}
              className="bg-gray-100 p-3 rounded-md text-center flex flex-col"
            >
              <span className="text-sm">{room.quantity}</span>
              <span className="text-xs text-gray-500 font-thin">
                {room.roomType.name}
              </span>
            </div>
          ))}
        </div>

        <hr className="my-3 border-gray-300" />
        {/* Amenities */}
        <ServicesList listData={amenitiesList} />
        {/* <div className="flex flex-wrap gap-2 mb-4">
            {amenityVisibleItems?.map((amenity: AmenityProps) => (
              <span
                key={amenity.id}
                className="bg-gray-200 px-3 py-1 text-sm rounded-md"
              >
                {amenity.amenity.name}
              </span>
            ))}
            {amenitiesList.length > 4 && (
              <span className="text-xs text-gray-500 font-light py-1">
                {amenityMoreText}
              </span>
            )}
          </div> */}

        <hr className="my-3 border-gray-300" />
        {/* Tags */}
        <ServicesList isTags listData={tagsList} />
        {/* <div className="flex flex-wrap gap-2 mb-6">
            {tagsVisibleItems?.map((tag: TagsProps) => (
              <span
                key={tag.id}
                className="bg-gray-200 text-sm px-3 py-1 rounded-md"
              >
                {tag.tag.name}
              </span>
            ))}
            {tagsList.length > 4 && (
              <span className="text-xs text-gray-500 font-light py-1">
                {tagsMoreText}
              </span>
            )}
          </div> */}
        {/* Buttons */}
        <div className="flex justify-end gap-2 bottom-5 right-5">
          <Button variant="outline" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="outline">Delist</Button>
          <Button variant="primary">Publish Property</Button>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
