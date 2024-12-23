"use strict";
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const sqlStore = require("./dao/sessionStore.js")(session);
const path = require("path");
const errHandler = require("./handlers/errHandler.js");
const process = require("process");
const configuration = require(path.join(process.cwd(), "./configuration"));
const dbConn = require("./dao/initConnection.js");
const routes = require("./routes/routes.js");
const bodyParser = require("body-parser");
var app = express();
const log = require("./logger/loggerService.js");

BigInt.prototype.toJSON = function () {
  return toString();
};

async function startServer() {
  dbConn
    .poolConnect()
    .then((res) => {
      /*For debugging*/
      const corsOptions = {
        origin: ["http://localhost:4200"],
        credentials: true, // Allow credentials
      };

      app.use(cors(corsOptions));
      //for prod
      //app.use(cors());
      app.use(
        session({
          /*Change secret token to random string according to project*/
          secret: ["991EGB47882C8593Q46C0DEFCA23S06A"],
          resave: false,
          saveUninitialized: false,
          /*Change cookie name according to project*/
          name: "express-session",
          cookie: {
            path: "/",
            maxAge: 86400000,
            secure: false,
            httpOnly: false,
          }, //Sesssion expire time in miliseconds
          store: new sqlStore({
            reapInterval: 3600,
            connection: dbConn.pool,
            ttl: configuration.SessionTimeout,
          }),
        })
      );
      //if request comes in application/json format use this
      app.use(bodyParser.json());
      //if request comes in application/x-www-form-urlencoded make extended true
      app.use(bodyParser.urlencoded({ extended: true }));

      /**
       * Set the port of the application
       */
      app.set("port", configuration.portNumber);

      /**
       * Set up the session store. The session will be created/called only when the following routes are used.
       */

      app.use("/api", routes);

      /**
       * set up the angular frontend .Bunddle angular frontend and copy dist file in backend
       */
      // app.use(express.static('frontend bunddle file'));
      // app.get("*", function (req, res) {
      // res.status(200).sendFile(path.resolve("accspopup/index.html"));
      // });

      var server = app.listen(app.get("port"), function () {
        log.logger.info(
          "Express server listening on port " + server.address().port
        );
      });
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      dbConn.reinitPool();
      log.logger.error(JSON.stringify(err));
      setTimeout(startServer, 5000);
    });
}

startServer();
