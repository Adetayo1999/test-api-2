const express = require("express");
const db = require("./models");
const blogRouter = require("./routes/blog.route");
const userRouter = require("./routes/user.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Dropping And Recreating Tables");
  })
  .catch(() => {
    console.error("Error Happened");
  });

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening On Port ${PORT}`);
});
