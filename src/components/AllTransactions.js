import React from "react";
import { SearchContainer, FilterContainer } from "../containers";
import EnhancedTable from "./TransactionDataGrid";
import { TransactionSummary } from "./";

const AllTransactions = ({ account, transactions, match }) => {
  return (
    <div>
      <SearchContainer />
      <TransactionSummary account={account} />
      <EnhancedTable
        tranData={transactions}
        tableName="Transaction Data"
        ethAddress={match.params.address}
      />
      <FilterContainer />
    </div>
  );
};

export default AllTransactions;
