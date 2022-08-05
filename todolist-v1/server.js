const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let tasks = new Array();
let workTasks = new Array();

app.get("/", (req, res) => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const date = today.toLocaleDateString("en-US", options);
  res.render("list", { taskArray: tasks, day: date, taskType: "Daily task" });
});

app.post("/addTask", (req, res) => {
  const userTask = req.body["task"];
  console.log(req.body["button"]);
  switch (req.body["button"]) {
    case "Work task":
      workTasks.push(userTask);
      res.redirect("/work");
      break;
    case "Daily task":
      tasks.push(userTask);
      res.redirect("/");
      break;
  }
});

app.get("/work", (req, res) => {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const date = today.toLocaleDateString("en-US", options);
  res.render("list", {
    taskArray: workTasks,
    day: date,
    taskType: "Work task",
  });
});

app.post("/addWork", (req, res) => {
  const task = req.body["task"];
  workTasks.push(task);
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
