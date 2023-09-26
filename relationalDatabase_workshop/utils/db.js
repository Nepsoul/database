const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// to secure database connection before actual startup
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to database");
  } catch (err) {
    console.log("failed to connect to database");
    return process.exit(1);
  }
  return null;
};

module.exports = { sequelize, connectToDatabase };
