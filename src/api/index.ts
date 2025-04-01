import ApiException from "./Api.exception";
import { isBrowser, replaceParamInString } from "../utils/utils";

export const GetCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") {
    return undefined;
  }
  const nameEQ = name + "=";
  const ca = document?.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return undefined;
};

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

interface Params {
  [key: string]: unknown;
  isAbsUrl?: boolean;
}

const doCall = async (
  uri: string,
  params: Params = {},
  option: FetchOptions = { headers: {} }
): Promise<unknown> => {
  const { isAbsUrl, ...restParams } = params;
  uri = replaceParamInString(uri, restParams);

  let url = "";
  if (isAbsUrl) {
    url = uri;
  } else if (isBrowser()) {
    url = import.meta.env.VITE_BASE_API_ENDPOINT + uri;
  } else {
    url = import.meta.env.VITE_BASE_API_ENDPOINT + uri.replace(/^\/api/, "");
  }

  const headers: HeadersInit = {
    "content-type": "application/json",
    ...option.headers,
  };

  return fetch(url, { ...option, headers }).then(async (response) => {
    if (!response.ok) {
      const res = await response.json();
      const message = isBrowser()
        ? res.error?.message || `Request: ${uri} ${response.statusText}`
        : `Request: ${uri} ${response.statusText}`;

      throw new ApiException(message, response.status, {
        ...res.error,
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return response.json();
    }
    if (
      [
        "application/pdf",
        "application/octet-stream",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].some((type) => contentType.includes(type))
    ) {
      return response.url;
    }
    return response.text();
  });
};

export const doGet = (
  uri: string,
  params: Params = {},
  options: FetchOptions = {}
): Promise<unknown> => doCall(uri, params, options);

export const doPost = (
  uri: string,
  params: Params = {},
  options: FetchOptions = {}
): Promise<unknown> => doCall(uri, params, { ...options, method: "POST" });

export const doPatch = (
  uri: string,
  params: Params = {},
  options: FetchOptions = {}
): Promise<unknown> => doCall(uri, params, { ...options, method: "PATCH" });

export const doDelete = (
  uri: string,
  params: Params = {},
  options: FetchOptions = {}
): Promise<unknown> => doCall(uri, params, { ...options, method: "DELETE" });
