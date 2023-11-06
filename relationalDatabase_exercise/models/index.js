const Blog = require("./blog");
const User = require("./user");

//define User-Blog relation, one-to-many
User.hasMany(Blog);
Blog.belongsTo(User);

//if defined model altered, then it auto generate table according to altered model
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
