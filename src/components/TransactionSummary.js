import React from "react";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import { formatEthValue } from "../utils";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const TransactionSummary = ({ classes, account }) => {
  const netChange = account.totalIn - account.totalOut - account.gasFees;
  return (
    <Paper className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">{"" + account.address}</Typography>
        <p>Balance: {formatEthValue(account.balance) + " Ether"}</p>
        <p>
          Balance @ EndDate: {formatEthValue(account.balanceEndDate) + " Ether"}
        </p>
        <p>Total In: {formatEthValue(account.totalIn) + " Ether"}</p>
        <p>Total Out: {formatEthValue(account.totalOut) + " Ether"}</p>
        <p>Gas Fees: {formatEthValue(account.gasFees) + " Ether"}</p>
        <p>Net Change: {formatEthValue(netChange) + " Ether"}</p>
        <p>
          Balance Forward:{" "}
          {formatEthValue(account.balance - netChange) + " Ether"}
        </p>
      </div>
    </Paper>
  );
};

TransactionSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionSummary);
