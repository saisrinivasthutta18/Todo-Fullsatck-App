const dbInfo = {
  user: "saisrinivas",
  password: "*18*virat#",
  server: "100.98.115.51", //default is localhost
  port: 1433,
  pool: {
    max: 100,
    min: 3,
  },
  database: "TestDatabase", //example - 'cms_progility'
  options: {
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const portNumber = 3000; // port number like 5000
const winstonDebuggerSilent = false; //if true then no logs
const localTest = false; //for testing purpose

const headerToColumnMapping = {
  //excel:database
  id: "id",
  sMonth: "sMonth",
  profit: "profit",
};
const winstonLogLevel = "info";
const ProjectName = "basecode";
const SessionTimeout = 600; //In seconds

/*
  Below are the winston log levels

  const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
  };
  */
module.exports = Object.freeze({
  dbInfo: dbInfo,
  portNumber: portNumber,
  winstonDebuggerSilent: winstonDebuggerSilent,
  localTest: localTest,
  headerToColumnMapping: headerToColumnMapping,
  winstonLogLevel: winstonLogLevel,
  ProjectName: ProjectName,
  SessionTimeout: SessionTimeout,
});
