import { types } from "../actions";

//TODO: remove this one saga is working
const initTestData = [
  {
    blockNumber: 65204,
    timeStamp: "1439232889",
    hash: "0x98beb27135aa0a25650557005ad962919d6a278c4b3dde7f4f6a3a1e65aa746c",
    nonce: "0",
    blockHash:
      "0x373d339e45a701447367d7b9c7cef84aab79c2b2714271b908cda0ab3ad0849b",
    transactionIndex: "0",
    from: "0x3fb1cd2cd96c6d5c0b5eb3322d807b34482481d4",
    to: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
    value: "0",
    gas: "122261",
    gasPrice: "50000000000",
    isError: "0",
    txreceipt_status: "",
    input:
      "0xf00d4b5d000000000000000000000000036c8cecce8d8bbf0831d840d7f29c9e3ddefa63000000000000000000000000c5a96db085dda36ffbe390f455315d30d6d3dc52",
    contractAddress: "",
    cumulativeGasUsed: "122207",
    gasUsed: "122207",
    confirmations: "7210022"
  },
  {
    blockNumber: 65204,
    timeStamp: "1439232889",
    hash: "0x98beb27135aa0a25650557005ad962919d6a278c4b3dde7f4f6a3a1e65aa746c",
    nonce: "0",
    blockHash:
      "0x373d339e45a701447367d7b9c7cef84aab79c2b2714271b908cda0ab3ad0849b",
    transactionIndex: "0",
    from: "0x3fb1cd2cd96c6d5c0b5eb3322d80ddd448248ddd",
    to: "0xde0b295669a9fd93d5f28d9ec85eddd4cb697aaa",
    value: "10",
    gas: "122261",
    gasPrice: "50000000000",
    isError: "0",
    txreceipt_status: "",
    input:
      "0xf00d4b5d000000000000000000000000036c8cecce8d8bbf0831d840d7f29c9e3ddefa63000000000000000000000000c5a96db085dda36ffbe390f455315d30d6d3dc52",
    contractAddress: "",
    cumulativeGasUsed: "122207",
    gasUsed: "122207",
    confirmations: "7210022"
  }
];

const initialState = initTestData;

export const transactions = (state = initialState, action) => {
  switch (action.type) {
    //TODO: add loading logic and success/failure logic
    case types.GET_TRANSACTIONS.CALL:
      return state;
    default:
      return state;
  }
};
