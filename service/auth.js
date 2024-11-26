// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "Pradeep@5305";

function setUser(user) {
  /* sessionIdToUserMap.set(id, user);
  console.log("sessionIdToUserMap----->", sessionIdToUserMap); */

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;

  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
