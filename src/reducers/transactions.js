import { types } from "../actions";

const tranInitialState = [];
const accountInitialState = {
  address: "0x0000000000000000000000000000000000000000",
  balance: -1
};

export const transactions = (state = tranInitialState, action) => {
  switch (action.type) {
    case types.GET_TRANSACTIONS.CALL:
      return state; //TODO add loading logic
    case types.GET_TRANSACTIONS.SUCCESS:
      return action.payload.transactions;
    case types.GET_TRANSACTIONS.FAILURE:
      return state; //TODO: maybe do not blow away state is the load fails
    default:
      return state;
  }
};

export const account = (state = accountInitialState, action) => {
  switch (action.type) {
    case types.GET_TRANSACTIONS.CALL:
      return state; //TODO add loading logic
    case types.GET_TRANSACTIONS.SUCCESS:
      return action.payload.account;
    case types.GET_TRANSACTIONS.FAILURE:
      return state; //TODO: maybe do not blow away state is the load fails
    default:
      return state;
  }
};
