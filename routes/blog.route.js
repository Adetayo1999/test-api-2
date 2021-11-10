const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog.controller");
const router = require("express").Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
