const router = require("express").Router();

const { tokenExtractor } = require("../utils/middleware");
const { User, Note, Team } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      { model: Note }, //to include all notes, created by user

      { model: Team, attributes: ["name", "id"], through: { attributes: [] } }, //to not show membership detail, through table []
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    return res.status(400).json({ err });
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      { model: Note }, //show all note of user
      {
        model: Note,
        as: "marked_notes",
        attributes: { exclude: ["userId"] },
        through: { attributes: [] },
        include: { model: User, attributes: ["name"] },
      },
      { model: Team, attributes: ["name", "id"], through: { attributes: [] } },
    ],
  });
  if (user) {
    res.json({ user });
  } else {
    res.status(404).end();
  }
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
