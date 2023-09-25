require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const express = require("express");
const app = express();

app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

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
      default: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  // console.log(req.body);

  const blog = await Blog.create(req.body);
  console.log(blog);
  res.json(blog);
});

app.delete("/api/blogs/:id", async (req, res) => {
  // const id = req.params.id;
  const blog = await Blog.destroy({ where: { id: req.params.id } }); //sql query
  res.json(blog);
});
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
