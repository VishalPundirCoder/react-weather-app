import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const fetchSpecificCities = () => {
    const specificCities = [
      { latitude: 28.6139, longitude: 77.2090, name: "Delhi", countryCode: "IN" },
      { latitude: 22.5726, longitude: 88.3639, name: "Kolkata", countryCode: "IN" },
      { latitude: 19.0760, longitude: 72.8777, name: "Mumbai", countryCode: "IN" },
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
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
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
