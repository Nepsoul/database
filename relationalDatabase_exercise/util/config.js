require("dotenv").config();

const { Sequelize } = require("sequelize");

//connecting to database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
