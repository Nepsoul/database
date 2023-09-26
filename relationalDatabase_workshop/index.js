require("dotenv").config();
// const { Sequelize, QueryTypes } = require('sequelize')
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json()); //json parser

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

//generate schema automatically from defined model, if table does not exist
Note.sync();

app.get("/api/notes", async (req, res) => {
  //   const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
  const notes = await Note.findAll();
  // console.log(JSON.stringify(notes))

  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  console.log(req.body);
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get("/api/notes/:id", async (req, res) => {
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

app.put("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", async (req, res) => {
  //sequalize method using sql query, converting into sql query
  // in toDelete variable, instead of deleted note id, it gives number of delete note i.e. 1
  const toDelete = await Note.destroy({ where: { id: req.params.id } });
  res.json(toDelete);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
