import axios from "axios";

//const url = "https://covid19.mathdro.id/api";
//const covid_url = "https://covid-19.dataflowkit.com/v1";
const ninja_url = "https://corona.lmao.ninja";

export const fetchData = async (country) => {
  let _url = `${ninja_url}/v2/all`;

  if (country) {
    _url = `${ninja_url}/v2/countries/${country}`;
  }
  try {
    const {
      data: { cases, recovered, deaths, updated, active, critical },
    } = await axios.get(_url);

    return {
      confirmed: cases,
      recovered,
      deaths,
      lastUpdate: updated,
      active,
      critical,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async (country) => {
  try {
    let _url = `${ninja_url}/v2/historical/all?lastdays=all`;

    if (country) {
      _url = `${ninja_url}/v2/historical/${country}?lastdays=all`;
    }
    let _cases = {};
    let _deaths = {};
    const modifiedData = [];
    const _perDayNewCasesDeaths = [];
    if (country) {
      let {
        data: {
          timeline: { cases, deaths },
        },
      } = await axios.get(_url);
      _cases = cases;
      _deaths = deaths;
    } else {
      const {
        data: { cases, deaths },
      } = await axios.get(_url);
      _cases = cases;
      _deaths = deaths;
    }

    for (var i in _cases) {
      let element = {};
      element.confirmed = _cases[i];
      element.deaths = _deaths[i];
      element.date = i;
      modifiedData.push(element);
    }

    function diff(ary) {
      var newA = [];
      for (var i = 1; i < ary.length; i++) newA.push(ary[i] - ary[i - 1]);
      return newA;
    }

    const dates = Object.keys(_cases);
    const perDayNewCases = diff(Object.keys(_cases).map((key) => _cases[key]));
    const perDayNewDeaths = diff(
      Object.keys(_deaths).map((key) => _deaths[key])
    );

    for (var j = 0; j < perDayNewCases.length; j++) {
      let element = {};
      element.new_confirmed = perDayNewCases[j];
      element.new_deaths = perDayNewDeaths[j];
      element.date = dates[j + 1];
      _perDayNewCasesDeaths.push(element);
    }

    modifiedData.perDayNewCasesDeaths = _perDayNewCasesDeaths;

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${ninja_url}/v2/countries`);

    return data;
    // return data.map((x) => x.country);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountryWiseData = async () => {
  try {
    const { data } = await axios.get(`${ninja_url}/v2/countries`);

    data.sort(function (obj1, obj2) {
      return obj2.cases - obj1.cases;
    });

    const modifiedData = data.map((countryWiseData) => ({
      total_active_cases: countryWiseData["active"],
      country: countryWiseData["country"],
      total_confirmed_cases: countryWiseData["cases"],
      total_deaths: countryWiseData["deaths"],
      total_recovered: countryWiseData["recovered"],
      new_cases: countryWiseData["todayCases"],
      new_deaths: countryWiseData["todayDeaths"],
    }));

    var element = {};
    element.total_active_cases = modifiedData
      .map((x) => x.total_active_cases)
      .reduce((total, record) => record + total);

    element.country = "World";

    element.total_confirmed_cases = modifiedData
      .map((x) => x.total_confirmed_cases)
      .reduce((total, record) => record + total);

    element.total_deaths = modifiedData
      .map((x) => x.total_deaths)
      .reduce((total, record) => record + total);

    element.total_recovered = modifiedData
      .map((x) => x.total_recovered)
      .reduce((total, record) => record + total);

    element.new_cases = modifiedData
      .map((x) => x.new_cases)
      .reduce((total, record) => record + total);

    element.new_deaths = modifiedData
      .map((x) => x.new_deaths)
      .reduce((total, record) => record + total);

    modifiedData.unshift(element);
    //modifiedData.push(element);

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};
