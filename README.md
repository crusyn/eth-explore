# Eth Explore

A block explorer with a transaction summary for quick analysis.

## running the app

You can run eth explore by:

1. running `npm install` to install any dependencies and then
2. `npm start` the app will load at http://localhost:3000.

## usage

This block explorer was built for folks would want transaction summary information for ethereum accounts.

Many users like to review aggregate ethereum transaction summary information and/or filter it for a specific date range.

Miners often have large amounts of incoming and outgoing transactions to and from their addresses. The best way I know of to analyze this actual return data today is to download a CSV of the transactions and do some analysis in your favorite spreadsheet app. This app hopes to make this quicker and easier!

### search

A user can search for an address by entering it into the search text area at the top of the window.

### filter dates

A user can filter transaction data to see a summary and underlying transactions.

The application is driven by the URI in the following form:
`domain.com/{ethereumAddress}?start={startTime}&end={endTime}`

A user can bookmark a particular address with or without filters to reference them at a later time.

## architecture

The application is driven by the URI.

The `AllTransactionsContainer` and `Component` contain all other components in the app.

React lifecycle methods on the `AllTransactionsContainer` listen for location changes and update the app based on address and filter terms.

### redux

Using redux & saga for async actions and side effects.

#### `actions.js`

All actions and related types are listed in `actions.js`.

#### `search` saga

Set up to be able to scale to adding other search terms such as blocks, transaction hashes, etc. The `search` saga determines the search type based on the input.

A valid input is pushed to the URI, which triggers a pull from the API.

#### `filter` saga

Similar to search, the filter saga checks the validity of the filter dates and then pushes them to the query string of the URI in the form: `start={startTime}&end={endTime}`

#### `transactions` saga

The Transactions saga is the workhorse of the app and performs all API fetches and state changes for both the account and transaction data.

It also performs calculations to determine transaction aggregates `totalIn`, `totalOut`, `gasFees`, `netChange`, `balanceForward`, and `balanceEndDate`.

If the API fetch fails or etherscan complains about the fetch url the saga dispatches a failure action.

### improvements

#### unit testing

[ ] Redux & Saga - especially for the calcs
[ ] Components

#### design

[ ] _more responsive_ - Test different screen sizes.

- Clever things such as hiding columns in the table, truncate cell data could be worth doing when the viewport size decreases. The transaction summary components use grids so they work with screen size changes.
- Check word wrapping for each component to handle overflow, etc as makes sense.
  [ ] _transaction summary component Design_ - Start and End date balances are a little confusing.
  [ ] _Material UI Improvements_ - Used Material UI components:
- Material Table components for `TransactionDataGrid`
- Material circular progress loading indicator
- Typography throughout the app so it can quickly be updated with a new theme
- Play with the Material UI theme to change overall color palette
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
[ ] _Address watchlist_ - label addresses for future use.
[ ] _Change addresses, address groups, and comments_ - allow users to group addresses in groups and aggregate as if it was one account.
[ ] _Save settings to file_ - keep it decentralized :). settings including watched addresses, change address, address groups, exclusions, comments can be uploaded back. The app won't keep any user search history or data. this has the added benefit of keeping this a frontend only app with no db or server.

#### documentation

[ ] use a js doc framework
