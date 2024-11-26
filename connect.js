const mongoose = require("mongoose");

async function connectToDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("error:", err.message));
}

module.exports = { connectToDb };
