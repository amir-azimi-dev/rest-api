const express = require("express");
const app = express();

// boot application
require("./middlewares")(app);

// routes
require("./routes")(app);

// exception
require("./middlewares/exception")(app);

// 404
require("./middlewares/404")(app);

module.exports = port => {
    app.listen(port, () => {
        console.log(`app is running on port ${port} ...`);
    });
};