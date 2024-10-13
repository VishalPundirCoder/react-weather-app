import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const fetchSpecificCities = () => {
    const specificCities = [
     
    ];

    return {
      options: specificCities.map(city => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const loadOptions = async (inputValue) => {
    if (!inputValue) {
      return fetchSpecificCities();
    }

      const response = await fetch(
        `https://weatherapi-khn2.onrender.com/api/cities?namePrefix=${inputValue}`
      );

    const data = await response.json();
    return {
      options: data.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
