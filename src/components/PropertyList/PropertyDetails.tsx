 
import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "../../icons";
import { useAuthStore } from "../../store/auth.store";
import { getPropertyById } from "../../api/Listing.api";
import {
  PropertyProps,
  PropertyDetailsProps,
  RoomProps,
  AmenityProps,
  TagsProps,
} from "../../interfaces/listing";

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose,
}) => {
  const { propertyAddress } = property;

  const { token } = useAuthStore();
  const [propertyDetails, setPropertyDetails] = useState<PropertyProps>();
  const [roomsList, setRoomsList] = useState<RoomProps[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<AmenityProps[]>([]);
  const [tagsList, setTagsList] = useState<TagsProps[]>([]);

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
        rooms,
        amenities,
        tags,
      } = (await getPropertyById(token, formData)) as {
        property: PropertyProps;
        rooms: RoomProps[];
        amenities: AmenityProps[];
        tags: TagsProps[];
      };
      setRoomsList(rooms);
      setAmenitiesList(amenities);
      setTagsList(tags);
      setPropertyDetails(propertyData);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(propertyDetails);
  return (
    <div className="fixed inset-0 bg-black/[0.6] bg-opacity-50 flex justify-end z-999999">
      <motion.div
        initial={{ x: "100%" }} // Start off-screen to the right
        animate={{ x: 0 }} // Slide in from right
        exit={{ x: "100%" }} // Slide out to right
        transition={{ type: "tween", duration: 0.3 }} // Smooth transition
        className="w-[40%] h-full bg-white shadow-lg p-6 overflow-visible  relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 -left-4 text-gray-500 hover:text-black bg-gray-400 shadow w-8 h-8 rounded-full z-10 flex justify-center items-center"
        >
          <ChevronLeftIcon />
        </button>

        <div className="">
          {/* Title & Price */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">{property.name}</h2>
              <p className="text-gray-500 text-xs font-light">
                {`${propertyAddress.addressLine1}, ${propertyAddress.addressLine2}, ${propertyAddress.city} ${propertyAddress.state} ${propertyDetails?.country?.name} ${propertyAddress.zipCode}`}
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
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
            <div className="bg-gray-200 h-24 rounded-lg"></div>
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
            {roomsList?.map((room, i) => (
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
          <div className="flex flex-wrap gap-2 mb-4">
            {amenitiesList?.map(({ amenity }, i) => (
              <span
                key={`${amenity.id}-${i}`}
                className="bg-gray-200 px-3 py-1 text-sm rounded-md"
              >
                {amenity.name}
              </span>
            ))}
            {amenitiesList.length > 4 && (
              <span className="text-xs text-gray-500 font-light py-1">
                +{amenitiesList.slice(0, 4).length} more
              </span>
            )}
          </div>

          <hr className="my-3 border-gray-300" />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tagsList?.map(({ tag }, i) => (
              <span
                key={`${tag.id}-${i}`}
                className="bg-gray-200 px-3 py-1 text-sm rounded-md"
              >
                {tag.name}
              </span>
            ))}
            {tagsList.length > 4 && (
              <span className="text-xs text-gray-500 font-light py-1">
                +{tagsList.slice(0, 4).length} more
              </span>
            )}
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-2 absolute bottom-5 right-5">
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
