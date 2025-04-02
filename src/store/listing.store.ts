import { create } from "zustand";
import { ListingState } from "../interfaces";

const listingFormDataInitialValue = {
  listingFormData: {
    propertyTypeId: "",
    placeType: "",
    propertyLocation: {
      country: "",
      addressLine1: "",
      addressLine2: "",
      landmark: "",
      district: "",
      city: "",
      state: "",
      pincode: "",
    },
    propertyPinLocation: "",
    aboutProperty: {
      name: "",
      guestLimit: 0,
    },
    propertyDescription: "",
    propertyMeasurement: {
      type: "",
      furnishingType: "",
      propertySize: 0,
      propertyDetails: [],
    },
    propertySpecifications: [],
    propertyPrice: 0,
    propertyRules: {
      checkInTimeFrom: "",
      checkInTimeUntil: "",
      checkOutTimeFrom: "",
      checkOutTimeUntil: "",
      smoking: true,
      petFriendly: true,
      handicappedAccessebility: true,
    },
    propertyPhotos: [],
    propertyHighlight: [],
    guestPaymentOption: {
      creditCard: true,
      nameOnInvoice: "",
    },
  },
};
export const useListingStore = create<ListingState>()((set) => ({
  ...listingFormDataInitialValue,
  setListingFormData: (value) =>
    set((state) => ({
      listingFormData: { ...state.listingFormData, ...value },
    })),
}));
