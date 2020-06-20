import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";

const Cards2 = ({ data }) => {
  if (!data.confirmed) {
    return "Loading ....";
  }

  const getTitle = (item) => {
    switch (item) {
      case "confirmed":
        return "Infected";
      case "recovered":
        return "Recovered";
      case "deaths":
        return "Deaths";
      case "active":
        return "ACTIVE CASES";
      case "critical":
        return "CLOSED CASES";
      default:
        return "Nothing";
    }
  };

  const getDescription = (item) => {
    switch (item) {
      case "confirmed":
        return "Number of total confirmed cases of COVID-19";
      case "recovered":
        return "Number of recoveries cases of COVID-19";
      case "deaths":
        return "Number of deaths casued by COVID-19";
      case "active":
        return "Currently Infected Patients";
      case "critical":
        return "Cases which had an outcome";
      default:
        return "Nothing";
    }
  };

  const getClasName = (item) => {
    switch (item) {
      case "confirmed":
        return styles.infected;
      case "recovered":
        return styles.recovered;
      case "deaths":
        return styles.deaths;
      case "active":
        return styles.active;
      case "critical":
        return styles.closed;
      default:
        return "Nothing";
    }
  };

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        {Object.entries(data)
          .filter((item) => item[0] !== "lastUpdate")
          .map((item, i) => {
            return (
              <Grid
                item
                component={Card}
                xs={12}
                md={3}
                className={cx(styles.card, `${getClasName(item[0])}`)}
                key={i}
              >
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    {getTitle(item[0])}
                  </Typography>
                  <Typography variant="h5">
                    <CountUp
                      start={0}
                      end={
                        item[0] === "critical"
                          ? data.recovered + data.deaths
                          : item[1]
                      }
                      duration={2.75}
                      separator=","
                    />
                  </Typography>

                  <Typography color="secondary">
                    {new Date(data.lastUpdate).toDateString()}{" "}
                    {new Date(data.lastUpdate).toLocaleTimeString()}
                  </Typography>
                  <Typography variant="body2">
                    {getDescription(item[0])}
                  </Typography>
                  {item[0] === "critical" || item[0] === "active" ? (
                    <React.Fragment>
                      <br />
                      <Typography>
                        <CountUp
                          start={0}
                          end={
                            item[0] === "critical"
                              ? data.recovered
                              : data.active - data.critical
                          }
                          duration={2.75}
                          separator=","
                          style={{
                            color:
                              item[0] === "critical" ? "#8ACA2B" : "#8080FF",
                          }}
                        />{" "}
                        <b style={{ fontSize: "12px" }}>
                          {item[0] === "critical"
                            ? "(" +
                              (
                                (data.recovered /
                                  (data.recovered + data.deaths)) *
                                100
                              ).toFixed(2) +
                              "%)"
                            : "(" +
                              (
                                ((data.active - data.critical) / data.active) *
                                100
                              ).toFixed(2) +
                              "%)"}
                        </b>
                        <br />
                        {item[0] === "critical"
                          ? "Recovered / Discharged"
                          : "in Mild Condition"}
                      </Typography>
                      <br />
                      <Typography>
                        <CountUp
                          start={0}
                          end={
                            item[0] === "critical" ? data.deaths : data.critical
                          }
                          duration={2.75}
                          separator=","
                          style={{ color: "gray" }}
                        />{" "}
                        <b style={{ fontSize: "12px" }}>
                          {item[0] === "critical"
                            ? "(" +
                              (
                                (data.deaths / (data.recovered + data.deaths)) *
                                100
                              ).toFixed(2) +
                              "%)"
                            : "(" +
                              ((data.critical / data.active) * 100).toFixed(2) +
                              "%)"}
                        </b>
                        <br />
                        {item[0] === "critical"
                          ? "Deaths"
                          : "Serious or Critical"}
                      </Typography>
                    </React.Fragment>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default Cards;
