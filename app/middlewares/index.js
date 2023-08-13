const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = app => {
    // app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors());
    app.use(bodyParser.json());

};