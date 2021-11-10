const db = require("../models");
const users = db.users;

exports.createUser = async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    if (firstName && lastName && email) {
      const data = await users.create({ firstName, lastName, email });

      if (data) {
        res.status(201).send(data);
      }
    } else throw new Error("All Fields Must Be Filled");
  } catch (err) {
    res.status(400).json({ error: err.message || "Something went wrong" });
  }
};

exports.getAllUsers = async (_req, res) => {
  try {
    const dbUsers = await users.findAll({
      include: db.blogs,
    });

    if (dbUsers) {
      res.status(200).send(dbUsers);
    }
  } catch (err) {
    res.status(404).json({
      message: err.message || "Users not found",
    });
  }
};
