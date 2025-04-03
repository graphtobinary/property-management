import { ListingFormDataProps } from "../interfaces";
import { getHeaders } from "../utils/utils";
import API_CONSTANTS from "./constants";
import { doPost } from "./index";

export const getCountryList = () => {
  return doPost(
    API_CONSTANTS.GET_COUNTRY_LIST,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getAmenities = () => {
  return doPost(
    API_CONSTANTS.GET_AMENITIES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getBedTypes = () => {
  return doPost(
    API_CONSTANTS.GET_AMENITIES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const GetBhkTypes = () => {
  return doPost(
    API_CONSTANTS.GET_BHK_TYPES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getBookingPlaceTypes = () => {
  return doPost(
    API_CONSTANTS.GET_BOOKING_PLACE_TYPES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getFurnishingTypes = () => {
  return doPost(
    API_CONSTANTS.GET_FURNISHING_TYPES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getPropertyTypes = () => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_TYPES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getRoomTypes = () => {
  return doPost(
    API_CONSTANTS.GET_ROOM_TYPES,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getTags = () => {
  return doPost(
    API_CONSTANTS.GET_TAGS,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};

export const getPropertyTempId = (accessToken: string) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_TEMPID,
    {},
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify({}),
    }
  );
};

export const createProperty = (
  accessToken: string,
  formData: ListingFormDataProps
) => {
  return doPost(
    API_CONSTANTS.CREATE_PROPERTY,
    {},
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify(formData),
    }
  );
};

export const uploadImages = (
  accessToken: string,
  formData: FormData,
  tempId: string
) => {
  return doPost(
    API_CONSTANTS.UPLOAD_IMAGE,
    { tempId },
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify(formData),
    }
  );
};

export const getPropertyList = (
  accessToken: string,
  formData: {
    pagination: {
      page: number;
      limit: number;
    };
  }
) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_LIST,
    {},
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify(formData),
    }
  );
};

export const getPropertyById = (
  accessToken: string,
  formData: {
    propertyId: number;
    includeRooms: boolean;
    includeAmenities: boolean;
    includeTags: boolean;
    includePhotos: boolean;
  }
) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_BY_ID,
    {},
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify(formData),
    }
  );
};