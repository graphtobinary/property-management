import { create } from "zustand";
import { ListingState } from "../interfaces";

const listingFormDataInitialValue = {
  listingFormData: {
    isUpdateListing: false,
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
    photos: [],
    pricePerNight: 0,
    checkinTime: "",
    checkoutTime: "",
    smokingAllowed: false,
    petAllowed: false,
    needsAccessibility: false,

    // propertyPhotos: [],
    tagIds: [],
  },
};
export const useListingStore = create<ListingState>()((set) => ({
  ...listingFormDataInitialValue,
  setListingFormData: (value) =>
    set((state) => ({
      listingFormData: {
        ...state.listingFormData,
        ...(typeof value === "function" ? value(state.listingFormData) : value),
      },
    })),
  clearListingStore: () => set(listingFormDataInitialValue),
}));
