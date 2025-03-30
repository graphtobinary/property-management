export const getDaysFromMilliseconds = (time: number) => {
  return Number(time / (1000 * 60 * 60 * 24));
};

export const validateEmail = (value: string) => {
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    value
  );
  return isValidEmail;
};
