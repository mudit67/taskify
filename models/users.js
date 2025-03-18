// const storeInstance = require("./store");
const Store = require("./store");
const bcrypt = require("bcryptjs");
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  async createNewUser() {
    const checkUser = Store.findUser(this.username);
    if (checkUser != undefined) {
      return false;
    }
    const pswHash = await bcrypt.hash(this.password, 10);

    Store.newUser(this.username, pswHash);
    return true;
  }
  async authUser() {
    const userPswHash = await Store.findUser(this.username);

    if (userPswHash == undefined) {
      const users = await Store.allUsers();
      Object.keys(users).map((user) => console.log(user, users[user]));
      console.log("User not found!");
      return false;
    }

    // const pswHash = await bcrypt.hash(this.password, 10);
    // console.log(pswHash, userPswHash);
    return await bcrypt.compare(this.password, userPswHash);
  }
}

module.exports = User;
