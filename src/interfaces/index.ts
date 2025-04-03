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
  countryId?: string;
  addressLine1?: string;
  addressLine2?: string;
  landmark?: string;
  // district?: string;
  city?: string;
  state?: string;
  zipCode?: string;
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
  roomTypeId: string;
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
  selected?: string;
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
  roomTypeId: string;
  quantity: number;
}

export interface ListingFormDataProps {
  propertyTempId: string;
  propertyTypeId: string;
  bookingPlaceTypeId: string;
  address: {
    countryId: string;
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    // district: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number | undefined;
    longitude: number | undefined;
  };
  name: string;
  guestCapacity: number;
  description: string;
  bhkTypeId: string;
  furnishingTypeId: string;
  areaInSqMeter: number;
  roomDetails: PropertyDetailsProps[];
  amenityIds: string[];
  pricePerNight: number;
  checkinTime: string;
  checkoutTime: string;
  smokingAllowed: boolean;
  petAllowed: boolean;
  needsAccessibility: boolean;
  // propertyPhotos: string[];
  tagIds: string[];
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
