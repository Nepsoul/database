const Note = require("./note");
const User = require("./user");

//generate schema automatically from defined model, if table does not exist
Note.sync();
User.sync();

module.exports = { Note, User };
