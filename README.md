# Eth Explore

## running the app

You can run eth explore by running `npm install` to install any dependencies and then `npm start`.

## usage

This block explorer was built for folks would want transaction summary information for ethereum accounts.

Many users especially miners would like to review aggregate ethereum transaction summary information for a specific period in time.

### search

A user can search for an address by entering it into the search text area at the top of the window.

### filter dates

A user can filter transaction data to see a summary and underlying transactions

The application is driven by the URI in the following form:
`domain.com/{ethereumAddress}?start={startTime}&end={endTime}`

A user can bookmark a particular address with or without filters to reference them at a later time.

## architecture

The application is driven by the URI.

The `AllTransactionsContainer` and `Component` contain all other components in the app.

Lifecycle methods on the `AllTransactionsContainer` listen for location changes and update the app based on address and filter terms.

### redux

Using redux & saga for async actions and side effects.

#### `actions.js`

All actions and related types are listed in `actions.js`.

#### `search` saga

Set up to be able to scale to adding other search terms such as blocks, transaction hashes, etc. The `search` saga determines the search type based on the input.

I put this into a saga because I thought I may want to call an endpoint to validate an input. This can probably just be a reducer.

A valid input is pushed to the URI, which triggers a pull from the API.

#### `filter` saga

Similar to search, the filter saga checks the validity of the filter dates and then pushes them

#### `transactions` saga

The Transactions saga is the workhorse of the app and performs all API fetches and state changes for both the account and transaction data.

It also performs calculations to determine transaction aggregates `totalIn`, `totalOut`, `gasFees`, `netChange`, `balanceForward`, and `balanceEndDate`.

### improvements

#### documentation

#### unit testing - jest

[ ] Redux & Saga - especially for the calcs
[ ] Components

#### design

[ ] More responsive - Test different screen sizes. I could do clever things such as hide columns in the table, truncate cell data. The transaction summary components use grids so they work with screen size changes. Would have to carefully check word wrapping for each component to handle overflow, etc as makes sense.
[ ] Transaction Summary Component Design - Spend more time improving the design of this component. Start and End date balances are a little confusing, and the overall design leaves something to be desired.
[ ] Design - I used Material UI components. I included a Material circular progress loading indicator. Used Typography throughout the app so it can quickly be updated with a new theme. With more time we could play with the Material UI theme to change overall color palette.

#### calculations & data

The transaction summary calculation engine was not carefully tested. If this was a bigger project we would probably start by building a set of unit tests to see how the engine would perform under the following conditions:
[ ] Validate address & query string validity pulled from URI - bad inputs will cause failures in getTransactions.
[ ] Contract addresses - balances for contract addresses do not seem to be correct.
[ ] Block/Uncle rewards - block rewards and accrued gas fees do not show up in our block explorer. Most miners will use a mining pool. So their rewards are distributed as normal transactions.
[ ] > 10k transactions - the api will only serve 10k transactions at a time. If we needed more than that we would have to use start and end block params to load 10k at a time. If there are more than 10k transactions aggregates will not be correct.
[ ] Negative start balance - there are instances where the start balance is negative. This would need to be investigated. It doesn't seem to happen with ordinary accounts.

#### state management

[ ] Selectors - Use selectors for filters instead of hitting the API each time.
[ ] API pagination - It would improve the user experience to use the pagination feature of etherscan and serve 25 or so transactions at time to the user as they are downloaded. Stats would have to wait to be loaded after all transactions are downloaded.
[ ] Prefetch Addresses - Prefetch addresses that are linked
[ ] Auto fetch - fetch new transactions & on an interval, add only recent transactions by sending start blocknumber

#### product

[ ] Transaction selection - allow people to select transactions to exclude or summarize
[ ] Copy Address to clickboard
[ ] Add last updated time for each card
[ ] Address watchlist
[ ] Change addresses
[ ] Save settings to file - keep it decentralized :). The app won't keep any user search history or data. Also means we can just deploy to an s3 bucket.
