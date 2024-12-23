`use strict`;
const TodoDao = require("../dao/TodoDao");
const utilFunc = require("../service/utilFuncs");
const path = require("path");
const MessageConfig = require(path.join(process.cwd(), "./messageConfig.js"));

module.exports.getAllTodosList = async function (req, res) {
  try {
    // Extract query parameters (e.g., username, priority, status)
    const { username, priority, status, offset_p, limit_p } = req.query;

    // Extract user details from the request (assume middleware populates these)
    const userRole = req.body.role; // 'admin' or 'user'
    const userSelf = req.body.username; // Logged-in user's username

    // Pass filters and user details to the DAO
    let allTodos = await TodoDao.GetAllTodos({
      username,
      priority,
      status,
      userRole,
      userSelf,
    });

    utilFunc.SendSuccessResponse(res, allTodos.recordsets);
  } catch (error) {
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};

module.exports.addTodo = async (req, res) => {
  try {
    let newTodo = req.body;
    console.log(newTodo);
    let addedTodo = await TodoDao.AddTodo(newTodo);
    utilFunc.SendSuccessResponse(res, addedTodo.recordsets);
  } catch (error) {
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    let id = req.params.todoId;
    console.log(id);
    let deletedTodo = await TodoDao.DeleteTodo(id);
    utilFunc.SendSuccessResponse(res, deletedTodo.recordsets);
  } catch (error) {
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    let updatedTodo = req.body;
    let id = req.params.todoId;
    let updatedRecord = await TodoDao.UpdateTodo(updatedTodo, id);
    utilFunc.SendSuccessResponse(res, updatedRecord.recordsets);
  } catch (error) {
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};

module.exports.resetTodos = async (req, res) => {
  try {
    let resetTodos = await TodoDao.ResetTodos();
    utilFunc.SendSuccessResponse(res, resetTodos.recordsets);
  } catch (error) {
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};
