const express = require("express"); //parse json request
const app = express();
const blogRouter = require("./controllers/blogs");

app.use(express.json()); //json parser, to parse req.body's data

app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
