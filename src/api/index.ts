import axios from 'axios';

import { isBrowser, replaceParamInString } from 'src/utils/utils';

import { ApiException } from './Api.exception';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: isBrowser()
    ? process.env.BASE_API_ENDPOINT
    : process.env.BASE_API_ENDPOINT?.replace(/^\/api/, ''),
  headers: {
    'Content-Type': 'application/json',
  },
});

// export const GetCookie = (name: string): string | undefined => {
//   if (typeof document === 'undefined') {
//     return undefined
//   }
//   const nameEQ = name + '='
//   const ca = document?.cookie.split(';')
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i]
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length)
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
//   }
//   return undefined
// }

/**
 * A wrapper to call external api's using axios
 * @param {string} uri - resource uri
 * @param {Object} params - params need to be replaced with matched params of the uri
 * @param {Object} option - optional parameter used for passing header, httpMethods and lot more
 */
const doCall = async (
  uri: string,
  params: { [key: string]: any },
  option: { [key: string]: any } = {
    headers: {},
  }
) => {
  const { isAbsUrl, ...restParams } = params;
  uri = replaceParamInString(uri, restParams);

  const url = isAbsUrl ? uri : uri;

  try {
    const response = await axiosInstance({
      ...option,
      url,
      headers: {
        ...option.headers,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message = isBrowser()
        ? error.response?.data?.error?.message || `Request: ${uri} ${error.message}`
        : `Request: ${uri} ${error.message}`;

      const status = error.response?.status || 500;
      const apiError = error.response?.data?.error || {};

      throw new ApiException(message, status, {
        ...apiError,
        status,
      });
    }
    throw error;
  }
};

/**
 * Used for fetching Http Get method resources
 * @param {string} uri - resource uri
 * @param {Object} params - params need to be replaced with matched params of the uri
 * @return {Promise} - a promise of Response with json data
 */
export const doGet = (uri: string, params: object = {}, options?: any): Promise<any> =>
  doCall(uri, params, options);

export const doPost = (uri: string, params: object = {}, options?: any): Promise<any> =>
  doCall(uri, params, { ...options, method: 'POST' });

export const doPatch = (uri: string, params: object = {}, options?: any): Promise<any> =>
  doCall(uri, params, { ...options, method: 'PATCH' });

export const doDelete = (uri: string, params: object = {}, options?: any): Promise<any> =>
  doCall(uri, params, { ...options, method: 'DELETE' });
