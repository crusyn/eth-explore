import React from "react";
import { SearchContainer } from "../containers";
import EnhancedTable from "./TransactionDataGrid";

const AllTransactions = ({ transactions, match }) => {
  return (
    <div>
      <SearchContainer />
      <EnhancedTable
        tranData={transactions}
        tableName="Transaction Data"
        ethAddress={match.params.address}
      />
    </div>
  );
};

export default AllTransactions;
