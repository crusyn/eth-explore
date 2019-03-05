import { combineReducers } from "redux";

import { transactions } from "./transactions";
import { searchStatus } from "./search";

import { connectRouter } from "connected-react-router";

const reducers = history =>
  combineReducers({
    transactions,
    searchStatus,
    router: connectRouter(history)
  });

export default reducers;
