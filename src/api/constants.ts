const API_CONSTANTS = {
  USER_SIGNUP: "/acl.service.v1.SignupAndVerifyService/Signup",
  SIGNUP_VERIFY: "/acl.service.v1.SignupAndVerifyService/SignupVerify",
  USER_LOGIN: "/acl.service.v1.LoginService/Login",
  GET_USER: "/acl.service.v1.AclUserService/GetAclUserProfile",
  PATCH_USER: "/acl.service.v1.TenantService/PatchTenantProfile",
  FORGOT_PASSWORD: "/acl.service.v1.ForgotPasswordService/ForgotPassword",
  RESET_PASSWORD: "/acl.service.v1.ResetPasswordService/ResetPassword",
  GET_COUNTRY_LIST: "/master.service.v1.MasterCachedService/GetCountries",
  GET_CITY_LIST: "/master.service.v1.MasterCachedService/GetCities",
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
  UPDATE_PROPERTY: "/property.service.v1.PropertyService/UpdateProperty",
  UPLOAD_IMAGE: "/upload-image/1/{tempID}",
  UPDATE_PROPERTY_IMAGE: "/upload-property-image/1/{nanoId}",
  GET_PROPERTY_LIST:
    "/property.service.v1.PropertyService/GetPropertiesCollection",
  GET_PROPERTY_BY_ID: "/property.service.v1.PropertyService/GetProperty",
  GET_PROPERTY_PRICE_RULES:
    "/property.service.v1.PropertyService/GetPropertyPriceRules",
  GET_PROPERTY_UNAVAILABILITY:
    "/property.service.v1.PropertyService/GetPropertyUnavailabilityRules",
  CREATE_PROPERTY_RULES:
    "/property.service.v1.PropertyService/CreatePropertyRules",
  DELETE_IMAGE_BY_IMAGE_ID:
    "/images.service.v1.ImageService/DeleteUploadedImage",
  DELETE_IMAGE_BY_ID:
    "/property.service.v1.PropertyService/DeletePropertyPhoto",
  PUBLISH_PROPERTY: "/property.service.v1.PropertyService/PublishProperty",
  DELIST_PROPERTY: "/property.service.v1.PropertyService/DelistProperty",
  GET_SUBSCRIPTIONS:
    "/subscription.service.v1.SubscriptionService/GetSubscriptions",
  GET_PLAN_AND_PRICE: "/subscription.service.v1.PlanService/GetPlanAndPrice",
  CREATE_PAYMENT_SESSION:
    "/subscription.service.v1.SubscriptionService/CreatePaymentSession",
  SUBSCRIPTION_CANCEL:
    "/subscription.service.v1.SubscriptionService/SubscriptionCancel",
  GET_CURRENT_PAYMENT_STATUS:
    "/subscription.service.v1.SubscriptionService/GetCurrentPaymentStatus",
};

export default API_CONSTANTS;
