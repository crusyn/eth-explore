import React from "react";
import { Component } from "react";

const Transaction = ({ transaction }) => {
  console.log(transaction);
  console.log(transaction.from);
  return (
    <p>
      from: {transaction.from} to: {transaction.to} amt: {transaction.value}
    </p>
  );
};

//{transactions.map((tran, i) => (

const AllTransactions = ({ transactions }) => {
  console.log(transactions);
  //const tran = transactions;
  return (
    <div>
      This is where all the transactions will go:
      {transactions.map((tran, i) => (
        <Transaction transaction={tran} />
      ))}
    </div>
  );
};

export default AllTransactions;
