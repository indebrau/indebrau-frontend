// Needed to reference a variable that was defined in the .env file and make it available at Build Time
require('dotenv').config()
module.exports = {
  env: {
    ENDPOINT: process.env.BACKEND_ENDPOINT,
  },
}