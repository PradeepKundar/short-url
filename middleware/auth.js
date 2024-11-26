const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;

  if (!tokenCookie) {
    console.log("No token found. Proceeding without authentication.");
    return next();
  }

  const token = tokenCookie;
  const user = getUser(token);
  //   console.log(user);
  req.user = user;
  return next();
}

// admin, normal etc
function restrictTo(roles = []) {
  return function (req, res, next) {
    console.log(req.user);
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}
/* 
async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");

  const user = getUser(userUid);
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  console.log(req);
  const userUid = req.cookies?.uid;
  console.log(userUid);

  const user = getUser(userUid);

  req.user = user;
  next();
}
 */
module.exports = {
  /*  restrictToLoggedinUserOnly,
  checkAuth, */
  checkForAuthentication,
  restrictTo,
};
