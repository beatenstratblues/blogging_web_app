const { Router, response } = require("express");
const multer = require("multer");
const blogRoute = Router();
const path = require("path");
const { Blog } = require("../models/blog");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

blogRoute.get("/add-new", (req, res) => {
  return res.render("addBlogs", {
    user: req.user,
  });
});

blogRoute.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    body,
    title,
    createdBY: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/`);
});

module.exports = { blogRoute };
