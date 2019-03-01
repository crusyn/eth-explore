export const types = {
  GET_TRANSACTIONS: {
    CALL: "TRANSCATIONS/GET_TRANSACTIONS/CALL",
    SUCCESS: "TRANSCATIONS/GET_TRANSACTIONS/SUCCESS",
    FAILURE: "TRANSCATIONS/GET_TRANSACTIONS/FAILURE"
  }
};

export const actions = {
  getTransactions: {
    call: address => ({
      type: types.GET_TRANSACTIONS.CALL,
      payload: { address }
    }),
    success: transactions => ({
      type: types.GET_TRANSACTIONS.SUCCESS,
      payload: { transactions }
    }),
    failure: error => ({
      type: types.GET_TRANSACTIONS.FAILURE,
      payload: { error }
    })
  }
};

export default actions;
