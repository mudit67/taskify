const Task = require("../models/task");

const taskControllers = {
  getAllTasks: (req, res, next) => {
    req.tasks = new Task().getTasksByUsername(req.user);
    // res.send(JSON.stringify({ Tasks:  }));
    next();
  },
  addNewTask: (req, res) => {
    console.log(req.body, req.user);
    const task = new Task(req.body.title, req.body.desc, req.body.priority);
    task.addTask(req.user);
    res.send(JSON.stringify({ message: "ok" }));
  },
  taskById: (req, res, next) => {
    req.taskBody = new Task().getTaskById(req.user, req.params.taskID);
    next();
  },
  editTask: (req, res, next) => {
    // console.log(req.body);
    new Task().editTask(req.user, req.body);
    res.send(JSON.stringify({ message: "Success" }));
  },
  deleteTask: (req, res, next) => {
    console.log(req.params);
    new Task().deleteTask(req.user, req.params.taskID);
    res.send(JSON.stringify({ message: "Success" }));
  },
};

module.exports = taskControllers;
