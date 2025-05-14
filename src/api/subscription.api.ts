import API_CONSTANTS from "./constants";
import { doPost } from "./index";

export const createPaymentSession = (formData: {
  planId: number;
  planPriceId: number;
}) => {
  return doPost(
    API_CONSTANTS.CREATE_PAYMENT_SESSION,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getSubscriptions = () => {
  return doPost(
    API_CONSTANTS.GET_SUBSCRIPTIONS,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const cancelSubscription = (formData: {
  subscriptionId: number;
  reason?: string;
}) => {
  return doPost(
    API_CONSTANTS.SUBSCRIPTION_CANCEL,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getPlanAndPrice = () => {
  return doPost(
    API_CONSTANTS.GET_PLAN_AND_PRICE,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const getCurrentPaymentStatus = (formData: { paymentId: string }) => {
  return doPost(
    API_CONSTANTS.GET_CURRENT_PAYMENT_STATUS,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    },
    false
  );
};
