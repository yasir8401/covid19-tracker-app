import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import ReactTooltip from "react-tooltip";

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if (!confirmed) {
    return "Loading ....";
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5" data-tip="Total Active Cases">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={2}
                separator=","
              />
            </Typography>

            <Typography color="secondary" data-tip="Last Update">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5" data-tip="Total Recovered Cases">
              <CountUp
                start={0}
                end={recovered.value}
                duration={2}
                separator=","
              />
            </Typography>

            <Typography color="secondary" data-tip="Last Update">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveries cases of COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5" data-tip="Total Deaths">
              <CountUp
                start={0}
                end={deaths.value}
                duration={2}
                separator=","
              />
            </Typography>

            <Typography color="secondary" data-tip="Last Update">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths casued by COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <ReactTooltip />
    </div>
  );
};

export default Cards;
