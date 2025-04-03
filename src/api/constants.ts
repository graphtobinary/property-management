const API_CONSTANTS = {
  USER_SIGNUP: "/acl.service.v1.SignupAndVerifyService/Signup",
  SIGNUP_VERIFY: "/acl.service.v1.SignupAndVerifyService/SignupVerify",
  USER_LOGIN: "/acl.service.v1.LoginService/Login",
  GET_USER: "/acl.service.v1.AclUserService/GetAclUserProfile",
  PATCH_USER: "/acl.service.v1.TenantService/PatchTenantProfile",
  GET_COUNTRY_LIST: "/master.service.v1.MasterCachedService/GetCountries",
  GET_AMENITIES: "/master.service.v1.MasterCachedService/GetAmenities",
  GET_BED_TYPES: "/master.service.v1.MasterCachedService/GetBedTypes",
  GET_BOOKING_PLACE_TYPES:
    "/master.service.v1.MasterCachedService/GetBookingPlaceTypes",
  GET_FURNISHING_TYPES:
    "/master.service.v1.MasterCachedService/GetFurnishingTypes",
  GET_BHK_TYPES: "/master.service.v1.MasterCachedService/GetBhkTypes",
  GET_PROPERTY_TYPES: "/master.service.v1.MasterCachedService/GetPropertyTypes",
  GET_ROOM_TYPES: "/master.service.v1.MasterCachedService/GetRoomTypes",
  GET_TAGS: "/master.service.v1.MasterCachedService/GetTags",
  GET_PROPERTY_TEMPID: "/property.service.v1.PropertyService/GetPropertyTempId",
  CREATE_PROPERTY: "/property.service.v1.PropertyService/CreateProperty",
  UPLOAD_IMAGE: "/upload-image/1/{tempID}",
  GET_PROPERTY_LIST:
    "/property.service.v1.PropertyService/GetPropertiesCollection",
  GET_PROPERTY_BY_ID: "/property.service.v1.PropertyService/GetProperty",
};

export default API_CONSTANTS;
