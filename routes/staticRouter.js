const express = require("express");
const route = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");
const router = require("./user");

route.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", { urls: allUrls });
});

route.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  //   return res.end("hello World");
  return res.render("home", { urls: allUrls });
});

route.get("/signup", (req, res) => {
  return res.render("signup");
});

route.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = route;
