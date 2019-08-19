const plaid = require('plaid');

const plaidClient = new plaid.Client(
  process.env.PLAID_CLIENT_ID,
  process.env.PLAID_SECRET,
  process.env.PUBLIC_KEY,
  plaid.environments.development,
  {
    version: '2019-05-29', // specify API version
  }
);