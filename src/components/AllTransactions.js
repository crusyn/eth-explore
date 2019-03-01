import React from "react";
import { SearchContainer } from "../containers";
import EnhancedTable from "./TransactionDataGrid";

const AllTransactions = ({ transactions }) => {
  return (
    <div>
      <SearchContainer />
      <EnhancedTable tranData={transactions} tableName="Transaction Data" />
    </div>
  );
};

export default AllTransactions;
