const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

//connecting to database
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { sequelize };
