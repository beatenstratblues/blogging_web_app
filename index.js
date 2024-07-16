const path = require("path");
const express = require("express");
const { userRouter } = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
const { blogRoute } = require("./routes/blog");
const { Blog } = require("./models/blog");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("The database connection has been established"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false })); //always use this to handle form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie("Token"));
app.use(express.static(path.resolve("./public"))) //express does not automatically serve any kind of a static assest so for that we need this middleware.

app.get("/", async (req, res) => {
  const allBlogs= await Blog.find({});
  res.render("home", { user: req.url, blogs:allBlogs });
});

app.use("/user", userRouter);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`The Server started at the port : ${PORT}`);
});
