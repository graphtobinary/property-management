import { create } from "zustand";

interface PropertyDetailsProps {
  type: string;
  quantity: number;
}

interface ListingFormDataProps {
  propertyType: string;
  placeType: string;
  propertyLocation: {
    country: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    district: string;
    city: string;
    state: string;
    pincode: string;
  };
  propertyPinLocation: string;
  aboutProperty: {
    name: string;
    guestLimit: number;
  };
  propertyDescription: string;
  propertyMeasurement: {
    type: string;
    furnishingType: string;
    propertySize: number;
    propertyDetails: PropertyDetailsProps[];
  };
  propertySpecifications: string[];
  propertyPrice: number;
  propertyRules: {
    checkInTimeFrom: string;
    checkInTimeUntil: string;
    checkOutTimeFrom: string;
    checkOutTimeUntil: string;
    smoking: boolean;
    petFriendly: boolean;
    handicappedAccessebility: boolean;
  };
  propertyPhotos: string[];
  propertyHighlight: string[];
  guestPaymentOption: {
    creditCard: boolean;
    nameOnInvoice: string;
  };
}

interface ListingState {
  listingFormData: ListingFormDataProps;
  setListingFormData: (data: ListingFormDataProps) => void;
}

const listingFormDataInitialValue = {
  listingFormData: {
    propertyType: "",
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
