class Store {
  constructor() {
    this.users = {}; // Store usernames as keys and and hashed passwords as values
    this.tasks = {}; // Stores usernames as keys and an array of tasks as value
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
  tasksByUsername(username) {
    // console.log("store task: ", this.tasks);
    if (this.tasks[username] && this.tasks[username].length) {
      return this.tasks[username];
    }
    return [];
  }
  taskByTaskId(username, taskID) {
    if (this.tasks[username] && this.tasks[username].length) {
      return this.tasks[username].find((task) => task.taskID == taskID);
    }
    return undefined;
  }
  addTask(username, taskObj) {
    if (this.tasks[username] == undefined || this.tasks[username].length == 0) {
      this.tasks[username] = [taskObj];
    } else {
      this.tasks[username].push(taskObj);
    }
  }
  editTask(username, task) {
    console.log("Edit Task: ");
    if (this.tasks[username] == undefined || this.tasks[username].length == 0) {
      console.log("User has no tasks");
      return;
    }
    const taskIdx = this.tasks[username].findIndex(
      (taskIter) => taskIter.taskID == task.taskID
    );

    if (taskIdx == -1) {
      console.log("TaskID not found!", task.taskID, this.tasks);
      return;
    }
    Object.assign(this.tasks[username][taskIdx], { ...task });
  }
  deleteTask(username, taskID) {
    console.log("Delete Task: ");
    if (this.tasks[username] == undefined || this.tasks[username].length == 0) {
      console.log("User has no tasks");
      return;
    }
    const taskIdx = this.tasks[username].findIndex(
      (taskIter) => taskIter.taskID == taskID
    );

    if (taskIdx == -1) {
      console.log("TaskID not found!", taskID, this.tasks);
      return;
    }
    this.tasks[username].splice(taskIdx, 1);
  }
}
const storeInstance = new Store();
module.exports = storeInstance;
