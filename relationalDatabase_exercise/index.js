const express = require("express"); //parse json request
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");
// require("express-async-errors"); //middleware of use eliminate try/catch block(note: by eliminating try/catch block it does not handle errors)
const { noHandler, unKnownPoint, errorHandler } = require("./util/middleware");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const longinRouter = require("./controllers/login");

app.use(express.json()); //json parser, to parse req.body's data

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", longinRouter);

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
