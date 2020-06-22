import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Chart2 = ({ fetchedDailyData: { perDayNewCasesDeaths }, country }) => {
  const classes = useStyles();

  const dailyConfirmedBarChart = perDayNewCasesDeaths ? (
    <Bar
      data={{
        labels: perDayNewCasesDeaths.map(({ date }) => date),
        datasets: [
          {
            label: "Daily Cases",
            backgroundColor: "#808080",
            data: perDayNewCasesDeaths.map(
              ({ new_confirmed }) => new_confirmed
            ),
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Daily New Cases in ${country ? country : "World"}`,
          fontSize: 16,
        },
      }}
    />
  ) : null;

  const dailyDeathBarChart = perDayNewCasesDeaths ? (
    <Bar
      data={{
        labels: perDayNewCasesDeaths.map(({ date }) => date),
        datasets: [
          {
            label: "Daily Deaths",
            backgroundColor: "#808080",
            data: perDayNewCasesDeaths.map(({ new_deaths }) => new_deaths),
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Daily New Deaths in ${country ? country : "World"}`,
          fontSize: 16,
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>{dailyConfirmedBarChart}</Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>{dailyDeathBarChart}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chart2;
