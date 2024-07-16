const path = require("path");
const express = require("express");
const { userRouter } = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

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

app.get("/", (req, res) => {
  res.render("home", { user: JSON.stringify(req.user) });
});
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`The Server started at the port : ${PORT}`);
});
