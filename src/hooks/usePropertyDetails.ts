import { useCallback, useState } from "react";
import { getPropertyById } from "../api/Listing.api"; // adjust import path
import {
  AmenityProps,
  FetchPropertyPayload,
  PhotosProps,
  PropertyProps,
  RoomProps,
  TagsProps,
} from "../interfaces/listing"; // adjust as needed

export function usePropertyDetails() {
  const [propertyDetails, setPropertyDetails] = useState<PropertyProps | null>(
    null
  );
  const [imagesList, setImagesList] = useState<PhotosProps[]>([]);
  const [amenitiesList, setAmenitiesList] = useState<AmenityProps[]>([]);
  const [tagsList, setTagsList] = useState<TagsProps[]>([]);
  const [roomsList, setRoomsList] = useState<RoomProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProperty = useCallback(async (payload: FetchPropertyPayload) => {
    try {
      setLoading(true);
      setError(null);

      const { property, photos, amenities, tags, rooms } =
        (await getPropertyById(payload)) as {
          property: PropertyProps;
          photos: PhotosProps[];
          amenities: AmenityProps[];
          tags: TagsProps[];
          rooms: RoomProps[];
        };

      setPropertyDetails(property);
      setImagesList(photos);
      setAmenitiesList(amenities);
      setTagsList(tags);
      setRoomsList(rooms);
    } catch (err) {
      console.error("Failed to fetch property details:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    propertyDetails,
    imagesList,
    amenitiesList,
    tagsList,
    roomsList,
    loading,
    error,
    fetchProperty,
  };
}
