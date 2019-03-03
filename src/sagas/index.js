import { all, fork } from "redux-saga/effects";
import TransactionSagas from "./transactions";
import SearchSagas from "./search";

export default function* root() {
  yield all([fork(TransactionSagas), fork(SearchSagas)]);
}
