"use strict";
const AuthServ = require("../service/AuthService");
const utilFunc = require("../service/utilFuncs");
const path = require("path");
const MessageConfig = require(path.join(process.cwd(), "./messageConfig.js"));

//Log in function
module.exports.LoginFunction = async function (req, res) {
  if (!req.body.username) {
    utilFunc.SendErrorResponse(
      res,
      MessageConfig.ErrorMessage.AuthError.usernameError
    );
    return;
  }
  if (!req.body.password) {
    utilFunc.SendErrorResponse(
      res,
      MessageConfig.ErrorMessage.AuthError.passwordError
    );
    return;
  }
  AuthServ.LoginServFunction(req, res);
};
