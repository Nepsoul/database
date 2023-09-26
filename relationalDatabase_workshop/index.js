const express = require("express");
const app = express();
const noteRouter = require("./controllers/notes");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

app.use(express.json()); //json parser

app.use("/api/notes", noteRouter);

//wrapping connection into async function for secure connection to database
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
