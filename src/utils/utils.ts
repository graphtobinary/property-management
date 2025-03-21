export const isInt = (n: number) => n % 1 === 0;

export const isBrowser = () => typeof window !== 'undefined';

/**
 * Maps url value to the provide params object
 * @param {string} url - url containing the pattern as {} to be replaced by the param value
 * @param {Object} params - contains the map of key {string} value {string} to be mapped against the string
 * @returns {string} - replaced with the value matched against the provide url
 */
export const replaceParamInString = (str: string, params: { [key: string]: any }): string => {
  const regexReqParam = /[^{]+(?=})/g;
  const matches = str.match(regexReqParam) || [];
  let changedUrl = str;
  matches.forEach((match) => {
    const param = params[match] !== undefined ? params[match] : '';
    changedUrl = changedUrl.replace(`{${match}}`, param);
  });
  return changedUrl;
};
