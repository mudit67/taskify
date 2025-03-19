const Task = require("../models/task");

const pageTasksLimit = 1;

const taskControllers = {
  getAllTasks: (req, res, next) => {
    req.tasks = new Task().getTasksByUsername(req.user);
    // res.send(JSON.stringify({ Tasks:  }));
    next();
  },
  addNewTask: (req, res) => {
    // console.log(req.body, req.user);
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
    // console.log(req.params);
    new Task().deleteTask(req.user, req.params.taskID);
    res.send(JSON.stringify({ message: "Success" }));
  },
  tasksOfPriority: (req, res, next) => {
    const tasks = new Task().tasksOfPriority(req.user, req.params.priority);
    const idx = req.params.pageIdx || 1;
    const start = (idx - 1) * pageTasksLimit;
    const remaining = tasks.length - (start + pageTasksLimit);
    // console.log(tasks);
    req.tasks = tasks.slice(start, start + pageTasksLimit);
    if ((!req.tasks || req.tasks.length == 0) && req.params.pageIdx) {
      return res.redirect("/");
    }
    req.prevpage = idx == 1 ? false : true;
    req.nextpage = remaining > 0 ? true : false;
    req.currentPage = idx;
    next();
  },
  tasksWithStatus: (req, res, next) => {
    const tasks = new Task().tasksWithStatus(req.user, req.params.status);
    const idx = req.params.pageIdx || 1;
    const start = (idx - 1) * pageTasksLimit;
    const remaining = tasks.length - (start + pageTasksLimit);
    // console.log(tasks);
    req.tasks = tasks.slice(start, start + pageTasksLimit);
    if ((!req.tasks || req.tasks.length == 0) && req.params.pageIdx) {
      return res.redirect("/");
    }
    req.prevpage = idx == 1 ? false : true;
    req.nextpage = remaining > 0 ? true : false;
    req.currentPage = idx;
    next();
  },
  tasksDelimited: (req, res, next) => {
    const idx = req.params.pageIdx || 1;
    const resObj = new Task().tasksDilimited(req.user, pageTasksLimit, idx);
    // console.log(resObj);
    req.tasks = resObj.tasks;
    if ((!req.tasks || req.tasks.length == 0) && req.path != "/") {
      return res.redirect("/");
    }
    req.prevpage = idx == 1 ? false : true;
    req.nextpage = resObj.remaining > 0 ? true : false;
    req.currentPage = idx;
    next();
  },
};

module.exports = taskControllers;
