const express = require("express"); //parse json request
const app = express();
const blogRouter = require("./controllers/blogs");
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

app.use(express.json()); //json parser, to parse req.body's data

app.use("/api/blogs", blogRouter);

//wrapping connection into async function for secure connection to database
const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
