const app = require("express").Router();
const { Note } = require("../models/index");

app.get("/", async (req, res) => {
  //   const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll();
  // console.log(JSON.stringify(notes))

  res.json(notes);
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  // console.log(note) //debugging in terminal
  console.log(note.toJSON());
  // console.log(JSON.stringify(note, null, 2));

  if (note) {
    res.json(note);
  } else {
    //   res.status(404).send("no data found")
    res.status(404).end();
  }
});

app.put("/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/:id", async (req, res) => {
  //sequalize method using sql query, converting into sql query
  // in toDelete variable, instead of deleted note id, it gives number of delete note i.e. 1
  const toDelete = await Note.destroy({ where: { id: req.params.id } });
  res.json(toDelete);
});

module.exports = app;
