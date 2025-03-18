class Store {
  constructor() {
    this.users = {}; // Store usernames as keys and and hashed passwords as values
    this.tasks = {}; // Stores userIds as keys and task body as values
  }

  findUser(username) {
    return this.users[username];
  }
  newUser(username, password) {
    this.users[username] = password;
    // return user
  }
  allUsers() {
    return this.users;
  }
}
const storeInstance = new Store();
module.exports = storeInstance;
