const app = require("express").Router();
const { Blog, User } = require("../models/index");
const { blogFinder, tokenExtractor } = require("../util/middleware");

app.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

app.get("/:id", blogFinder, async (req, res, next) => {
  // const blog = await Blog.findByPk(req.params.id);
  if (req.blog) {
    console.log(req.blog.toJSON());
    res.json(req.blog);
  } else {
    res
      .status(404)
      .json({ message: `blog not found for this id ${req.params.id}` })
      .end();
  }
});

app.post("/", tokenExtractor, async (req, res, next) => {
  console.log(req.body);
  try {
    // const user = await User.findOne();
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    }); //add foreign key,i.e. userId to show creator of post
    res.json(blog);
  } catch (error) {
    next(error);
    // return res.status(400).json({ error }).end();
  }
});

app.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  //sequalize method using sql query, converting into sql query
  // const blog = await Blog.destroy({ where: { id: req.params.id } });
  // res.json(blog);

  // const id = req.params.id;

  try {
    // const result = await Blog.findByPk(id); //sequalize method
    if (req.blog.userId !== req.decodedToken.id) {
      res.status(401).json({ message: "user not authorized to do action" });
    } else {
      await req.blog.destroy();
      res.status(204).end();
    }
  } catch (error) {
    next(error);
    // res.status(500).send("error occured while deleting the blog").end();
  }
});

app.put("/:id", blogFinder, async (req, res, next) => {
  // const blog = await Blog.findByPk(req.params.id);
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = app;
