const { Router } = require("express");
const { User } = require("../models/user");
const userRouter = Router();

userRouter.get("/signin", (req, res) => {
  return res.render("signin");
});

userRouter.get("/signup", (req, res) => {
  return res.render("signup");
});

userRouter.get("/logout", (req, res) => {
  return res.clearCookie("Token").redirect("/");
});

userRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateTokens(email, password);
    return res.cookie("Token", token).redirect("/");
  } catch (err) {
    return res.render("signin", { error: "Incorrect Email or Password :_(" });
  }
});

userRouter.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

module.exports = { userRouter };
