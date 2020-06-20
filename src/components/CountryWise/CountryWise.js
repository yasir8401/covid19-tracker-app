import React, { useState, useEffect } from "react";
import { fetchCountryWiseData } from "../../api";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import styles from "./CountryWise.module.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const CountryWise = () => {
  const [countryWiseData, setcountryWiseData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setcountryWiseData(await fetchCountryWiseData());
    };

    fetchAPI();
  }, [setcountryWiseData]);
  const classes = useStyles();
  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Country Name</StyledTableCell>
              <StyledTableCell align="right">Total Cases</StyledTableCell>
              <StyledTableCell align="right">New Cases</StyledTableCell>
              <StyledTableCell align="right">Total Deaths</StyledTableCell>
              <StyledTableCell align="right">New Deaths</StyledTableCell>
              <StyledTableCell align="right">
                Total Active Cases
              </StyledTableCell>
              <StyledTableCell align="right">
                Total Recovered Cases
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countryWiseData
              .filter((row) => row.country !== undefined)
              .map((row, i) => (
                <TableRow key={i}>
                  <StyledTableCell component="th" scope="row">
                    {++i}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.country}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_confirmed_cases}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.new_cases}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_deaths}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.new_deaths}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_active_cases}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.total_recovered}
                  </StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
