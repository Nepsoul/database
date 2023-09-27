const express = require("express");
const app = express();
const noteRouter = require("./controllers/notes");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const { PORT } = require("./utils/config");
const { connectToDatabase } = require("./utils/db");

app.use(express.json()); //json parser

app.use("/api/notes", noteRouter);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);

//wrapping connection into async function for secure connection to database
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
