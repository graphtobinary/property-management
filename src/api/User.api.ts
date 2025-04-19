import {
  ForgotPasswordProps,
  ResetPasswordProps,
  UpdateUserDataProps,
} from "../interfaces";
import API_CONSTANTS from "./constants";
import { doPost } from "./index";

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
    API_CONSTANTS.USER_LOGIN,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const getUser = () => {
  return doPost(
    API_CONSTANTS.GET_USER,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );
};

export const patchUser = (formData: UpdateUserDataProps) => {
  return doPost(
    API_CONSTANTS.PATCH_USER,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const forgotPassword = (formData: ForgotPasswordProps) => {
  return doPost(
    API_CONSTANTS.FORGOT_PASSWORD,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};

export const resetPassword = (formData: ResetPasswordProps) => {
  return doPost(
    API_CONSTANTS.RESET_PASSWORD,
    {},
    {
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
};
