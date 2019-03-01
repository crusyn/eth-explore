import { types } from "../actions";

const initialState = [];

export const transactions = (state = initialState, action) => {
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
