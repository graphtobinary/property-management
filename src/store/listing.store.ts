import { create } from "zustand";
import { ListingState } from "../interfaces";

const listingFormDataInitialValue = {
  listingFormData: {
    propertyTempId: "",
    propertyTypeId: "",
    bookingPlaceTypeId: "",
    address: {
      countryId: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      // district: "",
      city: "",
      state: "",
      zipCode: "",
      latitude: 0,
      longitude: 0,
    },
    name: "",
    guestCapacity: 0,
    description: "",
    bhkTypeId: "",
    furnishingTypeId: "",
    areaInSqMeter: 0,
    roomDetails: [],
    amenityIds: [],
    pricePerNight: 0,

    checkinTime: "",
    checkoutTime: "",
    smokingAllowed: true,
    petAllowed: true,
    needsAccessibility: true,

    // propertyPhotos: [],
    tagIds: [],
  },
};
export const useListingStore = create<ListingState>()((set) => ({
  ...listingFormDataInitialValue,
  setListingFormData: (value) =>
    set((state) => ({
      listingFormData: { ...state.listingFormData, ...value },
    })),
}));
