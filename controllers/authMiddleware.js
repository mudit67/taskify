// authMiddleware.js
const jwt = require("jsonwebtoken");
const store = require("../models/store");

const allowedURLs = ["/login", "/register"];

const authMiddleware = (req, res, next) => {
  //   console.log("Auth Middle", req.cookies);
  //   console.log(req.path);
  if (allowedURLs.find((url) => url == req.path) != undefined) {
    return next();
  }

  const { token } = req.cookies;

  if (!token) {
    console.log("Token not found", req.path);
    return res.redirect("/register");
  }

  try {
    const decoded = jwt.verify(token, process.env.secret); // Replace with your secret key

    req.user = decoded.username;
    if (!store.findUser(decoded.username)) {
      console.log("User not found!");
      return res.redirect("/register");
    }
    next();
  } catch (error) {
    console.log("Error: ", error);
    return res.redirect("/register");
  }
};

module.exports = authMiddleware;
