require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: 3001,
  SECRET: process.env.SECRET,
};
