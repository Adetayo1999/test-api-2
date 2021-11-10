const db = require("../models");
const blogs = db.blogs;
const Op = db.Sequelize.Op;

exports.createBlog = async (req, res) => {
  const { title, body, author, userId } = req.body;

  try {
    const blog = await blogs.create({ title, body, author, userId });

    if (blog) {
      res.status(201).send(blog);
      return;
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllBlogs = async (req, res) => {
  const { title } = req.query;
  const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  try {
    const dbBlogs = await blogs.findAll({ where: condition });

    if (dbBlogs.length > 0) {
      res.status(200).json(dbBlogs);
      return;
    }
    res.status(200).send({ message: "No Blogs In The Database" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await blogs.findByPk(id);

    if (blog) {
      res.status(200).json(blog);
      return;
    }

    res.status(404).json({ message: `A user with id ${id} does not exist` });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await blogs.update(req.body, { where: { id } });

    if (response.length === 1) {
      res.status(200).send({ message: "Record Updated" });
      return;
    }
    res.status(404).json({ message: `Record Not Found` });
  } catch (err) {
    res.status(404).json({ message: `${id} not valid` });
  }
};

exports.deleteBlog = async (req, res) => {
  const id = req.params.id;

  try {
    const response = await blogs.destroy({ where: { id } });

    if (!response) throw new Error();
    res.status(200).json({ message: "Blog Succesfully deleted" });
  } catch (err) {
    res.status(404).send({
      message: err.message || "Record not found",
    });
  }
};
