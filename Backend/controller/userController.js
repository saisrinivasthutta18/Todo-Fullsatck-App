`use strict`;
const UserServ = require("../service/UserService");
const utilFunc = require("../service/utilFuncs");

module.exports.getUser = async function (req, res) {
  let WrongSession = await utilFunc.checkForWrongSession(req, res);
  if (WrongSession) {
    return;
  }
  UserServ.getUserList(req, res);
};
