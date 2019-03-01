import { all, fork } from "redux-saga/effects";
import TransactionSagas from "./transactions";

export default function* root() {
  yield all([fork(TransactionSagas)]);
}
