export interface ListTypeProps {
  id: string;
  name: string;
}

export interface RoomProps {
  id: string;
  quantity: string;
  roomType: {
    id: string;
    name: string;
  };
}

export interface AmenityProps {
  id: string;
  amenity: {
    id: string;
    name: string;
  };
}

export interface TagsProps {
  id: string;
  tag: {
    id: string;
    name: string;
  };
}

export interface PropertyListItemProps {
  id: number;
  name: string;
  propertyAddress: AddressProps;
  pricePerNight: string;
  thumbnail: string;
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
}
export interface PropertyProps {
  id: number;
  name: string;
  location: string;
  pricePerNight: string;
  thumbnail: string;
  bhkType: {
    id: number;
    name: string;
  };
  furnishingType: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  areaInSqMeter: number;
  description: string;
  guestCapacity: number;
  propertyAddress: AddressProps;
}
export interface PropertyDetailsProps {
  // [x: string]: any;
  property: PropertyProps;
  onClose: () => void;
}
