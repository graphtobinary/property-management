export interface UserProfileProps {
  email?: string;
  isTenantOwner?: boolean;
  id?: number;
  phoneNumber?: string;
  status?: number;
  tenant?: {
    approxNumOfListings?: number;
    code?: string;
    configuration?: {
      rateLimitPerSec?: 200;
      burstLimit?: 100;
    };
    contactDetails?: object;
    firstName?: string;
    id?: number;
    lastName?: string;
    phoneNumber?: string;
    plan?: number;
    status?: number;
    tenantBusinessType?: number;
  };
}

export interface UserStoreProps {
  user: UserProfileProps | undefined;
  setUser: (value: UserProfileProps) => void;
  clearUserStore: () => void;
}
