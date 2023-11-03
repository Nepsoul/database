require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  SECRET: process.env.SECRET,
  PORT: 3003 || process.env.PORT,
};
