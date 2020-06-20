import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards = ({
  data: { confirmed, recovered, deaths, lastUpdate, active, critical },
}) => {
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
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed}
                duration={2.75}
                separator=","
              />
            </Typography>

            <Typography color="secondary">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              Number of total confirmed cases of COVID-19
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
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered}
                duration={2.75}
                separator=","
              />
            </Typography>

            <Typography color="secondary">
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
            <Typography variant="h5">
              <CountUp start={0} end={deaths} duration={2.75} separator="," />
            </Typography>
            <Typography color="secondary">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">
              Number of deaths casued by COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.active)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              ACTIVE CASES
            </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={active} duration={2.75} separator="," />
            </Typography>

            <Typography color="secondary">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">Currently Infected Patients</Typography>
            <br />
            <Typography>
              <CountUp
                start={0}
                end={active - critical}
                duration={2.75}
                separator=","
                style={{ color: "#8080FF" }}
              />{" "}
              <b style={{ fontSize: "12px" }}>
                ({(((active - critical) / active) * 100).toFixed(2)}%)
              </b>
              <br />
              in Mild Condition
            </Typography>
            <br />
            <Typography>
              <CountUp
                start={0}
                end={critical}
                duration={2.75}
                separator=","
                style={{ color: "red" }}
              />{" "}
              <b style={{ fontSize: "12px" }}>
                ({((critical / active) * 100).toFixed(2)})%
              </b>
              <br />
              Serious or Critical
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={cx(styles.card, styles.closed)}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              CLOSED CASES
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered + deaths}
                duration={2.75}
                separator=","
              />
            </Typography>

            <Typography color="secondary">
              {new Date(lastUpdate).toDateString()}{" "}
              {new Date(lastUpdate).toLocaleTimeString()}
            </Typography>
            <Typography variant="body2">Cases which had an outcome</Typography>
            <br />
            <Typography>
              <CountUp
                start={0}
                end={recovered}
                duration={2.75}
                separator=","
                style={{ color: "#8ACA2B" }}
              />{" "}
              <b style={{ fontSize: "12px" }}>
                ({((recovered / (recovered + deaths)) * 100).toFixed(2)})%
              </b>
              <br />
              Recovered / Discharged
            </Typography>
            <br />
            <Typography>
              <CountUp
                start={0}
                end={deaths}
                duration={2.75}
                separator=","
                style={{ color: "gray" }}
              />{" "}
              <b style={{ fontSize: "12px" }}>
                ({((deaths / (recovered + deaths)) * 100).toFixed(2)})%
              </b>
              <br />
              Deaths
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
