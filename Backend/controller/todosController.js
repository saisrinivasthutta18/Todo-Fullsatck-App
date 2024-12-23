const TodoService = require("../service/TodoService");
const utilFunc = require("../service/utilFuncs");
const MessageConfig = require("../messageConfig");

module.exports.GetTodosFunction = async function (req, res) {
  // Pass request to Controller
  TodoService.getAllTodosList(req, res);
};

module.exports.PostTodosFunction = async (req, res) => {
  let todo = req.body;
  if (!todo.priority || !todo.status || !todo.task || !todo.username) {
    utilFunc.SendErrorResponse(
      res,
      MessageConfig.ErrorMessage.TodoError.emptyFieldsError
    );
    return;
  }
  TodoService.addTodo(req, res);
};

module.exports.DeleteTodosFunction = async (req, res) => {
  let todoId = req.params.todoId;
  if (!todoId) {
    utilFunc.SendErrorResponse(
      res,
      MessageConfig.ErrorMessage.TodoError.emptyIdError
    );
    return;
  }
  TodoService.deleteTodo(req, res);
};

module.exports.PutTodosFunction = async (request, res) => {
  let todoId = request.params.todoId;
  let updatedTodo = request.body;
  if (
    !todoId ||
    !updatedTodo.priority ||
    !updatedTodo.status ||
    !updatedTodo.task ||
    !updatedTodo.username
  ) {
    utilFunc.SendErrorResponse(
      res,
      MessageConfig.ErrorMessage.TodoError.emptyFieldsError
    );
    return;
  }
  TodoService.updateTodo(request, res);
};

module.exports.ResetTodosFunction = async (req, res) => {
  TodoService.resetTodos(req, res);
};
