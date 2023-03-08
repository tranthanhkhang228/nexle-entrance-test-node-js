// only called once at entry point
const result = require('dotenv').config();

if (!result.error) {
  Object.keys(result.parsed).forEach((key) => {
    const value = result.parsed[key];
    if (value) {
      process.env[key] = value;
    }
  });
}
