import API_CONSTANTS from "./constants";
import { doPost } from "./index";

// import { getHeaders } from 'utils/utils'

// export const getUser = (accessToken: string) => {
//   return doGet(API_CONSTANTS.GET_USER, {}, { headers: getHeaders(accessToken) })
// }

export const signupUser = (formData: { email: string; password: string }) => {
  return doPost(
    API_CONSTANTS.USER_SIGNUP,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const verifyEmail = (formData: { invitation_token: string }) => {
  return doPost(
    API_CONSTANTS.SIGNUP_VERIFY,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const loginUser = (formData: { email: string; password: string }) => {
  return doPost(
    API_CONSTANTS.USER_SIGNUP,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};
