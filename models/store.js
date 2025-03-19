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
  tasksDelimited(username, limit, idx) {
    const taskArray = this.tasks[username];
    if (!taskArray || taskArray.length == 0) {
      return { tasks: [], remaining: 0 };
    }
    let start = (idx - 1) * limit;
    // console.log(taskArray, start, start + limit);
    return {
      tasks: taskArray.slice(start, start + limit),
      remaining: taskArray.length - (start + limit),
    };
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
      if (taskObj.priority == "low") {
        return this.tasks[username].push(taskObj);
      }
      let taskIdx;
      if (taskObj.priority == "medium") {
        taskIdx = this.tasks[username].findIndex(
          (task) => task.priority == "low"
        );
        if (taskIdx == -1) {
          taskIdx = this.tasks[username].findLastIndex(
            (task) => task.priority == "medium"
          );
          if (taskIdx != -1) {
            taskIdx += 1;
          } else {
            taskIdx = this.tasks[username].length;
          }
        }
      } else {
        taskIdx = this.tasks[username].findLastIndex(
          (task) => task.priority == "high"
        );
        if (taskIdx != -1) {
          taskIdx += 1;
        } else {
          taskIdx = 0;
        }
      }
      return this.tasks[username].splice(taskIdx, 0, taskObj);
    }
  }
  tasksOfPriority(username, priority) {
    const taskArray = this.tasks[username];
    if (!taskArray || taskArray.length == 0) {
      return [];
    }
    let start = 0,
      end = taskArray.length;
    if (priority == "high") {
      end = taskArray.findLastIndex((task) => task.priority == "high") + 1;
    } else if (priority == "medium") {
      start = taskArray.findIndex((task) => task.priority == priority);
      end = taskArray.findLastIndex((task) => task.priority == priority) + 1;
    } else {
      start = taskArray.findIndex((task) => task.priority == priority);
    }
    // console.log(taskArray, start, end);
    return taskArray.slice(start, end);
  }
  tasksWithStatus(username, status) {
    const taskArray = this.tasks[username];
    if (!taskArray || taskArray.length == 0) {
      return [];
    }
    return taskArray.filter((task) => task.status == status);
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
