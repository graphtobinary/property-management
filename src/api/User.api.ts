import { UpdateUserDataProps } from "../interfaces";
import { getHeaders } from "../utils/utils";
import API_CONSTANTS from "./constants";
import { doPost } from "./index";

export const signupUser = (formData: { email: string; password: string }) => {
  return doPost(
    API_CONSTANTS.USER_SIGNUP,
    {},
    {
      body: JSON.stringify(formData),
    }
  );
};

export const verifyEmail = (formData: { invitation_token: string }) => {
  return doPost(
    API_CONSTANTS.SIGNUP_VERIFY,
    {},
    {
      body: JSON.stringify(formData),
    }
  );
};

export const loginUser = (formData: { email: string; password: string }) => {
  return doPost(
    API_CONSTANTS.USER_LOGIN,
    {},
    {
      headers: {},
      body: JSON.stringify(formData),
    }
  );
};

export const getUser = (accessToken: string) => {
  return doPost(
    API_CONSTANTS.GET_USER,
    {},
    {
      headers: getHeaders(accessToken),
      body: JSON.stringify({}),
    }
  );
};

export const patchUser = (formData: UpdateUserDataProps) => {
  return doPost(
    API_CONSTANTS.PATCH_USER,
    {},
    {
      headers: getHeaders(),
      body: JSON.stringify(formData),
    }
  );
};
