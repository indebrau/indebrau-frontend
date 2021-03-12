/* eslint-disable no-undef */
// Needed to reference a variable that was defined in the .env file and make it available at build time
require('dotenv').config();
module.exports = {
  env: {
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
  },
};
