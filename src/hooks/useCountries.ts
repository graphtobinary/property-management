import { useEffect, useState } from "react";
import {
  CountryItemApiProps,
  CountryItemProps,
  CountryProps,
} from "../interfaces";
import { getCountryList } from "../api/Listing.api";

const useCountries = () => {
  const [countries, setCountries] = useState<CountryItemProps[] | []>([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const { countries } = (await getCountryList()) as CountryProps;
      const newData = countries?.map((item: CountryItemApiProps) => {
        return { value: item.id, label: item.name };
      });
      setCountries(newData);
    } catch (error) {
      console.log(error);
    }
  };

  return { countries };
};

export default useCountries;
