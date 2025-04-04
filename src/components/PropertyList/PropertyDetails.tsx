import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/button/Button";
import { motion } from "framer-motion";
import { CrossIcon } from "../../icons";
import { useAuthStore } from "../../store/auth.store";
import { getPropertyById } from "../../api/Listing.api";
import {
  PropertyProps,
  PropertyDetailsProps,
  RoomProps,
  AmenityProps,
  TagsProps,
  PhotosProps,
} from "../../interfaces/listing";
import useOutsideClick from "../../hooks/useOutsideClick";
import ServicesList from "../ServicesList";
const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose,
}) => {
  const { propertyAddress } = property;

  const { token } = useAuthStore();
  const [propertyDetails, setPropertyDetails] = useState<PropertyProps>();
  const [imagesList, setImagesList] = useState<PhotosProps[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<AmenityProps[]>([]);
  const [tagsList, setTagsList] = useState<TagsProps[]>([]);
  const [roomsList, setRoomsList] = useState<RoomProps[]>([]);

  useEffect(() => {
    fetchPropertyById();
  }, []);

  const fetchPropertyById = async () => {
    try {
      const formData = {
        propertyId: property.id,
        includeRooms: true,
        includeAmenities: true,
        includeTags: true,
        includePhotos: true,
      };
      const {
        property: propertyData,
        photos,
        amenities,
        tags,
        rooms,
      } = (await getPropertyById(token, formData)) as {
        property: PropertyProps;
        photos: PhotosProps[];
        amenities: AmenityProps[];
        tags: TagsProps[];
        rooms: RoomProps[];
      };
      setPropertyDetails(propertyData);
      setImagesList(photos);
      setAmenitiesList(amenities);
      setTagsList(tags);
      setRoomsList(rooms);
    } catch (error) {
      console.log(error);
    }
  };
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(sidebarRef, () => onClose());

  return (
    <div className="fixed inset-0 bg-black/[0.6] bg-opacity-50 flex justify-end z-999999">
      <motion.div
        ref={sidebarRef}
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: 0 }} // Slide in from right
        exit={{ x: "100%" }} // Slide out to right
        transition={{ type: "tween", duration: 0.3 }} // Smooth transition
        className="w-[40%] bg-white shadow-lg p-6  relative h-screen overflow-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 left-0 text-gray-500 hover:text-black w-8 h-8 z-10 flex justify-center items-center"
        >
          <CrossIcon />
        </button>

        <div className="">
          {/* Title & Price */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">{property.name}</h2>
              <p className="text-gray-500 text-xs font-light">
                {`${propertyAddress.addressLine1}, ${propertyAddress.addressLine2}, ${propertyAddress.city} ${propertyAddress.state} ${propertyAddress.zipCode}`}
              </p>
            </div>
            <div className=" bg-gray-100 p-2">
              <p className="text-gray-500 text-xs font-thin">
                Your price per night
              </p>
              <p className="text-md">{property.pricePerNight}</p>
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
            <Button variant="outline">Edit</Button>
            <Button variant="outline">Delist</Button>
            <Button variant="primary">Publish Property</Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;
