const bcrypt = require("bcrypt");


exports.hash = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, 10);
};

exports.compare = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};