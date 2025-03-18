const Store = require("./store");

class Task {
  constructor(title, desc, priority) {
    this.timeStamp = Date.now();
    this.taskID = this.timeStamp * 100 + Math.floor(100 * Math.random());
    this.title = title;
    this.desc = desc;
    this.status = "pending";
    this.priority = priority;
  }
  addTask(username) {
    Store.addTask(username, {
      taskID: this.taskID,
      title: this.title,
      desc: this.desc,
      status: this.status,
      priority: this.priority,
      timeStamp: this.timeStamp,
    });
  }
  getTasksByUsername(username) {
    return Store.tasksByUsername(username);
  }
  getTaskById(username, taskID) {
    return Store.taskByTaskId(username, taskID);
  }
  editTask(username, task) {
    return Store.editTask(username, task);
  }
  deleteTask(username, taskID) {
    return Store.deleteTask(username, taskID);
  }
}
module.exports = Task;
