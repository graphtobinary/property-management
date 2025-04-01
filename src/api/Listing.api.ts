import API_CONSTANTS from "./constants";
import { doPost } from "./index";

export const getCountryList = () => {
  return doPost(
    API_CONSTANTS.GET_COUNTRY_LIST,
    {},
    {
      body: JSON.stringify({}),
    }
  );
};
