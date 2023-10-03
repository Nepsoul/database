const express = require("express"); //parse json request
const app = express();
const blogRouter = require("./controllers/blogs");
const { PORT } = require("./util/config");

app.use(express.json()); //json parser, to parse req.body's data

app.use("/api/blogs", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
