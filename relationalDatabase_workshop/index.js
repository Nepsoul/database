const express = require("express");
const app = express();
const noteRouter = require("./controllers/notes");

app.use(express.json()); //json parser

app.use("/api/notes", noteRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
