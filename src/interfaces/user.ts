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

export interface SubscriptionPlan {
  name: string;
  description: string;
}

export interface PlanPrice {
  billingCycle: number;
  price: number;
}

export interface UserSubscription {
  subscriptionId: number;
  isExpired: boolean;
  subscriptionEndDate: string; // ISO date string
  isSubscriptionCanceled: boolean;
  plan: SubscriptionPlan;
  planPrice: PlanPrice;
}

export interface ISubscriptionDataProps {
  id: number;
  dateCreated: string;
  transactionId: string;
  billingCycle: number;
  price: number;
  nextBillingDate: string;
  currencyCode: string;
}

export interface UserStoreProps {
  user: UserProfileProps | null;
  subscription: UserSubscription | null;
  setUser: (value: UserProfileProps) => void;
  setSubscription: (value: UserSubscription) => void;
  clearUserStore: () => void;
}
