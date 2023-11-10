const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../util/db");

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      // validate: { isInt: true },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 1991, max: new Date().getFullYear() },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    underscored: true,
    timestamps: true, //enable timestamps(createdAt and updatedAt)
    modelName: "blog",
  }
);

module.exports = Blog;
