// import fetch from "isomorphic-unfetch";
import ApiException from "./Api.exception";
import { isBrowser, replaceParamInString } from "../utils/utils";

export const GetCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }
  const nameEQ = name + "=";
  const ca = document?.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
};

/**
 * A fetch wrapper to call external api's
 * @param {string} uri - resource uri
 * @param {Object} params -  params need to be replaced with matched params of the uri
 * @param {Object} option - optional parameter used for passing header, httpMethods and lot more, see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
const doCall = async (
  uri: string,
  params: { [key: string]: unknown },
  option: { [key: string]: unknown } = {
    headers: {},
  }
) => {
  const { isAbsUrl } = params;
  uri = replaceParamInString(uri, params);

  let url = "";
  if (isAbsUrl) {
    url = uri;
  } else if (isBrowser()) {
    url = import.meta.env.VITE_BASE_API_ENDPOINT + uri;
  } else {
    // server side
    url = import.meta.env.VITE_BASE_API_ENDPOINT + uri.replace(/^\/api/, "");
  }

  // for client side calls only
  const headers = {};

  return fetch(url, {
    ...option,
    headers: {
      ...headers,
      // todo fix typescript error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ...option.headers,
    },
  }).then((response: Response) => {
    if (response.ok === false) {
      return response.json().then((res) => {
        let message;

        if (isBrowser()) {
          message =
            res.error?.message || `Request: ${uri} ${response.statusText}`;
        } else {
          message = `Request: ${uri} ${response.statusText}`;
        }

        throw new ApiException(message, response.status, {
          ...res.error,
          status: response.status,
        });
      });
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      } else if (
        contentType?.indexOf("application/pdf") !== -1 ||
        contentType?.indexOf("application/octet-stream") !== -1 ||
        contentType?.indexOf("text/csv") !== -1 ||
        contentType?.indexOf(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) !== -1
      ) {
        return response.url;
      } else return response.text();
    }
  });
};

/**
 * Used for fetching Http Get method resources
 * @param {string} uri - resource uri
 * @param {Object} params - params need to be replaced with matched params of the uri
 * @return {Promise} - a promise of Response with json data
 */
export const doGet = (
  uri: string,
  params: object = {},
  options?: unknown
): Promise<unknown> => {
  // todo fix typescript error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return doCall(uri, params, options);
};

export const doPost = (
  uri: string,
  params: object = {},
  options?: unknown
): Promise<unknown> => {
  // todo fix typescript error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return doCall(uri, params, { ...options, method: "POST" });
};

export const doPatch = (
  uri: string,
  params: object = {},
  options?: unknown
): Promise<unknown> => {
  // todo fix typescript error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return doCall(uri, params, { ...options, method: "PATCH" });
};

export const doDelete = (
  uri: string,
  params: object = {},
  options?: unknown
): Promise<unknown> => {
  // todo fix typescript error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return doCall(uri, params, { ...options, method: "DELETE" });
};
