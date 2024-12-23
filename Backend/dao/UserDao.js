"use strict";

const daoLink = require("./query.js");
const sql = require("mssql");

module.exports.getUser = function (body) {
  let selQ = `SELECT
  id,
  username,
  password,
  role
  FROM
  users
  WHERE
  username = @username`;
  let qParams = [
    { dParam: "username", dType: sql.VarChar(50), dVal: body.username },
  ];
  return daoLink.queryDb(selQ, qParams);
};

//Quary for get Users list
module.exports.getUserList = function () {
  let selQ = `SELECT
  Extn_No,
  Extn_Name,
  Extn_Login,
  Extn_Passwd,
  E_Int1,
  Extn_Token,
  Extn_role
  FROM
  Extension WHERE
  Extn_Logg = 0`;
  return daoLink.queryDb(selQ);
};
