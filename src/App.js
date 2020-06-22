import React, { Component } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData, fetchDailyData } from "./api";
import coronaImage from "./images/image.png";

import { CountryWise } from "./components/CountryWise/CountryWise";

import Chart2 from "./components/Chart/Chart2";

export class App extends Component {
  state = {
    data: {},
    fetchedDailyData: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedDailyData = await fetchDailyData();

    this.setState({ data: fetchedData, fetchedDailyData: fetchedDailyData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    const fetchedDailyData = await fetchDailyData(country);

    this.setState({
      data: fetchedData,
      country: country,
      fetchedDailyData: fetchedDailyData,
    });
  };

  render() {
    const { data, country, fetchedDailyData } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart
          data={data}
          country={country}
          fetchedDailyData={fetchedDailyData}
        />
        <Chart2 country={country} fetchedDailyData={fetchedDailyData} />
        <br />
        <CountryWise />
      </div>
    );
  }
}

export default App;
