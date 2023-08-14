const mongoose = require("mongoose");
const {
    MONGO_HOST,
    MONGO_DB_NAME,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
} = process.env;

mongoose.connection.on("error", err => console.log("mongoDB Connection error:\n", err.message));

module.exports = () => {
    console.log(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`);
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`)
    .then(() => console.log("mongoDB connected."));
};