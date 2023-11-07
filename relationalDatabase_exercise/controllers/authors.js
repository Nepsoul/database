const authorRouter = require("express").Router();

const { Blog } = require("../models");
const { sequelize } = require("../util/db");

authorRouter.get("/", async (req, res, next) => {
  try {
    const blog = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("title")), "articles"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [["likes", "DESC"]],
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = authorRouter;
