import { FormEvent, ReactNode } from "react";
import { UserProfileProps } from "./user";
import { EventInput } from "@fullcalendar/core/index.js";

export interface UpdateUserDataProps {
  firstName?: string;
  lastName?: string;
  businessName?: string;
  country?: string;
  phoneNumber?: string;
  approxNumOfListings?: string;
}

export interface AclUserProps {
  aclUser: UserProfileProps;
}

export interface CountryItemProps {
  value: string;
  label: string;
}
export interface CountryItemApiProps {
  id: string;
  name: string;
}
export interface CountryProps {
  countries: CountryItemApiProps[];
}

export interface AddressFormProps {
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  district?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapProps {
  googleMapsApiKey?: string;
}

export interface BreadcrumbProps {
  pageTitle: string;
}

export interface PropertyTypeFormProps {
  propertyType?: string;
  furnishingType?: string;
  propertySize?: string;
}

export interface Room {
  id: number;
  type: string;
  quantity: number;
}

export interface FormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  error?: boolean; // Error state
  hint?: string; // Hint text to display
}

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export interface PropertyDetailsProps {
  type: string;
  quantity: number;
}

export interface ListingFormDataProps {
  propertyTypeId: string;
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

export interface ListingState {
  listingFormData: ListingFormDataProps;
  setListingFormData: (data: ListingFormDataProps) => void;
}

export interface PropertyEmptyStateProps {
  title?: string;
  description?: string;
}

export interface PricingCardProps {
  title: string;
  subtitle: string;
  features: string[];
  isPremium?: boolean;
  isCurrent?: boolean;
}

export interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    price: number;
    availability: string;
    privateNote: string;
  };
}

export interface PropertyImageProps {
  id: string;
  url: string;
}

export interface CreatePropertProps {
  tempId: string;
}
