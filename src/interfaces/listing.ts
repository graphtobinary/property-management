import { EventInput } from "@fullcalendar/core/index.js";

export interface ListTypeProps {
  id: string;
  name: string;
}

export interface RoomProps {
  id: string;
  quantity: number;
  roomType: {
    id: string;
    name: string;
  };
}

export interface AmenityProps {
  id: string;
  amenity?: {
    id: string;
    name: string;
  };
}

export interface ServicesListItemProps {
  id: string;
  amenity?: {
    id: string;
    name: string;
  };
  tag?: {
    id: string;
    name: string;
  };
}

export interface ServicesListDataProps {
  listData: ServicesListItemProps[];
  isTags?: boolean;
}

export interface PhotosProps {
  id: string;
  imagePath: string;
}

export interface TagsProps {
  id: string;
  tag?: {
    id: string;
    name: string;
  };
}

export interface CurrencyProps {
  currencyCode: string;
  currencyName: string;
  id: number;
}

export interface PropertyListItemProps {
  id: number;
  name: string;
  propertyAddress: AddressProps;
  pricePerNight: string;
  imagePath: string;
}

export interface DailyPriceItemProps {
  price: number;
  currency: CurrencyProps;
  pricedAt: string;
}

export interface PropertyPriceItemProps {
  dailyPrices: DailyPriceItemProps[];
  propertyId: number;
  endDate: string;
  startDate: string;
}

export interface PropertydailyUnavailabilityProps {
  unavailableOnDate: string;
  unavailabilityRule: {
    id: number;
    comment: string;
  };
  endDate: string;
  startDate: string;
}
export interface PropertyCardProps extends PropertyListItemProps {
  onClick: () => void;
}

export interface AddressProps {
  type: string;
  furnishing: string;
  area: string;
  guests: number;
  bathrooms: number;
  kingBedrooms: number;
  queenBedrooms: number;
  kitchen: number;
  amenities: string[];
  tags: string[];
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  countryId: string;
  landmark: string;
  longitude: number;
  latitude: number;
}
export interface PropertyProps {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  thumbnail: string;
  bhkType: {
    id: string;
    name: string;
  };
  furnishingType: {
    id: string;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  areaInSqMeter: number;
  description: string;
  nanoId: string;
  guestCapacity: number;
  propertyAddress: AddressProps;
  propertyType: {
    id: string;
  };
  bookingPlaceType: {
    id: string;
  };
  petAllowed: boolean;
  smokingAllowed: boolean;
  needsAccessibility: boolean;
  checkinTime: string;
  checkoutTime: string;
}
export interface PropertyDetailsProps {
  // [x: string]: any;
  property?: PropertyListItemProps | null;
  onClose: () => void;
}

export type DailyPrice = {
  priceRule?: {
    comment: string;
  };
  pricedAt: string;
  price: number;
  currency: {
    id: number;
    currencyCode: string;
    currencyName: string;
  };
};

export type DailyUnavailability = {
  unavailableOnDate: string;
  unavailabilityRule: {
    id: number;
    comment: string;
  };
};

export interface CalendarEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end?: string;
  extendedProps: {
    calendar: string;
    price?: number | string;
    currency?: string;
    availability: string;
    privateNote: string;
  };
}

export interface EventUpdateFormProps {
  selectedEvent: CalendarEvent | null;
  eventStartDate: string;
  setEventStartDate: (val: string) => void;
  eventEndDate: string;
  setEventEndDate: (val: string) => void;
  eventCurrency: string;
  eventPrice: string;
  setEventPrice: (val: string) => void;
  eventAvailability: string;
  eventPrivateNote: string;
  setEventPrivateNote: (val: string) => void;
  handleRadioChange: (val: string) => void;
  handleAddOrUpdateEvent: () => void;
  closeModal: () => void;
}

export interface CreatePropertyRulesProps {
  propertyId: string;
  startDate: string;
  endDate: string;
  isAvailable: boolean;
  price?: string;
  comment: string;
}

export interface PriceData {
  propertyId: string;
  date: string;
  price: number;
}

export interface FetchPropertyPayload {
  propertyId: number;
  includeRooms: boolean;
  includeAmenities: boolean;
  includeTags: boolean;
  includePhotos: boolean;
}
