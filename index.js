const expressjs = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authController = require("./controllers/auth");
const taskController = require("./controllers/tasksController");
const authMiddleware = require("./controllers/authMiddleware");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const pageTasksLimit = 1;
const port = process.env.port;
const server = expressjs();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cookieParser());

server.use(authMiddleware);

server.get("/register", (req, res) => {
  res.render("auth/register");
});
server.get("/login", (req, res) => {
  res.render("auth/login");
});

server.post("/register", authController.register);
server.post("/login", authController.login);

server.get("/addtask", (req, res) => {
  res.render("task/add");
});
server.get("/taskedit/:taskID", taskController.taskById, (req, res) => {
  if (!req.taskBody) {
    return res.redirect("/");
  }
  // console.log(`taskBody:`, req.taskBody);
  res.render("task/edit", { task: req.taskBody });
});
server.post("/taskedit/", taskController.editTask);
server.delete("/taskdelete/:taskID", taskController.deleteTask);
server.post("/addtask", taskController.addNewTask);
// server.get("/fetchAllTasks", taskController.getAllTasks);

server.get(["/", "/:pageIdx"], taskController.tasksDelimited, (req, res) => {
  // console.log("tasks");
  // console.log(req.currentPage);
  res.render("index", {
    tasks: req.tasks,
    prevpage: req.prevpage,
    nextpage: req.nextpage,
    currentpage: req.currentPage,
  });
});
server.get(
  ["/priority/:priority", "/priority/:priority/:pageIdx"],
  taskController.tasksOfPriority,
  (req, res) => {
    // console.log("tasks");
    // console.log(req.currentPage);
    res.render("index", {
      tasks: req.tasks,
      prevpage: req.prevpage,
      nextpage: req.nextpage,
      currentpage: req.currentPage,
    });
  }
);

server.get(
  ["/status/:status", "/status/:status/:pageIdx"],
  taskController.tasksWithStatus,
  (req, res) => {
    // console.log("tasks");
    // console.log(req.currentPage);
    res.render("index", {
      tasks: req.tasks,
      prevpage: req.prevpage,
      nextpage: req.nextpage,
      currentpage: req.currentPage,
    });
  }
);

server.listen(port, () => {
  console.log(`Server listening to port: ${port}`);
});
