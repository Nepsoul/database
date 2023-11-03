const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { SECRET } = require("../util/config");

const longinRouter = require("express").Router();
const User = require("../models/user");

longinRouter.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({ where: { username: body.username } });
  const passwordCorrect = body.password === "secret";

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = longinRouter;
