const userRouter = require("express").Router();

const { User } = require("../models");

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    return res.status(400).json({ message: "error in get api" }).end();
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "error" }).end();
  }
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json();
  } else {
    res.status(404).end();
  }
});

userRouter.put("/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      user.username = req.body.username;
      user.save();
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ message: "error" }).end();
  }
});

module.exports = userRouter;
