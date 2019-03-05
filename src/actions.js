export const types = {
  GET_TRANSACTIONS: {
    CALL: "TRANSCATIONS/GET_TRANSACTIONS/CALL",
    SUCCESS: "TRANSCATIONS/GET_TRANSACTIONS/SUCCESS",
    FAILURE: "TRANSCATIONS/GET_TRANSACTIONS/FAILURE"
  },
  SEARCH: {
    CALL: "SEARCH/SEARCH/CALL",
    SUCCESS: "SEARCH/SEARCH/SUCCESS",
    FAILURE: "SEARCH/SEARCH/FAILURE"
  }
};

export const actions = {
  getTransactions: {
    call: (address, startDate = "", endDate = "") => ({
      type: types.GET_TRANSACTIONS.CALL,
      payload: { address, startDate, endDate }
    }),
    success: (transactions, account) => ({
      type: types.GET_TRANSACTIONS.SUCCESS,
      payload: { transactions, account }
    }),
    failure: error => ({
      type: types.GET_TRANSACTIONS.FAILURE,
      payload: { error }
    })
  },
  search: {
    call: query => ({
      type: types.SEARCH.CALL,
      payload: { query }
    }),
    success: (resultType, value) => ({
      type: types.SEARCH.SUCCESS,
      payload: { resultType, value }
    }),
    failure: error => ({
      type: types.SEARCH.FAILURE,
      payload: error
    })
  }
};

export default actions;
