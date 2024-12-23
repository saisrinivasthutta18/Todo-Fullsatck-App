`use strict`;

const UserDao = require("../dao/UserDao");
const utilFunc = require("../service/utilFuncs");
const path = require("path");
const MessageConfig = require(path.join(process.cwd(), "./messageConfig.js"));

//Login service function
module.exports.LoginServFunction = async function (req, res) {
  try {
    let User = await UserDao.getUser(req.body);
    let IsValid = req.body.password === User.recordset[0].password;
    if (IsValid) {
      //Helps to store information in session
      if (req.session) {
        await utilFunc.regenerateSession(req);
        req.session.id = User.recordset[0].id;
        req.session.username = User.recordset[0].username;
        req.session.role = User.recordset[0].role;
        req.session.lStatus = true;
      }
      let UserData = {
        Name: User.recordset[0].username,
        Role: User.recordset[0].role,
        Id: User.recordset[0].id,
      };
      utilFunc.SendSuccessResponse(res, UserData);
      return;
    } else {
      req.session.destroy();
      utilFunc.SendErrorResponse(
        res,
        MessageConfig.ErrorMessage.AuthError.passwordError
      );
      return;
    }
  } catch (error) {
    console.log(error);
    req.session.destroy();
    utilFunc.SendErrorResponse(res, MessageConfig.ErrorMessage.ServerError);
  }
};
