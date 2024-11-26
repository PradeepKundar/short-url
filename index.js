const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToDb } = require("./connect");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const urlRoutes = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const PORT = 8000;

connectToDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoutes);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at Port:${PORT}`));
