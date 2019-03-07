import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import { Progress } from "./";

import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import PropTypes from "prop-types";

import { formatEthValue, timeStampDateFormat } from "../utils";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 16
  },
  body: {
    fontSize: 14
  },
  root: {
    outline: "none"
  }
}))(TableCell);

const OpTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 30
  }
}))(TableCell);

const TransactionSummary = ({ classes, account }) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>
        <Toolbar>
          <Typography variant="h6">{"" + account.address}</Typography>
        </Toolbar>
      </div>
      {account.loading ? (
        <Progress />
      ) : (
        <div className={classes.main}>
          <div>
            <Typography variant="subheading">balances</Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>
                    {account.startDate || account.endDate
                      ? timeStampDateFormat(account.startDate)
                      : "latest"}
                  </CustomTableCell>
                  <CustomTableCell>
                    {account.endDate
                      ? timeStampDateFormat(account.endDate)
                      : ""}{" "}
                  </CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.row}>
                  <CustomTableCell align="right">
                    {account.startDate || account.endDate
                      ? formatEthValue(account.balanceForward)
                      : formatEthValue(account.balance)}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {account.endDate
                      ? formatEthValue(account.balanceEndDate)
                      : ""}
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div>
            <Typography variant="subheading">transaction totals</Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>In</CustomTableCell>
                  <OpTableCell>-</OpTableCell>
                  <CustomTableCell>Out</CustomTableCell>
                  <OpTableCell>-</OpTableCell>
                  <CustomTableCell>Gas</CustomTableCell>
                  <OpTableCell>=</OpTableCell>
                  <CustomTableCell>Net</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow className={classes.row}>
                  <CustomTableCell align="right">
                    {formatEthValue(account.totalIn)}
                  </CustomTableCell>
                  <CustomTableCell />
                  <CustomTableCell align="right">
                    {formatEthValue(account.totalOut)}
                  </CustomTableCell>
                  <CustomTableCell />
                  <CustomTableCell align="right">
                    {formatEthValue(account.gasFees)}
                  </CustomTableCell>
                  <CustomTableCell />
                  <CustomTableCell align="right">
                    {formatEthValue(account.netChange)}
                  </CustomTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </Paper>
  );
};

TransactionSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionSummary);
