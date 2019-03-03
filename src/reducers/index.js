import { combineReducers } from "redux";

import { transactions } from "./transactions";
import { searchStatus } from "./search";

const reducers = combineReducers({
  transactions,
  searchStatus
});

export default reducers;
