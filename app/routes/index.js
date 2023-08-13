const usersRouter = require("./users");

module.exports = app => {
    app.use("/api/v1/users", usersRouter);
};