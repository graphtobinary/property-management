export const getDaysFromMilliseconds = (time: number) => {
  return Number(time / (1000 * 60 * 60 * 24));
};
