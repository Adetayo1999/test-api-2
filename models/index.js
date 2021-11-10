const Sequelize = require("sequelize");
const sequelize = new Sequelize("dailyblog", "root", "", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 1,
    acquire: 5000,
    idle: 2000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Made");
  })
  .catch(() => console.error("Error In Connection"));

const blogs = require("./blog.model");
const users = require("./user.model");
const blogModelInstance = blogs(sequelize, Sequelize);
const usersModelInstance = users(sequelize, Sequelize);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.blogs = blogModelInstance;
db.users = usersModelInstance;

db.users.hasMany(db.blogs, {
  foreignKey: {
    allowNull: false,
  },
});
db.blogs.belongsTo(db.users);

module.exports = db;
