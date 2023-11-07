const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//sequelize keep track on changes of migration, if not change in migration, does nothing
const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: { glob: "migrations/*.js" },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  console.log("migration up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

// to secure database connection before actual startup
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("connected to database");
  } catch (err) {
    console.log("failed to connect to database");
    return process.exit(1);
  }
  return null;
};

module.exports = { sequelize, connectToDatabase };
