const jwt = require("jsonwebtoken");

exports.sign = data => {
    return jwt.sign(data, process.env.APP_SECRET/*, {expiresIn: 24 * 360000}*/);
};

exports.verify = token => {
    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);
        return payload;
    } catch (err) {
        return false;
    }
};

exports.decode = token => {
    return jwt.decode(token, process.env.APP_SECRET);
};