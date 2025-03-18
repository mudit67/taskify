const expressjs = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authController = require("./controllers/auth");
require("dotenv").config();
const port = process.env.port;

const server = expressjs();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/register", (req, res) => {
  res.render("auth/register");
});
server.get("/login", (req, res) => {
  res.render("auth/login");
});

server.post("/register", authController.register);
server.post("/login", authController.login);

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
