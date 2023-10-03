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

// to secure successful database connection before actual startup
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connect to database");
  } catch (err) {
    console.log("failed to connect to database");
    return process.exit(1);
  }
  return null;
};
module.exports = { sequelize, connectToDatabase };
