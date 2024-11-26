const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const USER = require("../models/users");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await USER.findOne({
    email,
    password,
  });
  // console.log("userLogin---->", user);
  // console.log(user);
  if (!user) return res.render("login", { error: "Invalid Credentials" });

  //const sessionId = uuidv4();
  const token = setUser(user);

  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };
