const Note = require("./note");
const User = require("./user");

// defining relation of User and Note
User.hasMany(Note);
Note.belongsTo(User);

//generate schema automatically from defined model, if table does not exist
// Note.sync({ alter: true }); //if defined model altered, then it auto generate table according to altered model
// User.sync({ alter: true });

module.exports = { Note, User };
