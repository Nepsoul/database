const { Blog } = require("../models");
const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const noHandler = (req, res) => {
  res.status(404).send("<h1>No routes found for this request</h1>");
};

const unKnownPoint = (req, res) => {
  res.status(404).send({ error: "unknown point" });
};

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === "SequelizeValidationError") {
    return res.status(400).send(error.message);
  }
  if (error.name === "SyntaxError") {
    return res.status(400).send(error.message);
  }
  if (error.name === "TypeError") {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === "Validation error") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

module.exports = {
  blogFinder,
  tokenExtractor,
  noHandler,
  unKnownPoint,
  errorHandler,
};
