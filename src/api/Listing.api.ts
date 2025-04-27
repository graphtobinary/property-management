import { ListingFormDataProps } from "../interfaces";
import { CreatePropertyRulesProps } from "../interfaces/listing";
import API_CONSTANTS from "./constants";
import { doPost } from "./index";

export const getCountryList = () => {
  return doPost(
    API_CONSTANTS.GET_COUNTRY_LIST,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getCityList = (formdata: { countryId: string }) => {
  return doPost(
    API_CONSTANTS.GET_CITY_LIST,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formdata),
    }
  );
};

export const getAmenities = () => {
  return doPost(
    API_CONSTANTS.GET_AMENITIES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getBedTypes = () => {
  return doPost(
    API_CONSTANTS.GET_AMENITIES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const GetBhkTypes = () => {
  return doPost(
    API_CONSTANTS.GET_BHK_TYPES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getBookingPlaceTypes = () => {
  return doPost(
    API_CONSTANTS.GET_BOOKING_PLACE_TYPES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getFurnishingTypes = () => {
  return doPost(
    API_CONSTANTS.GET_FURNISHING_TYPES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getPropertyTypes = () => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_TYPES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getRoomTypes = () => {
  return doPost(
    API_CONSTANTS.GET_ROOM_TYPES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getTags = () => {
  return doPost(
    API_CONSTANTS.GET_TAGS,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getPropertyTempId = () => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_TEMPID,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const createProperty = (formData: Partial<ListingFormDataProps>) => {
  return doPost(
    API_CONSTANTS.CREATE_PROPERTY,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const updateProperty = (formData: Partial<ListingFormDataProps>) => {
  return doPost(
    API_CONSTANTS.UPDATE_PROPERTY,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const uploadImages = (formData: FormData, tempID: string) => {
  return doPost(
    API_CONSTANTS.UPLOAD_IMAGE,
    { tempID },
    {
      headers: {},
      body: formData,
    }
  );
};

export const updateUploadedImages = (formData: FormData, nanoId: string) => {
  return doPost(
    API_CONSTANTS.UPDATE_PROPERTY_IMAGE,
    { nanoId },
    {
      headers: {},
      body: formData,
    }
  );
};

export const getPropertyList = (formData: {
  pagination: {
    page: number;
    limit: number;
  };
}) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_LIST,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getPropertyById = (formData: {
  propertyId: number;
  includeRooms: boolean;
  includeAmenities: boolean;
  includeTags: boolean;
  includePhotos: boolean;
}) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_BY_ID,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getPropertyPriceRules = (formData: {
  propertyId: number;
  startDate: string;
  endDate: string;
}) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_PRICE_RULES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getPropertyUnavailability = (formData: {
  propertyId: number;
  startDate: string;
  endDate: string;
}) => {
  return doPost(
    API_CONSTANTS.GET_PROPERTY_UNAVAILABILITY,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const createPropertyRules = (formData: CreatePropertyRulesProps) => {
  return doPost(
    API_CONSTANTS.CREATE_PROPERTY_RULES,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const deletePropertyImageById = (formData: {
  propertyPhotoId: string;
}) => {
  return doPost(
    API_CONSTANTS.DELETE_IMAGE_BY_ID,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const deletePropertyImageByImageId = (formData: { imageId: string }) => {
  return doPost(
    API_CONSTANTS.DELETE_IMAGE_BY_IMAGE_ID,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};
