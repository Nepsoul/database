const Note = require("./note");
const User = require("./user");

const Team = require("./team");
const Membership = require("./membership");
const UserNotes = require("./UserNotes");

// defining relation of User and Note
User.hasMany(Note);
Note.belongsTo(User);

//many-to-many relationships
User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

User.belongsToMany(Note, { through: UserNotes, as: "marked_notes" });
Note.belongsToMany(User, { through: UserNotes, as: "users_marked" });

//generate schema automatically from defined model, if table does not exist
// Note.sync({ alter: true }); //if defined model altered, then it auto generate table according to altered model
// User.sync({ alter: true });

module.exports = { Note, User, Team, Membership };
