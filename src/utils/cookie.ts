import Cookies from 'js-cookie';

const COOKIE_CONFIG = {
  expires: 7, // days
  secure: true,
  sameSite: 'strict'
} as const;

export const setCookie = (name: string, value: string) => {
  Cookies.set(name, value, COOKIE_CONFIG);
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

export const AUTH_COOKIES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;
