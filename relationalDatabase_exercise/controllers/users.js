const bcrypt = require("bcrypt");

const userRouter = require("express").Router();

const { User, Blog } = require("../models");

userRouter.get("/", async (req, res) => {
  try {
    //to show all blogs of user
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
    });
    res.json(users);
  } catch (error) {
    return res.status(400).json({ message: "error in get api" }).end();
  }
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ username, name, passwordHash });
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
    // return res.status(400).json({ message: "error" }).end();
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

userRouter.put("/:username", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    });

    if (user) {
      //checking email validation(handle error from server side)
      if (req.body.username && !req.body.username.match(/@gmail\.com$/)) {
        return res.status(400).json({
          error: "Invalid email address. Only Gmail addresses are allowed.",
        });
      }

      user.username = req.body.username;
      user.save();
      res.json(user);
    }
    // else {
    //   res.status(404).end();
    // }
  } catch (error) {
    next(error);
    // return res.status(400).json({ message: "error" }).end();
  }
});

module.exports = userRouter;
