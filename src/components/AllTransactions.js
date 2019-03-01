import React from "react";

const Transaction = ({ transaction }) => {
  return (
    <p>
      from: {transaction.from} to: {transaction.to} amt: {transaction.value}
    </p>
  );
};

//{transactions.map((tran, i) => (

const AllTransactions = ({ transactions }) => {
  return (
    <div>
      This is where all the transactions will go:
      {transactions.map((tran, i) => (
        <Transaction transaction={tran} key={i} />
      ))}
    </div>
  );
};

export default AllTransactions;
