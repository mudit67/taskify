const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const
const authController = {
  register: async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    if (!username.length || !password.length) {
      return res
        .status(400)
        .send(
          JSON.stringify({ message: "Enter a valid username and password" })
        );
    }
    const newUser = new User(username, password);
    const usernameFree = await newUser.createNewUser();
    if (usernameFree) {
      const token = jwt.sign(
        {
          username,
          password,
        },
        process.env.secret,
        { algorithm: "HS256" }
      );
      res.status(200).send(JSON.stringify({ message: "Success!", token }));
    } else {
      return res
        .status(400)
        .send(JSON.stringify({ message: "Username Already in use!" }));
    }
  },
  login: async (req, res) => {
    // console.log(req.body);
    const { username, password } = req.body;
    if (!username.length || !password.length) {
      return res
        .status(400)
        .send(
          JSON.stringify({ message: "Enter a valid username and password" })
        );
    }
    const userInstance = new User(username, password);
    const auth = await userInstance.authUser();
    console.log(auth);
    // res.send("{message:'okay'}");
    if (auth) {
      const token = jwt.sign(
        {
          username,
          password,
        },
        process.env.secret,
        { algorithm: "HS256" }
      );
      res.status(200).send(JSON.stringify({ message: "Success!", token }));
    } else {
      return res.status(400).send(
        JSON.stringify({
          message: "Either username or password is incorrect!",
        })
      );
    }
  },
};

module.exports = authController;
