import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const covid_url = "https://covid-19.dataflowkit.com/v1";

export const fetchData = async (country) => {
  let _url = url;

  if (country) {
    _url = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(_url);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((countries) => countries.name);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryWiseData = async () => {
  try {
    const { data } = await axios.get(covid_url);

    const modifiedData = data.map((countryWiseData) => ({
      total_active_cases: countryWiseData["Active Cases_text"],
      country: countryWiseData["Country_text"],
      total_confirmed_cases: countryWiseData["Total Cases_text"],
      total_deaths: countryWiseData["Total Deaths_text"],
      total_recovered: countryWiseData["Total Recovered_text"],
      last_update: countryWiseData["Last Update"],
      new_cases: countryWiseData["New Cases_text"],
      new_deaths: countryWiseData["New Deaths_text"],
    }));

    console.log(modifiedData);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
