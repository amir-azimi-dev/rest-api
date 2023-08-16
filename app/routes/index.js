const usersRouter = require("./users");
const sessionRouter = require("./session");
const authMiddleware = require("../middlewares/auth");

module.exports = app => {
    app.use("/api/v1/users", [authMiddleware], usersRouter);
    app.use("/api/v1/session", sessionRouter);
};