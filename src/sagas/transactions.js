import { takeEvery, put } from "redux-saga/effects";
import { actions, types } from "../actions";

const tranAPI = account => {
  const etherscanAPIKey = "D181DZZYNHEWNN9R76CPGUVNGM53YSBF97";
  return (
    "http://api.etherscan.io/api?module=account&action=txlist&address=" +
    account +
    "&apikey=" +
    etherscanAPIKey
  );
};

export function* getTransactions({ payload: { address } }) {
  let responseBody;
  try {
    const response = yield fetch(tranAPI(address));
    responseBody = yield response.json();
    if (
      responseBody.status !== "1" &&
      responseBody.message !== "No transactions found"
    ) {
      yield put(actions.getTransactions.failure(responseBody.result));
      return;
    }
  } catch (e) {
    yield put(actions.getTransactions.failure(e));
  }
  yield put(actions.getTransactions.success(responseBody.result));
}

export default function* watchTransactionSagas() {
  yield takeEvery(types.GET_TRANSACTIONS.CALL, getTransactions);
}
