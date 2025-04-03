export interface ListTypeProps {
  id: string;
  name: string;
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
  propertyAddress: {
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
  };
}
export interface PropertyDetailsProps {
  // [x: string]: any;
  property: PropertyProps;
  onClose: () => void;
}






