"use strict";
const express = require("express");
const router = express.Router();
const TodoContoller = require("../controller/todosController.js");
const AuthController = require("../controller/authController.js");
const UserController = require("../controller/userController.js");
const path = require("path");
const configuration = require(path.join(process.cwd(), "./configuration"));

//User Login
router.post("/login", function (req, res) {
  AuthController.LoginFunction(req, res);
});

//Getting All the Todos
// Get Todos with Filters
router.post("/todos", function (req, res) {
  TodoContoller.GetTodosFunction(req, res);
});

//Inserting Todos
router.post("/todos/new-todo", function (req, res) {
  TodoContoller.PostTodosFunction(req, res);
});

//Removing Todos
router.post("/todos/:todoId", function (req, res) {
  TodoContoller.DeleteTodosFunction(req, res);
});

//Updating Todos
router.post("/todos-put/:todoId", function (req, res) {
  TodoContoller.PutTodosFunction(req, res);
});

router.get("/todos/reset-todod", (req, res) => {
  TodoContoller.ResetTodosFunction(req, res);
});

router.get("/health", function (req, res) {
  res.send(`${configuration.ProjectName} Serve is up!`);
});
module.exports = router;
