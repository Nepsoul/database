const Note = require("./note");

//generate schema automatically from defined model, if table does not exist
Note.sync();

module.exports = { Note };
