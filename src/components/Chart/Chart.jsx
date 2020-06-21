import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({
  data: { confirmed, recovered, deaths },
  country,
  fetchedDailyData,
}) => {
  let [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async (data, country) => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `Historical Data of ${country ? country : "World"}`,
          fontSize: 16,
        },
      }}
    />
  ) : null;
  const lineChartCountry = fetchedDailyData.length ? (
    <Line
      data={{
        labels: fetchedDailyData.map(({ date }) => date),
        datasets: [
          {
            data: fetchedDailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: fetchedDailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
      options={{
        title: {
          display: true,
          text: `Historical Data of ${country ? country : "World"}`,
          fontSize: 16,
        },
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255, 0.5)",
              "rgba(0,255,0, 0.5)",
              "rgba(255,0,0, 0.5)",
            ],
            data: [confirmed, recovered, deaths],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current State in ${country ? country : "World"}`,
          fontSize: 16,
        },
      }}
    />
  ) : null;

  return (
    <React.Fragment>
      {country ? (
        <React.Fragment>
          <div className={styles.container}> {barChart}</div>
          <br />
          <div className={styles.container}> {lineChartCountry}</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={styles.container}> {barChart}</div>
          <br />
          <div className={styles.container}> {lineChart}</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Chart;
