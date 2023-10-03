const app = require("express").Router();

const { Blog } = require("../models/index");

app.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.get("/:id", async (req, res) => {
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

app.post("/", async (req, res) => {
  // console.log(req.body);

  try {
    const blog = await Blog.create(req.body);
    console.log(blog);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error }).end();
  }
});

app.delete("/:id", async (req, res) => {
  //sequalize method using sql query, converting into sql query
  // const blog = await Blog.destroy({ where: { id: req.params.id } });
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

module.exports = app;
