import { UserProfileProps } from "./user";

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
