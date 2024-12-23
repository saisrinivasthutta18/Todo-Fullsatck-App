"use strict";

const daoLink = require("./query.js");
const sql = require("mssql");

module.exports.GetAllTodos = ({
  username,
  priority,
  status,
  userRole,
  userSelf,
  offset_p,
  limit_p,
}) => {
  // Base query
  let selQuery = `SELECT * FROM todos`;

  // Conditions for filters
  let conditions = [];

  // If the user is a regular user, restrict to their own todos
  if (userRole !== "admin") {
    conditions.push(`username = '${userSelf}'`);
  }

  // Add username filter for admins only
  if (userRole === "admin" && username) {
    conditions.push(`username = '${username}'`);
  }

  // Add optional filters
  if (priority) {
    conditions.push(`priority = '${priority}'`);
  }

  if (status) {
    conditions.push(`status = '${status}'`);
  }

  // Append conditions to the query
  if (conditions.length > 0) {
    selQuery += ` WHERE ` + conditions.join(" AND ");
  }

  // selQuery += ` ORDER BY id OFFSET @offset_p ROWS FETCH NEXT @limit_p ROWS ONLY`;

  // // Query parameters for OFFSET and LIMIT
  // const qParams = [
  //   { dParam: "offset_p", dType: sql.Int, dVal: offset_p },
  //   { dParam: "limit_p", dType: sql.Int, dVal: limit_p },
  // ];

  return daoLink.queryDb(selQuery);
};

module.exports.AddTodo = (newTodo) => {
  const { task, status, priority, username } = newTodo;
  let insQuery = `
    INSERT INTO todos (task, status, priority, username)
    VALUES (@task, @status, @priority, @username)
    `;

  const qParams = [
    { dParam: "task", dType: sql.VarChar(255), dVal: task },
    { dParam: "status", dType: sql.VarChar(10), dVal: status },
    { dParam: "priority", dType: sql.VarChar(10), dVal: priority },
    { dParam: "username", dType: sql.VarChar(50), dVal: username },
  ];

  return daoLink.queryDb(insQuery, qParams);
};

module.exports.DeleteTodo = (id) => {
  let delQuery = `
    DELETE FROM todos
    WHERE id = @id
    `;
  const qParams = [{ dParam: "id", dType: sql.Int, dVal: id }];
  return daoLink.queryDb(delQuery, qParams);
};

module.exports.UpdateTodo = (updatedTodo, id) => {
  const { task, status, priority, username } = updatedTodo;
  let updQuery = `
    UPDATE todos
    SET task = @task, status = @status, priority = @priority, username = @username
    WHERE id = @id
    `;
  const qParams = [
    { dParam: "id", dType: sql.Int, dVal: id },
    { dParam: "task", dType: sql.VarChar(255), dVal: task },
    { dParam: "status", dType: sql.VarChar(10), dVal: status },
    { dParam: "priority", dType: sql.VarChar(10), dVal: priority },
    { dParam: "username", dType: sql.VarChar(50), dVal: username },
  ];
  return daoLink.queryDb(updQuery, qParams);
};

module.exports.ResetTodos = () => {
  let resetQuery = `
    DELETE FROM todos
    `;
  return daoLink.queryDb(resetQuery);
};
