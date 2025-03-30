export const getDaysFromMilliseconds = (time: number) => {
  return Number(time / (1000 * 60 * 60 * 24));
};

export const validateEmail = (value: string) => {
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value
  );
  return isValidEmail;
};

export const isBrowser = () => typeof window !== "undefined";

export const replaceParamInString = (
  str: string,
  params: { [key: string]: unknown }
): string => {
  const regexReqParam = /[^{]+(?=})/g;
  const matches = str.match(regexReqParam) || [];
  let changedUrl = str;
  matches.forEach((match) => {
    const param = params[match] !== undefined ? params[match] : "";
    // todo fix typescript error
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    changedUrl = changedUrl.replace(`{${match}}`, param);
  });
  return changedUrl;
};
