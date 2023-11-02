const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, //enable timestamps(createdAt and updatedAt)
    modelName: "user",
  }
);

module.exports = User;
