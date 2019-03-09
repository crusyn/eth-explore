# Eth Explore

A block explorer with a transaction summary for quick analysis.

## running the app

1. clone the repo `git clone git@github.com:crusyn/eth-explore.git`
2. `cd eth-explore`
3. run `npm install`
4. run `npm start`
5. the app will load at http://localhost:3000.

## usage

This block explorer was built for folks who want transaction summary information for ethereum accounts.

Many users like to review aggregate ethereum transaction summary information and/or filter it for a specific date range.

Miners often have large amounts of incoming and outgoing transactions to and from their addresses. The best way I know of to analyze this actual return data today is to download a CSV of the transactions and do some analysis in your favorite spreadsheet app. This app hopes to make this quicker and easier!

### search

A user can search for an address by entering it into the search text area at the top of the window.

### filter dates

A user can filter transaction data to see a summary and underlying transactions. A filter can be made up of a start date, end date or both.

### transactions

Transactions are listed in the third card in a data table. The data table can be sorted on any field. Transactions can also be selected, but this doesn't do anything yet :).

### browser bookmarks and links

The application is driven by the browser URL in the following form:
`domain.com/{ethereumAddress}?start={startTime}&end={endTime}`

A user can bookmark a particular address with or without filters to reference them at a later time.

## architecture

This is a react application using redux & saga for state management.

### react components

The `containers/AllTransactionsContainer.js` and `components/AllTransactions.js` contain all other components in the app.

### redux

This app uses redux to make it easy to understand the applications data flow and state transitions.

#### overall application flow

1. _User Query or Filter_ - The user searches for an _ethereum address_ or _filters the current view with a date range_.
2. _Action Dispatched_ - The search or filter form submit dispatches a `SEARCH/` or `FILTER/` action to the store.

_Valid Action_ - If the action is valid the corresponding saga will push the `address` or `startDate` and/or `endDate` to the browser history and a `/SUCCESS` action.

_Invalid Action_ - If the input is invalid it will push a `/FAILURE` action with the corresponding error. The source component will display the error to the user.

3. In the case of a _Valid Action_ a `connected-react-router` pushes a `@@router/CALL_HISTORY_METHOD` change to the /{address} or ?queryParams

4. _Location Change_ - If the location changes the `AllTransactionsContainer` lifecycle method hears the location change and dispatches a `TRANSACTIONS/GET_TRANSACTIONS/CALL` with the new `address`, `startDate`, and/or `endDate` from the URL.

5. _Reducers in Loading State_ - The .loading members of the `account` and `transactions` reducers will be set to `true` and the `TransactionDataGrid` and `Transaction Summary` will show a loading progress animation.

6. _GET_TRANSACTIONS_ - The [`sagas/transactions.js`](https://github.com/crusyn/eth-explore#sagastransactionsjs-saga) tries to get account and transaction data from etherscan, filters, and does some calcs.

_SUCCESS_ - If `GET_TRANSACTIONS/CALL` succeeds the account and transactions reducers update the store

_FAILURE_ - If the `GET_TRANSACTIONS/CALL` fails the account and transactions reducers do not make changes to the core state.

Either way the `.loading` member is set to `false`.

7. _Components Updated_ - The `Transaction Summary` and `TransactionDataGrid` loading animation is replaced with rendered `account` and `transactions` data from the store.

### reducers

There are three reducers:

1. _transactions_ - store transactions for a particular address
2. _account_ - stores account related information including `address`, `balance`, and aggregate transaction information.
3. _search_ - the search reducers manages the state of search.

#### `actions.js`

All actions that can be dispatched to the store and related types are listed in `actions.js`.

Each action type can be in three states:

1. _CALL_ - a request was dispatched to the store. The payload is the contents of the request.
2. _SUCCESS_ - the request was successfully fulfilled. The payload is the result of the request.
3. _FAILURE_ - the request fulfillment failed. The payload is the error that caused the request to fail.

### sagas

`redux-saga` is used for API fetches and pushes to the browser history to change the URL. `connected-react-router` is used so that state changes can be dispatched as actions into the store.

#### `sagas/search.js`

The `search.js` saga handles input into the search text field at the top of the app.

It is set up to be able to scale to adding other search terms such as blocks, transaction hashes, etc. The `search.js` saga determines the search type based on the input.

A valid `searchQueryTypes.ADDRESS` search ultimately triggers a change to the address in the URL.

#### `sagas/filter.js`

Similar to search, the filter saga checks the validity of the filter dates and then pushes them to the query string of the URI in the form: `start={startTime}&end={endTime}`

#### `sagas/transactions.js` saga

The Transactions saga is the workhorse of the app and performs all API fetches and state changes for both the account and transaction data.

It also performs calculations to determine transaction aggregates `totalIn`, `totalOut`, `gasFees`, `netChange`, `balanceForward`, and `balanceEndDate`.

If the API fetch fails or etherscan complains about the fetch url the saga dispatches a failure action.

## design

Used Material UI components:

- Material Table components for `TransactionDataGrid`
- Material circular progress loading indicator between transaction and account data fetches
- Typography throughout the app so it can quickly be updated with a new theme

### improvements

#### unit testing

[ ] _Redux & Saga_ - especially for the calcs  
[ ] _Components_

#### design

[ ] _more responsive_ - Test different screen sizes: Clever things such as hiding columns in the table, truncating cell data could be worth doing when the viewport size decreases. The transaction summary components use grids so they work with screen size changes. Should check word wrapping for each component to handle overflow, etc as makes sense.  
[ ] _transaction summary component Design_ - Start and End date balances are a little confusing.  
[ ] _Material UI Improvements_ - Play with the Material UI theme to change overall color palette
[ ] _Table Row Selection_ - Initially had plans to use table row selection to exclude and include transactions in aggregates. Need to remove table row selection or make it useful. Leaving it in without functionality is confusing.

#### state management

[ ] _Validate URL address & query string_ - bad inputs will cause failures in getTransactions.  
[ ] _Add Selectors_ - Cleverly use selectors when possible for filters instead of hitting the API each time.  
[ ] _API pagination_ - Use the pagination feature of etherscan and serve 25 or so transactions at time to the user as they are downloaded to speed up when the user can start looking at data. Stats would have to wait to be loaded after all transactions are downloaded.  
[ ] _Prefetch & Cache Addresses_ - Prefetch transaction and account info for addresses that are listed in the current table view to make navigation within the page nearly instant.  
[ ] _Auto fetch_ - fetch new transactions on an interval, add only recent transactions by sending start blocknumber. Include last updated time on the UI.

#### calculations & data

The transaction summary calculation engine needs more careful testing. If this was a bigger project we would start by building a set of unit tests to see how the engine would perform under some of the following conditions:  
[ ] _Contract addresses_ - balances for contract addresses do not seem to be correct.  
[ ] _Addresses with Block/Uncle rewards_ - block rewards and accrued gas fees do not show up in our block explorer. Most miners will use a mining pool. Mining pool rewards are distributed as normal transactions and will be correctly shown and aggregated.  
[ ] _> 10k transactions_ - the api will only serve 10k transactions at a time. If there are more than 10k transactions aggregates will not be correct. Use start and end block params to load 10k at a time.  
[ ] _Negative start balance_ - there are instances where the start balance is negative. This would need to be investigated. It doesn't seem to happen with ordinary accounts.

#### product

[ ] _Transaction selection_ - allow users to select transactions to exclude or summarize  
[ ] _Copy Address_ - Copy Address to clipboard  
[ ] _Last Updated_ - Add last updated time for each card  
[ ] _Address watchlist_ - label addresses for future use  
[ ] _Change addresses, address groups, and comments_ - allow users to group addresses in groups and aggregate as if it was one account  
[ ] _Save settings to file_ - keep it decentralized :). settings including watched addresses, change address, address groups, exclusions, comments can be uploaded back. The app won't keep any user search history or data. this has the added benefit of keeping this a frontend only app with no db or server

#### documentation

[ ] use a js doc framework
