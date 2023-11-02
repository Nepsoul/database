const express = require("express"); //parse json request
const app = express();
const blogRouter = require("./controllers/blogs");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
// require("express-async-errors"); //middleware of use eliminate try/catch block(note: by eliminating try/catch block it does not hanlde errors)

const userRouter = require("./controllers/users");

app.use(express.json()); //json parser, to parse req.body's data

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

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

  if (error.name === "Validation error") {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};
app.use(noHandler);
app.use(unKnownPoint);
app.use(errorHandler);

//wrapping connection into async function for secure connection to database
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
