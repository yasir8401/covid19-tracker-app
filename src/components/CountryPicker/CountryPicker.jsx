import React, { useState, useEffect } from "react";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, [setCountries]);

  console.log(countries);
  return (
    <FormControl className={styles.formControl}>
      <Select
        defaultValue=""
        displayEmpty
        onChange={(e) => {
          handleCountryChange(e.target.value);
        }}
      >
        <MenuItem value="">Global</MenuItem>
        {countries.map((country, i) => {
          return (
            <MenuItem key={i} value={country.country}>
              <img
                src={country.countryInfo.flag}
                alt=""
                width={24}
                style={{ marginRight: "10px" }}
              ></img>
              {country.country}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CountryPicker;
