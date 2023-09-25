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

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    console.log(blog.toJSON());
    res.json(blog);
  } else {
    res
      .status(404)
      .json({ message: `blog not found for this id ${req.params.id}` })
      .end();
  }
});

app.post("/api/blogs/", async (req, res) => {
  // console.log(req.body);

  try {
    const blog = await Blog.create(req.body);
    console.log(blog);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  // const blog = await Blog.destroy({ where: { id: req.params.id } }); //sql query
  // res.json(blog);

  const id = req.params.id;
  try {
    const result = Blog.findByPk(id); //sequalize method
    if (result) {
      await result.destroy();
    }
    res.status(204).json({ message: "blog deleted successfully" }).end();
  } catch (error) {
    res.status(500).send("error occured while deleting the blog").end();
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
