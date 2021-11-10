const blogModel = (sequelize, Sequelize) => {
  const blogs = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return blogs;
};

module.exports = blogModel;
