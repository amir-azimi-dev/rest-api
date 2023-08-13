require("dotenv").config();
const bootApplication = require("./app");
bootApplication(process.env.APP_PORT);