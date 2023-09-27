const app = require("express").Router();
const { Note, User } = require("../models/index");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

app.get("/", async (req, res) => {
  //   const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll();
  // console.log(JSON.stringify(notes))

  res.json(notes);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne();
    const note = await Note.create({ ...req.body, userId: user.id }); //added foreign key, i.e. user id to show creator of post
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    // console.log(req.note) //debugging in terminal
    console.log(req.note.toJSON());
    // console.log(JSON.stringify(req.note, null, 2));
    res.json(req.note);
  } else {
    //   res.status(404).send("no data found")
    res.status(404).end();
  }
});

app.put("/:id", noteFinder, async (req, res) => {
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

app.delete("/:id", noteFinder, async (req, res) => {
  //sequalize method using sql query, converting into sql query
  // in toDelete variable, instead of deleted note id, it gives number of delete note i.e. 1
  //   const toDelete = await Note.destroy({ where: { id: req.params.id } });
  //   res.json(toDelete);

  try {
    if (req.note) {
      await req.note.destroy();
    }
    res
      .status(202) // to show delete message 202 status code, 204 only delete
      .json({ message: `note with id "${req.note.id}" deleted successfully` })
      .end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "error occured while deleting the note" })
      .end();
  }
});

module.exports = app;
