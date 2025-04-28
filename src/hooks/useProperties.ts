import { useEffect, useState } from "react";
import { getPropertyById } from "../api/Listing.api";
import {
  AmenityProps,
  PhotosProps,
  PropertyProps,
  RoomProps,
  TagsProps,
} from "../interfaces/listing";

export const useProperties = (id: number) => {
  const [properties, setProperties] = useState<PropertyProps[]>([]);

  const [imagesList, setImagesList] = useState<PhotosProps[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<AmenityProps[]>([]);
  const [tagsList, setTagsList] = useState<TagsProps[]>([]);
  const [roomsList, setRoomsList] = useState<RoomProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const formData = {
          propertyId: id,
          includeRooms: true,
          includeAmenities: true,
          includeTags: true,
          includePhotos: true,
        };
        const { property, photos, amenities, tags, rooms } =
          (await getPropertyById(formData)) as {
            property: PropertyProps[];
            photos: PhotosProps[];
            amenities: AmenityProps[];
            tags: TagsProps[];
            rooms: RoomProps[];
          };

        setProperties(property);
        setImagesList(photos);
        setAmenitiesList(amenities);
        setTagsList(tags);
        setRoomsList(rooms);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    imagesList,
    tagsList,
    amenitiesList,
    roomsList,
  };
};
